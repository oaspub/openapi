import { Type, Static, TSchema } from '@sinclair/typebox'
import { TExternalDocumentation } from './externalDocumentation'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const TTag = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  externalDoc: Type.Optional(Type.Ref(TExternalDocumentation, { default: TExternalDocumentation.examples[0] }))
}, {
  $id: 'Tag',
  examples: [
    { name: 'Resource' },
    {
      name: 'Resource',
      description: 'A subresource tag example',
      externalDoc: {
        url: 'https://example.com/resource'
      }
    }
  ]
})

export const TTagReferences: TSchema[] = [
  TExternalDocumentation
]

export type Tag = Static<typeof TTag>

export const isTag = TypeCompiler.Compile(TTag, TTagReferences)
