import { Bookmarks } from './bookmarks'
import { bookmarksSearch } from './fuse-search'

class Search {
  private bookmarks: chrome.bookmarks.BookmarkTreeNode[] = []
  private flattenedBookmarks: chrome.bookmarks.BookmarkTreeNode[] = []

  async search(
    term: string | null
  ): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
    if (!term || !term.length || !term.trim().length) {
      return await this.cachedBookmarks()
    }

    return bookmarksSearch(term.trim(), this.flattenedBookmarks)
  }

  // helper
  async cachedBookmarks(): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
    if (!this.bookmarks || !this.bookmarks.length) {
      ;[this.bookmarks, this.flattenedBookmarks] =
        await new Bookmarks().getFromStartPage()
    }
    return this.bookmarks
  }
}

export const searchService = new Search()
