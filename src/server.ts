import { Static, TSchema, Type } from '@sinclair/typebox'
import { TServerVariable } from './serverVariable'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export const TServer = Type.Object({
  url: Type.String(),
  description: Type.Optional(Type.String()),
  variables: Type.Optional(Type.Record(Type.String(), Type.Ref(TServerVariable, { default: TServerVariable.examples[0] })))
}, {
  $id: 'Server',
  examples: [
    {
      url: 'https://development.gigantic-server.com/v1',
      description: 'Development server'
    }
  ]
})

export const TServerReferences: TSchema[] = [
  TServerVariable
]

export type Server = Static<typeof TServer>

export const isServer = TypeCompiler.Compile(TServer, TServerReferences)
