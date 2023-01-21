import { Type, Static, TSchema } from '@sinclair/typebox'
import { TMediaType, TMediaTypeReferences } from './mediaType'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const TRequestBody = Type.Object({
  description: Type.Optional(Type.String()),
  content: Type.Record(Type.String(), Type.Ref(TMediaType, { default: TMediaType.examples[0] })),
  required: Type.Optional(Type.Boolean())
}, {
  $id: 'RequestBody',
  examples: [
    { content: {} },
    {
      description: 'user to add to the system',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas.ts/User'
          },
          examples: {
            user: {
              summary: 'User Example',
              externalValue: 'https://foo.bar/examples/user-example.json'
            }
          }
        },
        'application/xml': {
          schema: {
            $ref: '#/components/schemas.ts/User'
          },
          examples: {
            user: {
              summary: 'User example in XML',
              externalValue: 'https://foo.bar/examples/user-example.xml'
            }
          }
        },
        'text/plain': {
          examples: {
            user: {
              summary: 'User example in Plain text',
              externalValue: 'https://foo.bar/examples/user-example.txt'
            }
          }
        },
        '*/*': {
          examples: {
            user: {
              summary: 'User example in other format',
              externalValue: 'https://foo.bar/examples/user-example.whatever'
            }
          }
        }
      }
    }
  ]
})

export const TRequestBodyReferences: TSchema[] = Array.from(new Set([
  TMediaType, ...TMediaTypeReferences
]))

export type RequestBody = Static<typeof TRequestBody>

export const isRequestBody = TypeCompiler.Compile(TRequestBody, TRequestBodyReferences)
