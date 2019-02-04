import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload';


export default  {
  input: 'src/main.js',
  output: {
    file: 'dest/bundle.js',
    format: 'iife',
    name: "snowflake"
  },
  plugins: [
    serve(),
    livereload(),
  ]
}
