import { BunPlugin } from "bun"

export function httpsPlugin(): BunPlugin {
  return {
    name: 'https-plugin',
    async setup(build) {

      build.onResolve({ filter: /^https?:\/\// }, args => {
        return {
          path: args.path,
          namespace: 'http-url',
        }
      })

      build.onResolve({ filter: /.*/, namespace: 'http-url' }, args => {
        return {
          path: new URL(args.path, args.importer).toString(),
          namespace: 'http-url',
        }
      })

      build.onLoad({ filter: /.*/, namespace: 'http-url' }, async (args) => {
        const response = await fetch(args.path)
        const text = await response.text()

        return {
          contents: `export default ${JSON.stringify(text)}`,
          loader: 'js'
        }
      })
    }
  }
}
