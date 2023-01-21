import { Type, Static, TSchema } from '@sinclair/typebox'
import { TSchema as TOpenApiSchema } from './schema'
import { TReference } from './reference'
import { TExample } from './example'
import { TEncoding, TEncodingReferences } from './encoding'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const TMediaType = Type.Object({
  schema: Type.Optional(Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(TOpenApiSchema, { default: TOpenApiSchema.examples[0] })
  ])),
  example: Type.Optional(Type.Any()),
  examples: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(TExample, { default: TExample.examples[0] })
  ]))),
  encoding: Type.Optional(Type.Record(Type.String(), Type.Ref(TEncoding)))
}, {
  $id: 'MediaType',
  examples: [
    {},
    {
      schema: {
        $ref: '#/components/schemas.ts/Pet'
      },
      examples: {
        cat: {
          summary: 'An example of a cat',
          value: {
            name: 'Fluffy',
            petType: 'Cat',
            color: 'White',
            gender: 'male',
            breed: 'Persian'
          }
        },
        dog: {
          summary: 'An example of a dog with a cat\'s name',
          value: {
            name: 'Puma',
            petType: 'Dog',
            color: 'Black',
            gender: 'Female',
            breed: 'Mixed'
          },
          frog: {
            $ref: '#/components/examples/frog-example'
          }
        }
      }
    }
  ]
})

export const TMediaTypeReferences: TSchema[] = Array.from(new Set([
  TReference,
  TOpenApiSchema,
  TExample,
  TEncoding, ...TEncodingReferences
]))

export type MediaType = Static<typeof TMediaType>

export const isMediaType = TypeCompiler.Compile(TMediaType, TMediaTypeReferences)
