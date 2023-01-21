import { Static, TSchema, TSelf, Type } from '@sinclair/typebox'
import { TReference } from './reference'
import { TServer, TServerReferences } from './server'
import { TExternalDocumentation } from './externalDocumentation'
import { TParameter, TParameterReferences } from './parameter'
import { TResponse, TResponseReferences } from './response'
import { TSecurityRequirement } from './securityRequirement'
import { TRequestBody, TRequestBodyReferences } from './requestBody'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const TMethod = Type.Union([
  Type.Literal('get'),
  Type.Literal('put'),
  Type.Literal('post'),
  Type.Literal('delete'),
  Type.Literal('options'),
  Type.Literal('head'),
  Type.Literal('patch'),
  Type.Literal('trace')
], {
  $id: 'Method',
  examples: [
    'get',
    'put',
    'post',
    'delete',
    'options',
    'head',
    'patch',
    'trace'
  ]
})

export type Method = Static<typeof TMethod>

export const isMethod = TypeCompiler.Compile(TMethod)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function TOperation (TPathItem: TSelf) {
  return Type.Object({
    tags: Type.Optional(Type.Array(Type.String())),
    summary: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    externalDocs: Type.Optional(Type.Ref(TExternalDocumentation, { default: TExternalDocumentation.examples[0] })),
    operationId: Type.Optional(Type.String()),
    parameters: Type.Optional(Type.Array(Type.Union([
      Type.Ref(TReference, { default: TReference.examples[0] }),
      Type.Ref(TParameter, { default: TParameter.examples[0] })
    ]))),
    requestBody: Type.Optional(Type.Union([
      Type.Ref(TReference, { default: TReference.examples[0] }),
      Type.Ref(TRequestBody, { default: TRequestBody.examples[0] })
    ])),
    responses: Type.Optional(Type.Record(Type.String(), Type.Union([
      Type.Ref(TReference, { default: TReference.examples[0] }),
      Type.Ref(TResponse, { default: TResponse.examples[0] })
    ]))),
    callbacks: Type.Optional(Type.Record(Type.String(), Type.Union([
      Type.Ref(TReference, { default: TReference.examples[0] }),
      TPathItem
    ]))),
    deprecated: Type.Optional(Type.Boolean()),
    security: Type.Optional(Type.Array(Type.Ref(TSecurityRequirement, { default: TSecurityRequirement.examples[0] }))),
    servers: Type.Optional(Type.Array(Type.Ref(TServer, { default: TServer.examples[0] })))
  })
}

export const TPathItem = Type.Recursive(Self => {
  const OperationSchema = Type.Optional(TOperation(Self))
  return Type.Object({
    summary: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    servers: Type.Optional(Type.Array(Type.Ref(TServer, { default: TServer.examples[0] }))),
    parameters: Type.Optional(Type.Array(Type.Union([
      Type.Ref(TReference, { default: TReference.examples[0] }),
      Type.Ref(TParameter, { default: TParameter.examples[0] })
    ]))),
    get: OperationSchema,
    put: OperationSchema,
    post: OperationSchema,
    delete: OperationSchema,
    options: OperationSchema,
    head: OperationSchema,
    patch: OperationSchema,
    trace: OperationSchema
  })
}, {
  $id: 'PathItem',
  examples: [
    {},
    {
      get: {
        description: 'Returns pets based on ID',
        summary: 'Find pets by ID',
        operationId: 'getPetsById',
        responses: {
          200: {
            description: 'pet response',
            content: {
              '*/*': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas.ts/Pet'
                  }
                }
              }
            }
          },
          default: {
            description: 'error payload',
            content: {
              'text/html': {
                schema: {
                  $ref: '#/components/schemas.ts/ErrorModel'
                }
              }
            }
          }
        }
      },
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID of pet to use',
          required: true,
          schema: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          style: 'simple'
        }
      ]
    }
  ]
})

export const TPathItemReferences: TSchema[] = Array.from(new Set([
  TReference,
  TServer, ...TServerReferences,
  TExternalDocumentation,
  TParameter, ...TParameterReferences,
  TResponse, ...TResponseReferences,
  TSecurityRequirement,
  TRequestBody, ...TRequestBodyReferences
]))

export type PathItem = Static<typeof TPathItem>

export const isPathItem = TypeCompiler.Compile(TPathItem, TPathItemReferences)
