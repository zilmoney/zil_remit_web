import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { copyFileSync, mkdirSync, readdirSync, existsSync } from 'fs'

// Plugin to copy blog files to dist
const copyBlogsPlugin = () => {
  return {
    name: 'copy-blogs',
    closeBundle() {
      const blogsDir = path.resolve(__dirname, 'blogs')
      const distBlogsDir = path.resolve(__dirname, 'dist/blogs')
      const rootDir = path.resolve(__dirname)
      const distDir = path.resolve(__dirname, 'dist')
      
      // Create dist/blogs directory if it doesn't exist
      if (!existsSync(distBlogsDir)) {
        mkdirSync(distBlogsDir, { recursive: true })
      }
      
      // Copy all HTML files from blogs to dist/blogs
      if (existsSync(blogsDir)) {
        const files = readdirSync(blogsDir)
        files.forEach(file => {
          if (file.endsWith('.html')) {
            const src = path.join(blogsDir, file)
            const dest = path.join(distBlogsDir, file)
            copyFileSync(src, dest)
            console.log(`Copied blog: ${file}`)
          }
        })
      }
      
      // Copy root-level HTML files to dist (except index.html which is handled by Vite)
      const rootHtmlFiles = ['404.html', 'blog.html', 'blog-page-2.html', 'blog-page-3.html', 'blog-page-4.html', 'blog-page-5.html', 'blogs.html', 'cookie-policy.html', 'disclaimer.html', 'privacy-policy.html', 'terms-and-condition.html']
      rootHtmlFiles.forEach(file => {
        const src = path.join(rootDir, file)
        const dest = path.join(distDir, file)
        if (existsSync(src)) {
          copyFileSync(src, dest)
          console.log(`Copied root HTML: ${file}`)
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['5173-ius8palcrkmlvtjvs2k23-16b15d6d.manus-asia.computer']
  },
  plugins: [react(), tailwindcss(), copyBlogsPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  publicDir: 'public', // Ensures public directory files are copied to dist
})
