import basicConfig from './rollup.config.js'
import { terser } from "rollup-plugin-terser"
import replace from '@rollup/plugin-replace'

const config = {
  ...basicConfig,
  output: [
    {
      name: 'ByteComponents',
      file: 'dist/index.umd.js',
      format: 'umd',
      exports: 'named',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'axios': 'Axios'
      },
      plugins: [
        terser()
      ],
    },
  ],
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    ...basicConfig.plugins
  ],
  external: ['react', 'react-dom', 'axios']
}

export default config