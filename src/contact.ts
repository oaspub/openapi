import { Static, Type } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const TContact = Type.Object({
  name: Type.Optional(Type.String()),
  url: Type.Optional(Type.String()),
  email: Type.Optional(Type.String())
}, {
  $id: 'Contact',
  examples: [
    {},
    {
      name: 'API Support',
      url: 'https://www.example.com/support',
      email: 'support@example.com'
    }
  ]
})

export type Contact = Static<typeof TContact>

export const isContact = TypeCompiler.Compile(TContact)
