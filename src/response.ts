import { Type, Static, TSchema } from '@sinclair/typebox'
import { TReference } from './reference'
import { THeader, THeaderReferences } from './header'
import { TMediaType, TMediaTypeReferences } from './mediaType'
import { TLink, TLinkReferences } from './link'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const TResponse = Type.Object({
  description: Type.String(),
  headers: Type.Optional(Type.Record(
    Type.String(),
    Type.Union([
      Type.Ref(TReference, { default: TReference.examples[0] }),
      Type.Ref(THeader, { default: THeader.examples[0] })
    ])
  )),
  content: Type.Optional(Type.Record(
    Type.String(),
    Type.Ref(TMediaType, { default: TMediaType.examples[0] })
  )),
  links: Type.Optional(Type.Record(
    Type.String(),
    Type.Union([
      Type.Ref(TReference, { default: TReference.examples[0] }),
      Type.Ref(TLink, { default: TLink.examples[0] })
    ])))
}, {
  $id: 'Response',
  examples: [
    {
      description: 'a pet to be returned',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas.ts/Pet'
          }
        }
      }
    },
    {
      description: 'A simple string response',
      content: {
        'text/plain': {
          schema: {
            type: 'string',
            example: 'whoa!'
          }
        }
      },
      headers: {
        'X-Rate-Limit-Limit': {
          description: 'The number of allowed requests in the current period',
          schema: {
            type: 'integer'
          }
        },
        'X-Rate-Limit-Remaining': {
          description: 'The number of remaining requests in the current period',
          schema: {
            type: 'integer'
          }
        },
        'X-Rate-Limit-Reset': {
          description: 'The number of seconds left in the current period',
          schema: {
            type: 'integer'
          }
        }
      }
    }
  ]
})

export const TResponseReferences: TSchema[] = Array.from(new Set([
  TReference,
  THeader, ...THeaderReferences,
  TMediaType, ...TMediaTypeReferences,
  TLink, ...TLinkReferences
]))

export type Response = Static<typeof TResponse>

export const isResponse = TypeCompiler.Compile(TResponse, TResponseReferences)
