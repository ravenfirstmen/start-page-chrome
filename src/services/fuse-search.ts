import Fuse from 'fuse.js'

export function bookmarksSearch(
  term: string,
  bookmarks: chrome.bookmarks.BookmarkTreeNode[]
): chrome.bookmarks.BookmarkTreeNode[] {
  const options = {
    includeScore: true,
    isCaseSensitive: false,
    useExtendedSearch: true,
    shouldSort: true,
    keys: ['title'],
  }

  const fuse = new Fuse(bookmarks, options)

  const result = fuse.search(term).map((i) => i.item)

  return [{ id: '', title: 'Bookmarks...', children: result }]
}
