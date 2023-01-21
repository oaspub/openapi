import { Type, Static, TSchema } from '@sinclair/typebox'
import { TReference } from './reference'
import { TPathItem, TPathItemReferences } from './pathItem'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const TCallback = Type.Record(Type.String(), Type.Union([
  Type.Ref(TReference, { default: TReference.examples[0] }),
  Type.Ref(TPathItem, { default: TPathItem.examples[0] })
]), {
  $id: 'Callback',
  examples: [
    {},
    {
      myCallback: {
        '{$request.query.queryUrl}': {
          post: {
            requestBody: {
              description: 'Callback payload',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas.ts/SomePayload'
                  }
                }
              }
            },
            responses: {
              200: {
                description: 'callback successfully processed'
              }
            }
          }
        }
      }
    }
  ]
})

export const TCallbackReferences: TSchema[] = Array.from(new Set([
  TReference,
  TPathItem, ...TPathItemReferences
]))

export type Callback = Static<typeof TCallback>
export const isCallback = TypeCompiler.Compile(TCallback, TCallbackReferences)
