![GitHub package.json version](https://img.shields.io/github/package-json/v/oaspub/openapi)

# OpenAPI Types, JSON Schemas, and Validators

Powered by [TypeBox](https://github.com/sinclairzx81/typebox).

## Usage

The types, schemas, and validators are broken into parts to support more fine-tuned use cases.
In most cases, the Document module is sufficient:

```typescript
import { isDocument } from '@oaspub/openapi'
// import { isDocument } from '@oaspub/openapi/dist/document'

let document = { ... }

if (isDocument.Check(document)) {
  // do stuff
}
```

If all you need to validate an operation object:

```typescript
import { isOperation } from '@oaspub/openapi'
// import { isOperation } from '@oaspub/openapi/dist/operation'

let operation = { ... }

if (isOperation.Check(operation)) {
  // do stuff
}
```
