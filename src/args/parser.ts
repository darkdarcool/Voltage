import * as types from '../types/types.ts';
import * as utils from '../utils/error.ts'; 

const args = Deno.args; // Get args

export default function parse():any {
  if (!args[0]) {
    // TODO: Do a help command
    return
  }
  if (args[0] == "compile" || args[0] == "build") {
    if (!args[1]) {
      let error:types.error = {
        kind: "Required compiling paths",
        message: `No compiling paths we're specified`
      }
      utils.error(error);
      return ""
    }
    let files = [];
    let index = 0;
    let hasCommand = false;
    while (true) {
      index++;
      if (index >= args.length) break 
      let file = args[index];
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
          let error:types.error = {
            kind: "Output file specification required",
            message: "No output specification is required when called"
          }
          utils.error(error);
        }
        else {
          let toReturn:types.args = {
            files: files,
            outFile: `${args[index + 1]}`
          }
          return toReturn;
        }
      }
      // Put other commands after complations here
    }
    else {
      let toReturn:types.args = {
        files: files,
        outFile: "compiled.py"
      }
      return toReturn
    }
  }
  else if (args[0] == "-h" || args[0] == "--help") {
    // Help command
    return 
  }
  else {
    let error: types.error = {
      kind: "Bad option",
      message: `Command ${args[0]} can't be found`
    }
    utils.error(error);
  }
}