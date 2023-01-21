import { Type, Static, TSchema } from '@sinclair/typebox'
import { TExternalDocumentation } from './externalDocumentation'
import { TReference } from './reference'
import { TParameter, TParameterReferences } from './parameter'
import { TResponse, TResponseReferences } from './response'
import { TSecurityRequirement } from './securityRequirement'
import { TServer, TServerReferences } from './server'
import { TCallback, TCallbackReferences } from './callback'
import { TRequestBody, TRequestBodyReferences } from './requestBody'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const TOperation = Type.Object({
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
  callbacks: Type.Optional(Type.Ref(TCallback, { default: TCallback.examples[0] })),
  deprecated: Type.Optional(Type.Boolean()),
  security: Type.Optional(Type.Array(Type.Ref(TSecurityRequirement, { default: TSecurityRequirement.examples[0] }))),
  servers: Type.Optional(Type.Array(Type.Ref(TServer, { default: TServer.examples[0] })))
}, {
  $id: 'Operation',
  examples: [
    {},
    {
      tags: [
        'pet'
      ],
      summary: 'Updates a pet in the store with form data',
      operationId: 'updatePetWithForm',
      parameters: [
        {
          name: 'petId',
          in: 'path',
          description: 'ID of pet that needs to be updated',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      requestBody: {
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  description: 'Updated name of the pet',
                  type: 'string'
                },
                status: {
                  description: 'Updated status of the pet',
                  type: 'string'
                }
              },
              required: [
                'status'
              ]
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Pet updated.',
          content: {
            'application/json': {},
            'application/xml': {}
          }
        },
        405: {
          description: 'Method Not Allowed',
          content: {
            'application/json': {},
            'application/xml': {}
          }
        }
      },
      security: [
        {
          petstore_auth: [
            'write:pets',
            'read:pets'
          ]
        }
      ]
    }
  ]
})

export const TOperationReferences: TSchema[] = Array.from(new Set([
  TExternalDocumentation,
  TReference,
  TParameter, ...TParameterReferences,
  TResponse, ...TResponseReferences,
  TSecurityRequirement,
  TServer, ...TServerReferences,
  TCallback, ...TCallbackReferences,
  TRequestBody, ...TRequestBodyReferences
]))

export type Operation = Static<typeof TOperation>

export const isOperation = TypeCompiler.Compile(TOperation, TOperationReferences)
