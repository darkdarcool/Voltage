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

function checkParanthesis(str: any) {
  str = str.split('\n')
  let brackets = [];
  for (let i = 0; i < str.length; i++) {     
      if (str[i] === 'print("') {
          brackets.push(str[i]);
      } else if (str[i] === '")') {
          if (brackets[brackets.length - 1] === 'print("') brackets.pop();
          else brackets.push("#");
      }
  }
  return brackets;
}

export default function parse(file: string):any {
  var reBrackets = /print\("(.*?)"\)/g;
  var listOfText = [];
  var found;
  while(found = reBrackets.exec(file)) {
    listOfText.push(found[1]);
  };
  for (let i = 0; i < listOfText.length; i++) {
    file = file.replace(`print("${listOfText[i]}")`, `print("${listOfText[i]}\\n")`);
  }
  let check = file
  let data = replace(file, { "print": "sys.stdout.write", 'os.system("clear")': "sys.stdout.write('\\033c')" })
  data = "import sys\nimport os\n" + data
  return data
}