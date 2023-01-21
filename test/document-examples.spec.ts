import test, { ExecutionContext } from 'ava'
import path from 'path'
import fs from 'fs'
import { isDocument } from '../src/document'

const resourcesDir = path.resolve(__dirname, './resources')

const macro = test.macro({
  exec (t: ExecutionContext, filename: string, expected: boolean): void {
    const filePath = path.join(resourcesDir, filename)
    if (!fs.existsSync(filePath)) {
      throw Error(`Missing resource ${filename}`)
    }
    const content = JSON.parse(fs.readFileSync(filePath).toString())
    t.is(isDocument.Check(content), expected)
  },
  title (title = '', input: string): string {
    if (title !== '') title += ': '
    title += `validates ${input}`
    return title
  }
})

test(macro, 'api-with-examples.json', true)
test(macro, 'callback-example.json', true)
test(macro, 'link-example.json', true)
test(macro, 'petstore.json', true)
test(macro, 'petstore-expanded.json', true)
test(macro, 'uspto.json', true)
test(macro, 'webhook-example.json', true)
