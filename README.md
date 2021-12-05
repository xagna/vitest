# vitest

[![NPM version](https://img.shields.io/npm/v/vitest?color=a1b858&label=)](https://www.npmjs.com/package/vitest)

A blazing fast test runner powered by Vite.

## Features

- [Vite](https://vitejs.dev/)'s config, transformers, resolvers, and plugins. Powered by [vite-node](https://github.com/antfu/vite-node)
- [Jest Snapshot](https://jestjs.io/docs/snapshot-testing)
- [Chai](https://www.chaijs.com/) for assertions
- [Sinon](https://sinonjs.org/) for mocking
- Async suite / test, top level await
- ESM friendly
- Out-of-box TypeScript support
- Suite and Test filtering (skip, only, todo)

```ts
import { it, describe, expect, assert } from 'vitest'

describe('suite name', () => {
  it('foo', () => {
    assert.equal(Math.sqrt(4), 2)
  })

  it('bar', () => {
    expect(1 + 1).eq(2)
  })

  it('snapshot', () => {
    expect({ foo: 'bar' }).toMatchSnapshot()
  })
})
```

```bash
$ npx vitest
```

## Configuration

`vitest` will read your root `vite.config.ts` when it present to match with the plugins and setup as your Vite app. If you want to it to have a different configuration for testing, you could either:

- Create `vitest.config.ts`, which will have the higher priority
- Pass `--config` option to CLI, e.g. `vitest --config ./path/to/vitest.config.ts`
- Use `process.env.VITEST` to conditionally apply differnet configuration in `vite.config.ts`

To configure `vitest` itself, add `test` property in your Vite config

```ts
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    // ...
  }
})
```

## Global APIs

By default, `vitest` does not provide global APIs for explicitness. If you prefer to use the APIs globally like Jest, you can pass the `--global` option to CLI or add `global: true` in the config.

```ts
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    global: true
  }
})
```

To get TypeScript working with the global APIs, add `vitest/global` to the `types` filed in your `tsconfig.json`

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": [
      "vitest/global"
    ]
  }
}
```

## Filtering

### Skipping suites and tasks

Use `.skip` to avoid running certain suites or tests 

```ts
describe.skip('skipped suite', () => {
  it('task', () => {
    // Suite skipped, no error
    assert.equal(Math.sqrt(4), 3)
  })
})

describe('suite', () => {
  it.skip('skipped task', () => {
    // Task skipped, no error
    assert.equal(Math.sqrt(4), 3)
  })
})
```

### Selecting suites and tests to run

Use `.only` to only run certain suites or tests 

```ts
// Only this suite (and others marked with only) are run
describe.only('suite', () => {
  it('task', () => {
    assert.equal(Math.sqrt(4), 3) 
  })
})

describe('another suite', () => {
  it('skipped task', () => {
     // Task skipped, as tests are running in Only mode
    assert.equal(Math.sqrt(4), 3)
  })

  it.only('task', () => {
     // Only this task (and others marked with only) are run
    assert.equal(Math.sqrt(4), 2)
  })
})
```

### Unimplemented suites and tests

Use `.todo` to stub suites and tests that should be implemented

```ts
 // An entry will be shown in the report for this suite
describe.todo('unimplemented suite')

// An entry will be shown in the report for this task
describe('suite', () => {
  it.todo('unimplemented task')
})
```

## TODO

- [x] Reporter & Better output
- [x] Task filter
- [x] Mock
- [x] Global Mode & Types
- [ ] Parallel Executing
- [ ] CLI Help
- [ ] JSDom
- [ ] Watch
- [ ] Source Map
- [ ] Coverage

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2021 [Anthony Fu](https://github.com/antfu)
