// deno-lint-ignore-file
function replace(message: string, map: any) {
  const escape = (str: string) => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const backtickPattern = '"[^"]*"';


  const pattern = new RegExp(
    backtickPattern + '|' + Object.keys(map)
      .map(escape)
      .join('|'),
    'g'
  );
  const output = message.replace(pattern, (match: string) => {
    if (match.startsWith('"')) {
    // backtick, don't perform any replacements:
      return match;
    }
    return map[match];
  });
  return output
}

export default function parse(file: string) {
  let check = file
  let data = replace(file, { "print": "sys.stdout.write" })
  if (data != check) data = "import sys\n" + data
  return data
}