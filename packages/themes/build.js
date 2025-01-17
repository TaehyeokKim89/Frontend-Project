import run from "@th/esbuild-config";
import pkg from './package.json' assert {type: 'json'};

run({
  pkg,
})