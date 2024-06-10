import Fuse from 'fuse.js'
import { Bookmarks } from './bookmarks'

class Search {
  private bookmarks: chrome.bookmarks.BookmarkTreeNode[] = []
  private fuse: Fuse<chrome.bookmarks.BookmarkTreeNode> | null = null

  async search(
    term: string | null
  ): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
    if (!term || !term.length || !term.trim().length) {
      return await this.cachedBookmarks()
    }

    return this.fuseSearch(term.trim())
  }

  // helper
  async cachedBookmarks(): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
    if (!this.bookmarks || !this.bookmarks.length) {
      let flattenedBookmarks: chrome.bookmarks.BookmarkTreeNode[] = []
      ;[this.bookmarks, flattenedBookmarks] = await new Bookmarks().getFromStartPage()
      this.prepareFuseSearch(flattenedBookmarks)
    }
    return this.bookmarks
  }


  fuseSearch(term: string): chrome.bookmarks.BookmarkTreeNode[] {
    const result = this.fuse!.search(term).map((i) => i.item)
  
    return [{ id: '', title: 'Bookmarks...', children: result }]
  }
  
  prepareFuseSearch(items: chrome.bookmarks.BookmarkTreeNode[]) {
    const options = {
      includeScore: false,
      isCaseSensitive: false,
      useExtendedSearch: true,
      shouldSort: true,
      keys: ['title'],
    }

    this.fuse = new Fuse(items, options)
  }
}

export const searchService = new Search()
