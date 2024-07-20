module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['babel-plugin-react-docgen-typescript', {exclude: 'node_modules'}],
    ['@babel/plugin-transform-private-methods', {loose: true}],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@apis': './src/apis',
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@libs': './src/libs',
          '@models': './src/models',
          '@navigators': './src/navigators',
          '@screens': './src/screens',
          '@styles': './src/styles',
          '@utils': './src/utils',
        },
      },
    ],
  ],
  overrides: [
    {
      test: fileName => !fileName.includes('node_modules/react-native-maps'),
      plugins: [['@babel/plugin-transform-private-methods', {loose: true}]],
    },
  ],
};
