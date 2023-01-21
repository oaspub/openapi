import { Type, Static } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const TExternalDocumentation = Type.Object({
  description: Type.Optional(Type.String()),
  url: Type.String()
}, {
  $id: 'ExternalDocumentation',
  examples: [
    {
      url: 'https://example.com'
    },
    {
      description: 'Find more info here',
      url: 'https://example.com'
    }
  ]
})

export type ExternalDocumentation = Static<typeof TExternalDocumentation>

export const isExternalDocumentation = TypeCompiler.Compile(TExternalDocumentation)
