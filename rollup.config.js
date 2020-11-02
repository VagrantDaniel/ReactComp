import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import nodeResolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';
import image from '@rollup/plugin-image';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

const external = Object.keys(pkg.dependencies);

const banner = `/* ${pkg.name} version : ${pkg.version} */`;

export default {
  input: 'src/components/DynamicList/index.tsx',
  output: [{
    format: "cjs",
    file: 'sdk/lib/index.cjs.js',
    sourcemap: true,
    banner,
  },
  {
    format: "es",
    file: "lib/index.esm.js",
    sourcemap: true,
    banner,
  }],
  external: external,
  plugins: [
    postcss({
      extract: false,
      minimize: production,
    }),
    typescript(),
    // 处理 svg 等
    image(),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        ['@babel/env', { loose: true, modules: false }],
        '@babel/react',
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      runtimeHelpers: true,
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            helpers: true,
            regenerator: true,
          },
        ],
      ],
    }),
    commonjs({
        include: 'node_modules/**',
        namedExports: {
            'node_modules/react/index.js': [
                'Component',
                'PureComponent',
                'Fragment',
                'Children',
                'createElement',
                'useContext',
                'useEffect',
                'useLayoutEffect',
                'useMemo',
                'useReducer',
                'useRef',
                'useState',
            ],
            'node_modules/react-dom/index.js': ['unstable_batchedUpdates'],
            'node_modules/react-is/index.js': [
                'isContextConsumer',
                'isValidElementType',
                'isFragment', 
                'ForwardRef',
                'isMemo'
            ],
        },
    }),
    nodeResolve(),
    // minify, but only in production
    production &&
      terser({
        compress: {
          drop_console: true,
        },
        output: {
          comments: new RegExp(pkg.name.replace(/\//g, '\\/')),
        },
      }),
  ],
};
