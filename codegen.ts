import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://192.168.10.137:1337/graphql',
  documents: ['./graphql/queries/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './graphql/generated/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
