<template>
  <div>
    <div class="in-coder-panel">
    <textarea ref="textarea" name="" id="55"
              cols="30" rows="1"
              placeholder="例: srcip=172.16.86.11 service=HTTP"
              class="mirror-text" style="display: none;"></textarea>
    </div>
    <h1> picker2 </h1>
  </div>

</template>

<script type="text/ecmascript-6">
  import codeMirror from './codeMirror'
  export default {
    mixins: [ codeMirror ],
    props: {
      value: String,
    },
    data() {
      return {
        code: '',
        options: {
          keyMap: 'sublime',
          tabSize: 2, // 缩进格式

          theme: 'eclipse',       // 主题，对应主题库 JS 需要提前引入
          line: true,

          indentUnit: 4,          // 缩进单位为4
          styleActiveLine: true,  // 当前行背景高亮
          mode: "text/x-filter",     // HMTL混合模式
          foldGutter: true,
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
            tables: {
              "filter_table": ['common_recv_time'],
            },
            // defaultTable: 'filter_table'  //默认展开的table
          },

          lineNumbers: false,
          gutters: ["CodeMirror-lint-markers"],
          lint: true
        },
      }
    },
    mounted() {
      // 初始化
      this.$nextTick(() => {
        this._initialize()
        this.initkeyMap()
        this.initHint()
      })
    },
    methods: {
      initHint() {
        /***********代码提示*********************/
        // 方案1: 任何更改 都会触发代码提示
        // this.coder.on("cursorActivity", () => {
        //   this.coder.showHint();
        // });
        // 方案2: 只有我们的手动操作才会触发提示框显示
        this.coder.on("inputRead", () => {
          this.coder.showHint();
        });
      },
      // 初始化
      _initialize() {
        this.initCodeMirror()
        // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
        this.coder = this.CodeMirror.fromTextArea(this.$refs.textarea, this.options)
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
          }
        });

        console.log(this.coder.getOption("extraKeys"))
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
</style>
