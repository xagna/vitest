import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'
import minimist from 'minimist'
import { findUp } from 'find-up'
import { run } from './node.js'

process.env.VITEST = 'true'

const argv = minimist(process.argv.slice(2), {
  alias: {
    c: 'config',
  },
  string: ['root', 'config'],
  boolean: ['dev'],
})

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(argv.root || process.cwd())

const configPath = argv.config ? resolve(root, argv.config) : await findUp(['vitest.config.ts', 'vitest.config.js', 'vitest.config.mjs', 'vite.config.ts', 'vite.config.js', 'vite.config.mjs'], { cwd: root })

await run({
  root,
  files: [
    resolve(__dirname, argv.dev ? '../src/cli-entry.ts' : './cli-entry.js'),
  ],
  config: configPath,
  defaultConfig: {
    optimizeDeps: {
      exclude: [
        'vitest',
      ],
    },
  },
  shouldExternalize(id: string) {
    if (id.includes('/node_modules/vitest/'))
      return false
    else
      return id.includes('/node_modules/')
  },
})
