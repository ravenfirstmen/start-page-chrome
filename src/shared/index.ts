enum MessageType {
  GET_BOOKMARKS = 'GET_BOOKMARKS',
  SET_BACKGROUND_IMAGE = 'SET_BACKGROUND_IMAGE',
  START_BACKGROUND_IMAGE_ROTATION = 'START_BACKGROUND_IMAGE_ROTATION',
}

class Message {
  constructor(public readonly type: MessageType) {}
}

class MessageData<T> extends Message {
  constructor(
    public readonly type: MessageType,
    public readonly data?: T
  ) {
    super(type)
  }
}

class SetbackgroundImageMessage extends MessageData<string> {
  constructor(url?: string) {
    super(MessageType.SET_BACKGROUND_IMAGE, url)
  }
}

const GetBookmarksMessage = new Message(MessageType.GET_BOOKMARKS)
const StartBackgroundImageRotationMessage = new Message(
  MessageType.START_BACKGROUND_IMAGE_ROTATION
)

type MessageResponse<T> = (response: T) => void
type GetBookmarksMessageResponse = MessageResponse<
  chrome.bookmarks.BookmarkTreeNode[]
>
type BackgroundImageMessageResponse = MessageResponse<string>

export {
  MessageType,
  Message,
  MessageData,
  SetbackgroundImageMessage,
  GetBookmarksMessage,
  StartBackgroundImageRotationMessage,
}

export type {
  MessageResponse,
  GetBookmarksMessageResponse,
  BackgroundImageMessageResponse,
}

const LAST_IMAGE_STORAGE_KEY = 'lastImage'
const LAST_IMAGE_ROTATION_TIME_STORAGE_KEY = 'date'

export { LAST_IMAGE_STORAGE_KEY, LAST_IMAGE_ROTATION_TIME_STORAGE_KEY }
