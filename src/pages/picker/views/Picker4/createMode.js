//创建  搜索mode  模式
export default function cerateMode(CodeMirror, modeName = 'searchMode', dataSet) {
  CodeMirror.defineMode(modeName, (config) => {
    return {
      token: (stream, state) => {
        if (stream.eatSpace()) {
          return null
        }
        stream.eatWhile(/[\$\w\u4e00-\u9fa5]/);

        const cur = stream.current();
        var cssClass = dataSet.matchHightlight(cur) || ''
        if (cssClass) {
          return cssClass
        }
        stream.next()
      }
    }
  });
}
