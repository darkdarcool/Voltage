import * as types from '../types/types.ts';
import * as utils from '../utils/error.ts'; 
import { help } from './help.ts';

const args = Deno.args; // Get args

// deno-lint-ignore no-explicit-any
export default function parse():any {
  if (!args[0]) {
    console.log(help)
    Deno.exit(0)
    return null
  }
  if (args[0] == "compile" || args[0] == "build") {
    if (!args[1]) {
      const error:types.error = {
        kind: "Required compiling paths",
        message: `No compiling paths we're specified`
      }
      utils.error(error);
      return null
    }
    // deno-lint-ignore prefer-const
    let files = [];
    let index = 0;
    let hasCommand = false;
    while (true) {
      index++;
      if (index >= args.length) break 
      const file = args[index];
      if (file.charAt(0) == "-") {
        hasCommand = true; 
        break; 
      }
      else {
        files.push(file)
      }
    }
    if (hasCommand) {
      if (args[index] == "-o" || args[index] == "--output" || args[index] == ">") {
        if (!args[index + 1]) {
          const error:types.error = {
            kind: "Output file specification required",
            message: "No output specification is required when called"
          }
          utils.error(error);
        }
        else {
          const toReturn:types.args = {
            files: files,
            outFile: `${args[index + 1]}`
          }
          return toReturn;
        }
      }
      // Put other commands after complations here
    }
    else {
      const toReturn:types.args = {
        files: files,
        outFile: "compiled.py"
      }
      return toReturn
    }
  }
  else if (args[0] == "-h" || args[0] == "--help") {
    console.log(help)
    Deno.exit(0)
    return null
  }
  else {
    const error: types.error = {
      kind: "Bad option",
      message: `Command ${args[0]} can't be found`
    }
    utils.error(error);
  }
}