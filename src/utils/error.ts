import chalk from 'https://deno.land/x/chalkin@v0.1.3/mod.ts';
import * as types from '../types/types.ts';

export function error(data: types.error) {
  console.log(chalk.bold.red(`${data.kind}: ${data.message}`));
  Deno.exit(0);
}