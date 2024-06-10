import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import { dirname, relative } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { URL, fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import manifest from './manifest.config'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url)),
      src: fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    // legacy({
    //   targets: ['defaults'],
    // }),

    crx({
      manifest,
      browser: 'chrome',
    }),

    vue(),

    AutoImport({
      imports: ['vue', 'vue/macros', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables/'],
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: ['src/components'],
      // generate `components.d.ts` for ts support with Volar
      dts: 'src/components.d.ts',
    }),

    // rewrite assets to use relative path
    {
      name: 'assets-rewrite',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), '/assets')}/`
        )
      },
    },
    viteStaticCopy({
      targets: [
        {
          src: 'manifest.json',
          dest: '.',
        },
        {
          src: 'src/assets/icons/**.png',
          dest: './icons',
        },
        {
          src: 'src/assets/wallpaper/**.jpg',
          dest: './wallpaper',
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        extension: 'index.html',
        'service-worker': './src/background/index.ts',
      },
      output: {
        entryFileNames: (assetInfo) =>
          assetInfo.name === 'service-worker'
            ? 'service-worker.js'
            : 'assets/[name]-[hash].js',
      },
    },
    minify: 'terser',
    terserOptions: {},
    outDir: 'dist/chrome',
  },
  server: {
    port: 8888,
    strictPort: true,
    hmr: {
      port: 8889,
      overlay: false,
    },
  },
  optimizeDeps: {
    include: ['vue', '@vueuse/core'],
    exclude: ['vue-demi'],
  },
  assetsInclude: ['src/assets/*/**'],
})
