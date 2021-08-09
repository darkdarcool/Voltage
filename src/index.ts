import parse from './args/parser.ts';
import removeComments from './comments/comments.ts';
import * as utils from './utils/error.ts';
import * as types from './types/types.ts';
import chalk from 'https://deno.land/x/chalkin@v0.1.3/mod.ts';



const data = parse();

let file;

console.log(chalk.blue.bold("[1/3]") + chalk.white.bold(": Finding files..."))

try {
  file = Deno.readTextFileSync(`${data.files[0]}`);
} catch {
  const error:types.error = {
    kind: "Bad file",
    message: `File '${data.files[0]}' can't be found`
  }
  console.log(utils.error(error));
}

console.log(chalk.blue.bold("[2/3]") + chalk.white.bold(": Building files..."))



let commented = removeComments(`${file}`);

// do whatever to the string

console.log(chalk.blue.bold("[3/3]") + chalk.white.bold(": Writing data..."))

commented = `${commented}`; // Make sure it has strings

// deno-lint-ignore no-regex-spaces
commented = commented.replace(/  /, ""); // Do not apply global flag, only one should be replaced

commented = commented.replace(/\r?\n|\r/g, ";")

const uint8array = new TextEncoder().encode(`${commented}`);

Deno.writeFileSync(`${data.outFile}`, uint8array)

const cmd = Deno.run({
  cmd: ["python3", data.outFile], 
  stdout: "piped",
  stderr: "piped"
});

const output = await cmd.output() // "piped" must be set
const _outStr = new TextDecoder().decode(output);

const error = await cmd.stderrOutput();
const errorStr = new TextDecoder().decode(error);

cmd.close(); // Don't forget to close it

if (errorStr) {
  Deno.removeSync(data.outFile);
  console.log(chalk.red('Operation canceled\n\nError found.'));
  console.log(chalk.red.bold(errorStr));
  Deno.exit(0)
}
else {
  console.log(chalk.green.bold("Success!") + chalk.white.bold(" Operation passed!"))
}