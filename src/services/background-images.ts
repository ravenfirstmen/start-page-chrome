import {
  StartBackgroundImageRotationMessage,
  LAST_IMAGE_STORAGE_KEY,
} from '@/shared'

class BackgroundImages {
  async startBackgroungImageRotation(): Promise<void> {
    return await chrome.runtime.sendMessage(StartBackgroundImageRotationMessage)
  }

  async getBackgroundImage(): Promise<string> {
    const backgroundImage = await chrome.storage.local.get(
      LAST_IMAGE_STORAGE_KEY
    )

    return backgroundImage.lastImage
  }

  getLocalBackgroundImage(): string {
    const NIMAGES = 10

    const index = Math.floor(Math.random() * NIMAGES) + 1
    const zeroPadded = index.toString().padStart(2, '0')
    return `/wallpaper/${zeroPadded}.jpg`
  }
}

export const backgroundImagesService = new BackgroundImages()
