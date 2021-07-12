// 自定义 提示信息的实现
export default function cerateHint(CodeMirror, hintName = 'searchMode', dataSet) {
  CodeMirror.registerHelper("hint", hintName, function (cm, options) {
    var cur = cm.getCursor();
    var token = cm.getTokenAt(cur);
    var start = token.start;
    var end = cur.ch;
    var keyword = token.string;

    var hintList = dataSet.getHintList(keyword)
    if (hintList.length)
      return {
        list: hintList,
        from: CodeMirror.Pos(cur.line, start),
        to: CodeMirror.Pos(cur.line, end),
      };
  })
  CodeMirror.defineMIME('text/x-searchMode', 'searchMode') //定义别名为text/x-zzzz
}
