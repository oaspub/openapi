import { Static, Type } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const TReference = Type.Object({
  $ref: Type.String()
}, {
  $id: 'Reference',
  examples: [
    {
      $ref: '#/components/schemas.ts/SomePayload'
    }
  ]
})

export type Reference = Static<typeof TReference>

export const isReference = TypeCompiler.Compile(TReference)
