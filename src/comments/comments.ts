// const actual = strip(input, { language: name });


export default function removeComments(data: string) {
  const regex = /(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')|(#.*$)/gm;
  const str = `

  ${data}
  `
  const result = str.replace(regex, (m: any, group1: any) => {
    if (group1 == null ) return m;
    else return "";
  });
  let removeLines = result;
  removeLines = removeLines.replace(/^\s*$(?:\r\n?|\n)/gm, "");
  return removeLines
} 