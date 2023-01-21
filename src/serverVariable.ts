import { Static, Type } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const TServerVariable = Type.Object({
  enum: Type.Optional(Type.Array(Type.String())),
  default: Type.String(),
  description: Type.Optional(Type.String())
}, {
  $id: 'ServerVariable',
  examples: [
    { default: 'example' },
    {
      enum: ['example', 'nonExample'],
      default: 'example',
      description: 'An example server variable'
    }
  ]
})

export type ServerVariable = Static<typeof TServerVariable>

export const isServerVariable = TypeCompiler.Compile(TServerVariable)
