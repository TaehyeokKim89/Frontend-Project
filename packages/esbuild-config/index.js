const { build } = require('esbuild')

const run = ({
  entryPoints = ['src/index.ts'],
  pkg,
  config = {},
}) => {
  const dev = process.argv.includes("--dev");
  const minify = !dev;

  const watch = process.argv.includes("--watch")

  const external = Object.keys({
    ...pkg.devDependencies,
    ...pkg.peerDependencies,
  })

  const baseConfig = {
    entryPoints,
    bundle: true,
    minify,
    sourcemap: true,
    outdir: "dist",
    target: "es2019",
    watch,
    external,
    ...config,
  }

  Promise.all([
    build({
      ...baseConfig,
      format: 'esm'
    }),

    //commonjs es module 

    build({
      ...baseConfig,
      format: 'cjs',
      outExtension: {
        ".js": ".cjs",
      }
    })
  ]).catch(() => {
    console.error("build failed");
    process.exit(1);
  })
}

module.exports = run;