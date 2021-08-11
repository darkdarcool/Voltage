import removeComments from './comments/comments.ts';
import parse from './parser/parser.ts'

export default function compile(file: string) {
  // deno-lint-ignore no-explicit-any
  let commented:any = removeComments(`${file}`);
  commented = parse(commented);
  // console.log("HHellO!")
  return commented
}