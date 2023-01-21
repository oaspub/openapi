import test, { ExecutionContext } from 'ava'
import { TypeCheck } from '@sinclair/typebox/compiler'
import { TSchema } from '@sinclair/typebox'
import {
  TCallback, isCallback,
  TComponents, isComponents,
  TContact, isContact,
  TDocument, isDocument,
  TEncoding, isEncoding,
  TExample, isExample,
  TExternalDocumentation, isExternalDocumentation,
  THeader, isHeader,
  TInfo, isInfo,
  TLicense, isLicense,
  TLink, isLink,
  TMediaType, isMediaType,
  TOauthFlow, isOauthFlow,
  TOauthFlowType, isOauthFlowType,
  TOauthFlows, isOauthFlows,
  TOperation, isOperation,
  TParameter, isParameter,
  TPathItem, isPathItem,
  TReference, isReference,
  TRequestBody, isRequestBody,
  TResponse, isResponse,
  TSecurityRequirement, isSecurityRequirement,
  TSecurityScheme, isSecurityScheme,
  TSecuritySchemeType, isSecuritySchemeType,
  TServer, isServer,
  TServerVariable, isServerVariable,
  TTag, isTag
} from '../src'

const macro = test.macro({
  exec (t: ExecutionContext, [schema, compiled]: [TSchema, TypeCheck<any>], expected: boolean): void {
    for (const example of schema.examples ?? []) {
      t.is(compiled.Check(example), expected)
    }
  },
  title (title = '', [schema]: [TSchema, TypeCheck<any>], _: boolean): string {
    if (title !== '') title += ': '
    title += `validates examples of ${schema.$id ?? '<missing-$id>'}`
    return title
  }
})

test(macro, [TCallback, isCallback], true)
test(macro, [TComponents, isComponents], true)
test(macro, [TContact, isContact], true)
test(macro, [TDocument, isDocument], true)
test(macro, [TEncoding, isEncoding], true)
test(macro, [TExample, isExample], true)
test(macro, [TExternalDocumentation, isExternalDocumentation], true)
test(macro, [THeader, isHeader], true)
test(macro, [TInfo, isInfo], true)
test(macro, [TLicense, isLicense], true)
test(macro, [TLink, isLink], true)
test(macro, [TMediaType, isMediaType], true)
test(macro, [TOauthFlow, isOauthFlow], true)
test(macro, [TOauthFlowType, isOauthFlowType], true)
test(macro, [TOauthFlows, isOauthFlows], true)
test(macro, [TOperation, isOperation], true)
test(macro, [TParameter, isParameter], true)
test(macro, [TPathItem, isPathItem], true)
test(macro, [TReference, isReference], true)
test(macro, [TRequestBody, isRequestBody], true)
test(macro, [TResponse, isResponse], true)
test(macro, [TSecurityRequirement, isSecurityRequirement], true)
test(macro, [TSecurityScheme, isSecurityScheme], true)
test(macro, [TSecuritySchemeType, isSecuritySchemeType], true)
test(macro, [TServer, isServer], true)
test(macro, [TServerVariable, isServerVariable], true)
test(macro, [TTag, isTag], true)
