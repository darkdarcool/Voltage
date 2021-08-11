import * as types from '../types/types.ts';
import * as utils from '../utils/error.ts'; 
import { help } from './help.ts';

const args = Deno.args; // Get args
// deno-lint-ignore no-explicit-any
export default function parse():any {
  if (!args[0]) {
    console.log(help)
    Deno.exit(0)
  }
  if (args[0] == "build" || args[0] == "compile") {
    let file = "";
    if (!args[1]) {
      const error: types.error = {
        kind: "No file found",
        message: "File property is required"
      }
      utils.error(error)
    }
    file = args[1];
    if (!args[2]) {
      const toReturn:types.args = {
        files: [file],
        outFile: "out.py",
        ignoreErr: false
      }
      return toReturn
    }
    else {
      if (args[2] == "-o" || args[2] == "--out" || args[2] == ">") {
        if (!args[3]) {
          const error: types.error = {
            kind: "Outfile not found",
            message: "Out file property is required"
          }
          utils.error(error)
        }
        if (!args[4]) {
          const toReturn: types.args = {
            files: [file],
            outFile: args[3],
            ignoreErr: false
          }
          return toReturn
        }
        if (args[4] == "--ignore-error") {
          const toReturn: types.args = {
            files: [file],
            outFile: args[3],
            ignoreErr: true
          }
          return toReturn
        }
        else {
          const error: types.error = {
            kind: "Bad option",
            message: "Arg " + args[4] + " does not exist"
          }
          utils.error(error)
        }
      }
      else {
        const error: types.error = {
          kind: "Bad option",
          message: "Arg " + args[2] + " does not exist"
        }
        utils.error(error)
      }
    }
  }
}