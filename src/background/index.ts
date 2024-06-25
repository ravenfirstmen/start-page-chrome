import { handleOnInstall, handleOnStartup } from './bookmarks'
import { broker } from './message-broker'

// setup
chrome.runtime.onInstalled.addListener(handleOnInstall)

chrome.runtime.onStartup.addListener(handleOnStartup)


// just for debug purposes
chrome.runtime.onSuspend.addListener(() => {
})

chrome.runtime.onMessage.addListener(broker)

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}
