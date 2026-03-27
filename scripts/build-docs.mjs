import { build } from 'esbuild';

await build({
  entryPoints: ['docs/src/main.tsx'],
  bundle: true,
  outdir: 'docs',
  format: 'esm',
  jsx: 'automatic',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  loader: { '.module.css': 'local-css' },
  minify: true,
  sourcemap: true,
});
