import { GetBookmarksMessageResponse, RefreshBookmarksMessage } from '../shared'

export const handleGetBookmarks = async (
  sendResponse: GetBookmarksMessageResponse
) => {
  sendResponse(cache)
  return true
}

export const handleOnInstall = async (
  details: chrome.runtime.InstalledDetails
) => {
  console.log(`Worker installed: ${details.reason}`)
  await loadBookmarks()
  await startHeartbeat()
}

export const handleOnStartup = async () => {
  console.log(`Worker started...`)
  await loadBookmarks()
  console.log('Cache refreshed...')
  await startHeartbeat()
}

// other events
// TODO: add logic to invalidate if the 'Startpage' is changed
chrome.bookmarks.onChanged.addListener(async () => await loadBookmarks())
chrome.bookmarks.onChildrenReordered.addListener(async () => await loadBookmarks())
chrome.bookmarks.onCreated.addListener(async () => await loadBookmarks())
chrome.bookmarks.onMoved.addListener(async () => await loadBookmarks())
chrome.bookmarks.onRemoved.addListener(async () => await loadBookmarks())

// private stuff

let cache: chrome.bookmarks.BookmarkTreeNode[] = []

const loadBookmarks = async () => {
  cache = []
  const anchor = await chrome.bookmarks.search({ title: 'Startpage' })
  if (anchor.length == 1) {
    // found the anchor
    const startpageBookmarks = await chrome.bookmarks.getSubTree(anchor[0].id)
    const startpageFolders = !startpageBookmarks.length
      ? []
      : startpageBookmarks[0].children ?? []
    cache = startpageFolders.filter((f) => f.children)
    console.log(`Set ${cache.length} items in cache.`)
  } else {
    console.log('Bookmarks anchor not found.')
  }
}

// heartbeat https://developer.chrome.com/docs/extensions/develop/migrate/to-service-workers#keep_a_service_worker_alive_continuously
const HEARTBEAT_INTERVAL_SECONDS = 20 * 1000
let heartbeatInterval: NodeJS.Timeout

async function heartbeat() {
  await chrome.storage.local.set({ 'last-heartbeat': Date.now() })
}

async function startHeartbeat() {
  // Run the heartbeat once at service worker startup.
  await heartbeat()
  // Then again every 20 seconds.
  heartbeatInterval = setInterval(heartbeat, HEARTBEAT_INTERVAL_SECONDS)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function stopHeartbeat() {
  clearInterval(heartbeatInterval)
}
