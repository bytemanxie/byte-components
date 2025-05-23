import basicConfig from './rollup.config.js'
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle"

const config = {
  ...basicConfig,
  output: [
    {
      file: 'dist/index.es.js',
      format: 'es'
    }
  ],
  plugins: [
    ...basicConfig.plugins,
    excludeDependenciesFromBundle(),
  ]
}

export default config