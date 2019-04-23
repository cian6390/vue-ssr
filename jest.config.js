module.exports = {
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'vue'],
  setupFiles: ['jest-localstorage-mock'],
  snapshotSerializers: ['jest-serializer-vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.[jt]sx?$': 'babel-jest',
    '\\.(gql|graphql)$': 'jest-transform-graphql'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  globals: {
    'ts-jest': {
      babelConfig: 'babelrc.config.js'
    }
  }
};
