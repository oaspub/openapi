import { Type, Static } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const TExample = Type.Object({
  summary: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  value: Type.Optional(Type.Any()),
  externalValue: Type.Optional(Type.String())
}, {
  $id: 'Example',
  examples: [
    {},
    {
      summary: 'A foo example',
      value: { foo: 'bar' }
    },
    {
      summary: 'This is a text example',
      externalValue: 'https://foo.bar/examples/address-example.txt'
    }
  ]
})

export type Example = Static<typeof TExample>

export const isExample = TypeCompiler.Compile(TExample)
