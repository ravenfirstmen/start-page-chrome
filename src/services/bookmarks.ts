import { GetBookmarksMessage } from '../shared'

function flatten(c: chrome.bookmarks.BookmarkTreeNode) {
  return c.children ? [].concat(...c.children.map(flatten)) : c
}

export class Bookmarks {
  async getFromStartPage(): Promise<
    [chrome.bookmarks.BookmarkTreeNode[], chrome.bookmarks.BookmarkTreeNode[]]
  > {
    const bookmarks = await chrome.runtime.sendMessage(GetBookmarksMessage)

    const flattened = bookmarks
      .map((v: chrome.bookmarks.BookmarkTreeNode) => flatten(v))
      .flat()

    return [bookmarks, flattened]
  }
}
