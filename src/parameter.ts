import { Type, Static, TSchema } from '@sinclair/typebox'
import { TSchema as TOpenApiSchema } from './schema'
import { TReference } from './reference'
import { TExample } from './example'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const TParameterLocation = Type.Union([
  Type.Literal('query'),
  Type.Literal('header'),
  Type.Literal('path'),
  Type.Literal('cookie')
], {
  $id: 'ParameterLocation',
  examples: [
    'query',
    'header',
    'path',
    'cookie'
  ]
})

export type ParameterLocation = Static<typeof TParameterLocation>

export const TParameterStyle = Type.Union([
  Type.Literal('form'),
  Type.Literal('simple')
], {
  $id: 'ParameterStyle',
  examples: [
    'form',
    'simple'
  ]
})

export type ParameterStyle = Static<typeof TParameterStyle>

export const TParameter = Type.Object({
  name: Type.String(),
  in: Type.Ref(TParameterLocation, { default: TParameterLocation.examples[0] }),
  description: Type.Optional(Type.String()),
  required: Type.Optional(Type.Boolean()),
  deprecated: Type.Optional(Type.Boolean()),
  allowEmptyValue: Type.Optional(Type.Boolean()),
  style: Type.Optional(Type.Ref(TParameterStyle, { default: TParameterStyle.examples[0] })),
  explode: Type.Optional(Type.Boolean()),
  allowReserved: Type.Optional(Type.Boolean()),
  schema: Type.Optional(Type.Ref(TOpenApiSchema, { default: TOpenApiSchema.examples[0] })),
  example: Type.Optional(Type.Any()),
  examples: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(TExample, { default: TExample.examples[0] })
  ])))
}, {
  $id: 'Parameter',
  examples: [
    {
      name: 'sessionId',
      in: 'cookie'
    },
    {
      name: 'token',
      in: 'header',
      description: 'token to be passed as a header',
      required: true,
      schema: {
        type: 'array',
        items: {
          type: 'integer',
          format: 'int64'
        }
      },
      style: 'simple'
    },
    {
      name: 'id',
      in: 'query',
      description: 'ID of the object to fetch',
      required: false,
      schema: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      style: 'form',
      explode: true
    }
  ]
})

export const TParameterReferences: TSchema[] = [
  TParameterLocation,
  TParameterStyle,
  TOpenApiSchema,
  TReference,
  TExample
]

export type Parameter = Static<typeof TParameter>

export const isParameter = TypeCompiler.Compile(TParameter, TParameterReferences)
