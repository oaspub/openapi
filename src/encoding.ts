import { Type, Static, TSchema } from '@sinclair/typebox'
import { TReference } from './reference'
import { THeader, THeaderReferences } from './header'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const TEncoding = Type.Object({
  contentType: Type.Optional(Type.String()),
  headers: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(THeader, { default: THeader.examples[0] })
  ]))),
  style: Type.Optional(Type.String()),
  explode: Type.Optional(Type.Boolean()),
  allowReserved: Type.Optional(Type.Boolean())
}, {
  $id: 'Encoding',
  examples: [
    {
      contentType: 'application/xml; charset=utf-8'
    },
    {
      contentType: 'image/png, image/jpeg',
      headers: {
        'X-Rate-Limit-Limit': {
          description: 'The number of allowed requests in the current period',
          schema: {
            type: 'integer'
          }
        }
      }
    }
  ]
})

export const TEncodingReferences: TSchema[] = Array.from(new Set([
  TReference,
  THeader, ...THeaderReferences
]))

export type Encoding = Static<typeof TEncoding>

export const isEncoding = TypeCompiler.Compile(TEncoding, TEncodingReferences)
