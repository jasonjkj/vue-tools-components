//自己定制的  codeMirror 样式
import './codeMirror.css'
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


