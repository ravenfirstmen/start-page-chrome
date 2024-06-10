import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json' assert { type: 'json' }

const { version, name, description, displayName } = packageJson
// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, '')
  // split into version parts
  .split(/[.-]/)

export default defineManifest(async (env) => ({
  name: env.mode === 'staging' ? `[INTERNAL] ${name}` : displayName || name,
  description,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  manifest_version: 3,
  // key: '',
  action: {
    default_icon: 'src/assets/icons/bookmark.png',
  },
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  // content_scripts: [
  //   {
  //     js: ['src/main.ts'],
  //     matches: ["<all_urls>"]
  //   },
  // ],
  chrome_url_overrides: {
    newtab: 'index.html',
    homepage: 'index.html',
  },
  offline_enabled: false,
  host_permissions: [],
  permissions: ['activeTab', 'tabs', 'bookmarks', 'storage', 'alarms'],
  icons: {
    '16': 'src/assets/icons/bookmark_16.png',
    '32': 'src/assets/icons/bookmark_32.png',
    '48': 'src/assets/icons/bookmark_48.png',
    '128': 'src/assets/icons/bookmark_128.png',
  },
}))
