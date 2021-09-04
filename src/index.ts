import argparse from './args/parser.ts';
import * as utils from './utils/error.ts';
import * as types from './types/types.ts';
import chalk from 'https://deno.land/x/chalkin@v0.1.3/mod.ts';
import compile from './compile.ts';
try {
  const data = argparse();
  if (data == undefined) {
    console.log(chalk.red.bold("Arg does not exist"))
    Deno.exit(0)
  }
  let file = "";

  if (data['files'] == undefined) {
    console.log(chalk.red.bold("Complation error"))
  }

  console.log(chalk.blue.bold("[1/3]") + chalk.white.bold(": Finding files..."))
  for (let i = 0; i < data['files'].length; i++) {
    // console.log(data.files)
    try {
      file = file + Deno.readTextFileSync(`${data['files'][i]}`);
    } catch {
      const error: types.error = {
        kind: "Bad file",
        message: `File '${data.files[0]}' can't be found`
      }
      console.log(utils.error(error));
    }
  }
  console.log(chalk.blue.bold("[2/3]") + chalk.white.bold(": Building files..."))

  const test = Deno.run({
    cmd: ["python3", data['files'][0]],
    stdout: "piped",
    stderr: "piped"
  });

  //const output = await test.output() // "piped" must be set
  // const _outStr = new TextDecoder().decode(output);

  const errthing = await test.stderrOutput();
  const errContent = new TextDecoder().decode(errthing);
  /*
  if (errContent) {
    // Deno.removeSync(data.outFile);
    console.log(chalk.red('Operation canceled\n\nError found in source file'));
    console.log(chalk.red.bold(errContent));
    Deno.exit(0);
  }
  */
  console.log(chalk.blue.bold("[3/3]") + chalk.white.bold(": Writing data..."))

  let parsed = compile(file)
  // deno-lint-ignore no-regex-spaces
  parsed = parsed.replace(/  /, ""); // Do not apply global flag, only one should be replaced
  parsed = parsed.split(/\r?\n/)

  // deno-lint-ignore no-explicit-any deno-lint-ignore prefer-const
  let main: Array<any> = [];
  for (let i = 0; i < parsed.length; ++i) {
    let line = `${parsed[i]}`
    // console.log(line.charAt(line.length -1 ))
    if (line.charAt(line.length - 1) != ":" || line.includes('import ')) {
      line = line + ";\n"
      main.push(line)
    }
    else {
      main.push(line + "\n")
    }
  }
  main[main.length - 1] = ""

  const uint8array = new TextEncoder().encode(`${main.join('')}`);
  try {
    Deno.writeFileSync(`${data.outFile}`, uint8array)
  } catch {
    console.log(chalk.red.bold("Error creating file"))
    Deno.exit(0)
  }
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
    if (data.ignoreErr) {
      console.log(chalk.yellow('Operation warn\n\nError found.'));
      console.log(chalk.blue("There is probably a problem with the compiler. Please post your issue in the github repo by finding it with the -h command"))
      if (!Deno.args[5]) {
        // 
      }
      else if (Deno.args[5] === "--show-errors") {
        console.log(chalk.yellow.bold(errorStr));
      }
      console.log(chalk.red.bold("\nThis error was ignored, and the operation was not cancled, the file will not run with the python compiler unless the issue is fixed"))
    }
    else {
      console.log(chalk.yellow('Operation warn\n\nError found.'));
      console.log(chalk.blue("There is probably a problem with the compiler. Please post your issue in the github repo by finding it with the -h command"))
      if (!Deno.args[5]) {
        // 
      }

      else if (Deno.args[5] === "--show-errors") {
        Deno.removeSync(data.outFile);
        console.log(chalk.red('Operation warn\n\nError found.'));
        console.log(chalk.blue("There is probably a problem with the compiler. Please post your issue in the github repo by finding it with the -h command"))
        console.log(chalk.red.bold(errorStr))
      }
    }
  }
  else {
    console.log(chalk.green.bold("Success!") + chalk.white.bold(" Operation passed!"))
  }
} catch {
  console.log(chalk.red.bold("File does not exist"))
}