import { Static, Type, TSchema } from '@sinclair/typebox'
import { semanticVersion } from './util'
import { TInfo, TInfoReferences } from './info'
import { TServer, TServerReferences } from './server'
import { TPathItem, TPathItemReferences } from './pathItem'
import { TComponents, TComponentsReferences } from './components'
import { TSecurityRequirement } from './securityRequirement'
import { TTag, TTagReferences } from './tag'
import { TExternalDocumentation } from './externalDocumentation'
import { TReference } from './reference'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import { TSecuritySchemeReferences } from './securityScheme'

export const TDocument = Type.Object({
  openapi: Type.String({ pattern: semanticVersion.source, default: '3.1.0' }),
  info: Type.Ref(TInfo, { default: TInfo.examples[0] }),
  jsonSchemaDialect: Type.Optional(Type.String()),
  servers: Type.Optional(Type.Array(Type.Ref(TServer, { default: TServer.examples[0] }))),
  paths: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(TPathItem, { default: TPathItem.examples[0] })
  ]))),
  webhooks: Type.Optional(Type.Record(Type.String(), Type.Union([
    Type.Ref(TReference, { default: TReference.examples[0] }),
    Type.Ref(TPathItem, { default: TPathItem.examples[0] })
  ]))),
  components: Type.Optional(Type.Ref(TComponents, { default: TComponents.examples[0] })),
  security: Type.Optional(Type.Array(Type.Ref(TSecurityRequirement, { default: TSecurityRequirement.examples[0] }))),
  tags: Type.Optional(Type.Array(Type.Ref(TTag, { default: TTag.examples[0] }))),
  externalDocs: Type.Optional(Type.Ref(TExternalDocumentation, { default: TExternalDocumentation.examples[0] }))
}, {
  $id: 'Document',
  examples: [
    {
      openapi: '3.1.0',
      info: {
        title: 'Example API',
        version: '1.0.0'
      }
    },
    // TODO - Extend this example to make it more robust
    {
      openapi: '3.1.0',
      info: {
        title: 'Example API',
        version: '1.0.0'
      }
    }
  ]
})

export const TDocumentReferences: TSchema[] = Array.from(new Set([
  TReference,
  TInfo, ...TInfoReferences,
  TServer, ...TServerReferences,
  TPathItem, ...TPathItemReferences,
  TComponents, ...TComponentsReferences,
  TSecurityRequirement, ...TSecuritySchemeReferences,
  TTag, ...TTagReferences,
  TExternalDocumentation
]))

export type Document = Static<typeof TDocument>

export const isDocument = TypeCompiler.Compile(TDocument, TDocumentReferences)
