<template>
  <div class="in-coder-panel">
    <textarea ref="textarea"
              name=""
              cols="30"
              rows="1"
              placeholder="例: srcip=172.16.86.11 service=HTTP"
              class="mirror-text"
              style="display: none;"></textarea>
  </div>
</template>

<script type="text/ecmascript-6">
  import './codeMirror'
  // 引入全局实例
  import _CodeMirror from 'codemirror'
  // 核心样式
  import 'codemirror/lib/codemirror.css'
  // 引入主题后还需要在 options 中指定主题才会生效
  // import 'codemirror/theme/cobalt.css'
  import 'codemirror/theme/eclipse.css'

  // 引入mode 这里是sql
  import 'codemirror/mode/sql/sql'
  import 'codemirror/mode/javascript/javascript.js'
  // 引入代码提示
  import 'codemirror/addon/hint/show-hint.css'
  import 'codemirror/addon/hint/show-hint'
  import 'codemirror/addon/hint/anyword-hint' //关键字
  // 上边两个是定义提示的前提，下边定义自动提示是哪种模式，此处为sql
  // import 'codemirror/addon/hint/sql-hint'
  // 引入keymap
  import 'codemirror/addon/comment/comment'
  import 'codemirror/keymap/sublime'
  // import './code_editor.scss'

  //自动匹配括号
  import 'codemirror/addon/edit/closebrackets'

  // 尝试获取全局实例
  const CodeMirror = window.CodeMirror || _CodeMirror

  // 定义我们需要高亮的关键字
  const myHighlightList = [
    'hello',
    '你好',
    '$aaa$'
  ]
  // https://codemirror.net/doc/manual.html#modeapi
  //手册描述
  CodeMirror.defineMode('searchMode', (config) => {
    return {
      /**
       这个token  方法就是用来标亮关键字的，
       CodeMirror会自上而下，从左往右得遍历每一个字符，依次调用token方法。
       返回样式字符串 class 类
       **/
      token: (stream, state) => {
        if (stream.eatSpace()) {
          return null
        }

        stream.eatWhile(/[\$\w\u4e00-\u9fa5]/)

        const cur = stream.current();
        //自定义一些高亮字段


        const exist = myHighlightList.some((item) => {
          return item === cur
        })

        //keyword  atom number  string   查看codemirror.css文件
        if (exist) {
          return 'string'    //注意  这里返回的是一个css的样式类.....
          // return 'hword'    //注意  这里返回的是一个css的样式类.....
        }

        stream.next()
      }
    }
  });

  CodeMirror.registerHelper("hint", "searchMode", function (cm, options) {
    var cur = cm.getCursor()
    var token = cm.getTokenAt(cur);
    var start = token.start;
    var end = cur.ch
    var str = token.string

    const list = myHighlightList.filter((item) => {
      return item.indexOf(str) === 0
    })

    if (list.length)
      return {
        list: [{
          text: "asdasdasd",
          displayText: "displayText",
          supportsSelection: false,
          className: "6666",
          hint(cm, callback, options) {
            console.log("触发了点击方法",cm, callback, options);
            console.log(arguments);
          }
        }],
        from: CodeMirror.Pos(cur.line, start),
        to: CodeMirror.Pos(cur.line, end),
      };
  })
  CodeMirror.defineMIME('text/x-searchMode', 'searchMode') //定义别名为text/x-zzzz
  export default {
    name: 'in-coder',
    props: {
      // 外部传入的内容，用于实现双向绑定
      value: String,
    },
    data() {
      return {
        // 内部真实的内容
        code: '',
        // 编辑器实例
        coder: null,
        // 默认配置
        options: {
          keyMap: 'sublime',
          tabSize: 2, // 缩进格式

          theme: 'eclipse',       // 主题，对应主题库 JS 需要提前引入
          line: true,
          lineNumbers: false,     // 显示行数
          indentUnit: 4,          // 缩进单位为4
          styleActiveLine: true,  // 当前行背景高亮
          mode: "searchMode",     // HMTL混合模式
          foldGutter: true,
          lint: true,
          auto: "auto",//自动换行
          // autofocus: true,  //自动聚焦
          autoCloseBrackets: true, // 自动闭合符号
          matchBrackets: true,	   // 是否添加匹配括号高亮
          spellcheck: true,        //启用拼写检查
          autocorrect: true,       //启用自动更正
          lineWrapping: true,      //滚动或换行以显示长行

          // 提示配置
          hintOptions: {
            completeSingle: false, // 自动匹配唯一值
            //匹配 t_test_login.col_a  用. 来连接的
            // tables: {
            //   "t_test_login": [ "col_a", "col_B", "col_C" ],
            //   "t_test_employee": [ "other_columns1", "other_columns2" ]
            // }
          }
        },
      }
    },
    mounted() {
      // 初始化
      this._initialize()
      this.initkeyMap()
      this.initHint()
    },
    methods: {
      initHint() {
        /***********代码提示*********************/
        // 方案1: 任何更改 都会触发代码提示
        // this.coder.on("cursorActivity", () => {
        //   this.coder.showHint();
        // });
        //方案2: 只有我们的手动操作才会触发提示框显示
        this.coder.on("inputRead", () => {
          this.coder.showHint({
            completeSingle: false,
          })
        });
      },
      getHint() {
        console.log(this.arguments);
      },
      // 初始化
      _initialize() {
        // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
        this.coder = CodeMirror.fromTextArea(this.$refs.textarea, this.options)
        // 编辑器赋值
        this.coder.setValue(this.value || this.code)
        // 支持双向绑定
        this.coder.on('change', (coder) => {
          this.code = coder.getValue()
          if (this.$emit) {
            this.$emit('input', this.code)
          }
        });
      },
      // 更改模式
      changeMode(val) {
        // 修改编辑器的语法配置
        this.coder.setOption('mode', `text/${val}`)
      },
      initkeyMap() {
        //初始化 键盘事件
        this.coder.setOption("extraKeys", {
          Tab: function (cm) {
            console.log('用户点击了  tab 按键');
            // cm.replaceSelection(spaces);
          },
          Enter: function () {
            console.log('enter', '用户点击回车了');
          },
          // "Ctrl-Space":"autocomplete"    //智能提示按钮
        });
      }
    }
  }
</script>

<style scoped>
  .in-coder-panel {
    border: 1px solid red;
  }

  .in-coder-panel .CodeMirror {
    height: inherit;
  }

  /* 修改编辑器的样式 */
  /*.CodeMirror {*/
  /*  border: 1px solid black;*/
  /*  font-size:15px;*/
  /*  width: 100px;*/
  /*  height: 100px*/
  /*}*/
</style>
