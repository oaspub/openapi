import { Type, Static } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'

// TODO - Make OauthFlows for each kind: authorizationCode, clientCredentials, password, and implicit
export const TOauthFlow = Type.Object({
  authorizationUrl: Type.Optional(Type.String()),
  tokenUrl: Type.Optional(Type.String()),
  refreshUrl: Type.Optional(Type.String()),
  scopes: Type.Record(Type.String(), Type.String())
}, {
  $id: 'OauthFlow',
  examples: [
    {
      authorizationUrl: 'https://example.com/api/oauth/dialog',
      scopes: {
        'write:pets': 'modify pets in your account',
        'read:pets': 'read your pets'
      }
    },
    {
      authorizationUrl: 'https://example.com/api/oauth/dialog',
      tokenUrl: 'https://example.com/api/oauth/token',
      scopes: {
        'write:pets': 'modify pets in your account',
        'read:pets': 'read your pets'
      }
    }
  ]
})

export type OauthFlow = Static<typeof TOauthFlow>

export const isOauthFlow = TypeCompiler.Compile(TOauthFlow)
