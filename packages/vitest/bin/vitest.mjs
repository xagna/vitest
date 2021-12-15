#!/usr/bin/env node

import { fileURLToPath } from 'url'
import { resolve } from 'path'
import { checkPeerDependency } from '../dist/utils.js'

const argv = process.argv.slice(2)

if (argv.includes('--coverage')) {
  checkPeerDependency('c8/bin/c8.js')
  const filename = fileURLToPath(import.meta.url)
  const entry = resolve(filename, '../../dist/cli.js')
  process.argv.splice(2, 0, process.argv[0], entry)
  await import('c8/bin/c8.js')
}
else {
  await import('../dist/cli.js')
}