import { Message, MessageType, MessageResponse } from '../shared'
import { handleStartBackgroundImageRotation } from './backgroud-image';
import { handleGetBookmarks } from './bookmarks'


export const broker = async (message: Message, sender: chrome.runtime.MessageSender, sendResponse: MessageResponse<unknown>) => {
    console.log('message: ' + message.type);

    if (sender.id != chrome.runtime.id) { // from the same extension
        return false;
    }

    switch (message.type) {
        case MessageType.GET_BOOKMARKS:
            await handleGetBookmarks(sendResponse);
            return true;
        case MessageType.START_BACKGROUND_IMAGE_ROTATION:
            await handleStartBackgroundImageRotation();
            return true;
        default:
            break; // just ignorit
    }

    return false;
}

