import { Type, Static, TSchema } from '@sinclair/typebox'
import { TSchema as TOpenApiSchema } from './schema'
import { TReference } from './reference'
import { TExample } from './example'
import { TParameterStyle } from './parameter'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const THeader = Type.Object({
  description: Type.Optional(Type.String()),
  required: Type.Optional(Type.Boolean()),
  deprecated: Type.Optional(Type.Boolean()),
  allowEmptyValue: Type.Optional(Type.Boolean()),
  style: Type.Optional(Type.Ref(TParameterStyle)),
  explode: Type.Optional(Type.Boolean()),
  allowReserved: Type.Optional(Type.Boolean()),
  schema: Type.Optional(Type.Ref(TOpenApiSchema, { default: TOpenApiSchema.examples[0] })),
  example: Type.Optional(Type.Any()),
  examples: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(TExample, { default: TExample.examples[0] })
  ])))
}, {
  $id: 'Header',
  examples: [
    {},
    {
      description: 'The number of allowed requests in the current period',
      schema: {
        type: 'integer'
      }
    }
  ]
})

export const THeaderReferences: TSchema[] = [
  TParameterStyle,
  TOpenApiSchema,
  TReference,
  TExample
]

export type Header = Static<typeof THeader>

export const isHeader = TypeCompiler.Compile(THeader, THeaderReferences)
