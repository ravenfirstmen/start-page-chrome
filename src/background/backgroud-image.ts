import {
  LAST_IMAGE_STORAGE_KEY,
  LAST_IMAGE_ROTATION_TIME_STORAGE_KEY,
  SetbackgroundImageMessage,
} from '../shared'

const API_KEY = '513275-e06a2245f2720070470e77589'
const BASE_URL = 'https://pixabay.com/api/'
const BASE_URL_WITH_KEY = `${BASE_URL}?key=${API_KEY}`

//q: desktop background
//category: backgrounds
//min_width: 1280
//safesearch: true
//editors_choice: true
//order: latest
//page: 1
//per_page: 3
const QUERY = 'desktop background'
const MAX_IMAGES = 20
const FILTERS =
  'image_type=photo&category=backgrounds&min_width=1280&safesearch=true&editors_choice=true&order=latest&page=1'

const ROTATION_PERIOD_MINUTES = 60

async function getImageFromPixabay(): Promise<string | null> {
  const fullUrl = `${BASE_URL_WITH_KEY}&q=${encodeURIComponent(QUERY)}&${FILTERS}&perpage=${MAX_IMAGES}`

  try {
    const response = await fetch(fullUrl)
    if (!response.ok) {
      return null
    }
    const searchResult = await response.json()
    if (searchResult.hits.length > 0) {
      const index = Math.floor(Math.random() * searchResult.hits.length)
      return searchResult.hits[index].largeImageURL
    }
  } catch {
    return null
  }

  return null
}

export async function cacheBackgroundImage(): Promise<string> {
  const currentInfo = await chrome.storage.local.get([
    LAST_IMAGE_STORAGE_KEY,
    LAST_IMAGE_ROTATION_TIME_STORAGE_KEY,
  ])

  let backgroundImage = currentInfo.lastImage
  if (!backgroundImage) {
    backgroundImage = await getImageFromPixabay()

    if (backgroundImage) {
      await chrome.storage.local.set({
        lastImage: backgroundImage,
        date: Date.now(),
      })
      await setRotateImageAlarm(ROTATION_PERIOD_MINUTES)
    } else {
      await setRotateImageAlarm(1) // try again in one minute
    }
  }

  return backgroundImage
}

// alarm

const ROTATE_IMAGE_ALARM = 'rotate-image-alarm'

async function setRotateImageAlarm(periodInMinutes: number) {
  const alarm = await chrome.alarms.get(ROTATE_IMAGE_ALARM)
  if (alarm) {
    await chrome.alarms.clear(ROTATE_IMAGE_ALARM)
  }
  await chrome.alarms.create(ROTATE_IMAGE_ALARM, {
    periodInMinutes: periodInMinutes,
  })
}

const refreshImage = async (alarm: chrome.alarms.Alarm) => {
  if (alarm.name == ROTATE_IMAGE_ALARM) {
    await chrome.storage.local.remove([
      LAST_IMAGE_STORAGE_KEY,
      LAST_IMAGE_ROTATION_TIME_STORAGE_KEY,
    ])
    const imageUrl = await cacheBackgroundImage()
    if (imageUrl) {
      await chrome.runtime.sendMessage(
        chrome.runtime.id,
        new SetbackgroundImageMessage(imageUrl)
      )
    }
  }
}
chrome.alarms.onAlarm.addListener(refreshImage)

// start alarm

export const handleStartBackgroundImageRotation = async () => {
  console.log('Received star rotation request')
  await cacheBackgroundImage()
  return true
}
