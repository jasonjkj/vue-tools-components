// 引入全局实例
import _CodeMirror from 'codemirror'
// 核心样式
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/eclipse.css'
import './codeMirror.css'//自己定制的  codeMirror 样式
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
//自定义 mode hint
import createHint from './createHint'
import createMode from './createMode'

import data from './data'

// 尝试获取全局实例
const CodeMirror = window.CodeMirror || _CodeMirror

//产生初始化  数据
var initData={
  operatesList:[
    {
      "name": "AND",
      "function": "A AND B",
      type: "abstract"
    },
    {
      "name": "OR",
      "function": "A OR B",
      type: "abstract"
    },
    {
      "name": "(",
      type: "abstract"
    },
    {
      "name": ")",
      type: "abstract"
    },
  ],
  historyList:[],
  filtersList:data.data.fields,
  specialCharacters:[
    {
      "name": "=",
      "function": "expr = value",
      type: "abstract"
    },
    {
      "name": "!=",
      "function": "expr != value",
      type: "abstract"
    },
    {
      "name": ">",
      "function": "expr > value",
      type: "abstract"
    },
    {
      "name": "<",
      "function": "expr < value",
      type: "abstract"
    },
    {
      "name": ">=",
      "function": "expr >= value",
      type: "abstract"
    },
    {
      "name": "<=",
      "function": "expr <= value",
      type: "abstract"
    },
    {
      "name": "in",
      "function": "expr in (values)",
      type: "abstract"
    },
    {
      "name": "not in",
      "function": "expr not in (values)",
      type: "abstract"
    },
    {
      "name": "like",
      "function": "expr like value",
      type: "abstract"
    },
    {
      "name": "not like",
      "function": "expr not like value",
      type: "abstract"
    },
    {
      "name": "not empty",
      "function": "notEmpty(expr)",
      type: "abstract"
    },
    {
      "name": "empty",
      "function": "empty(expr)",
      type: "abstract"
    }
  ]
};

// 自定义 提示信息的实现
class Dataset {
  constructor({operatesList, historyList, filtersList,specialCharacters}) {
    //存储原始数据
    this.sourceData = {}
    this.sourceData = this.keepSourcedata(operatesList, historyList, filtersList, specialCharacters)
    //存储格式化的数据
    this.hintData = {}
    this.hintData.operatesList = this.formatOperates(operatesList)
    this.hintData.historyList = this.formatHistory(historyList)
    this.hintData.filtersList = this.formatFilters(filtersList)
  }

  getHintList(keyword) {
    // 获取提示列表
    var operatesList = this.hintData.operatesList || []
    var historyList = this.hintData.historyList || []
    var filtersList = this.hintData.filtersList || []
    // var matchList=this.matchFilter(filtersList,keyword)
    return [...filtersList, ...operatesList, ...historyList]
  }

  matchFilter(list, keyword) {
    // 用于 匹配过滤器
    const results = list.filter((item) => {
      if(item.type === 'abstract'){
        return  true
      }
      return item.displayText && item.displayText.indexOf(keyword) !== -1
    });
    return results
  }

  formatHistory(list) {
    //格式化 历史数据
    if (!(list && list.length > 0)) {
      return
    }
    var tempTitle = {}
    var clearHistory={
      type:"abstract",
      text: "清空历史记录",
      displayText: "清空历史记录",
      className: "divider hint-clear",
      hint(cm, callback, options) {
        console.log("清空历史记录");
      }
    }
    var results = []
    tempTitle = {
      type:"abstract",
      text: "",
      displayText: "历史记录",
      className: "divider hint-title",
      // hint(cm, callback, options) {}
    };

    results = list.map((item, index) => {
      return {
        text: item.name,
        displayText: item.label,
        className: "history-item el-dropdown-menu__item relative-item",
        // hint(cm, callback, options) {}
      }
    })
    results.unshift(tempTitle)
    return results
  }

  formatFilters(list) {
    //格式化 过滤器
    if (!(list && list.length > 0)) {
      return
    }
    var tempTitle = {}
    var results = []
    tempTitle = {
      text: "",
      displayText: "Filter",
      className: "divider hint-title",
      hint(cm, callback, options) {
        console.log("点击了 Filterbi'标题");
      },
    };

    results = list.map((item, index) => {
      return {
        text: item.name,
        displayText: `${ item.label }(${ item.name })`,
        className: "filter-item el-dropdown-menu__item relative-item",
      }
    })
    results.unshift(tempTitle)
    return results
  }

  formatOperates(list) {
    //格式化 操作符
    if (!(list && list.length > 0)) {
      return
    }
    var tempTitle = {}
    var results = []
    tempTitle = {
      type:"abstract",
      text: "",
      displayText: "操作符",
      className: "divider hint-title",
      // hint(cm, callback, options) {}
    };

    results = list.map((item, index) => {
      return {
        text: item.name,
        displayText: item.name,
        className: "operates-item el-dropdown-menu__item relative-item",
        // hint(cm, callback, options) {}
      }
    })
    results.unshift(tempTitle)
    return results
  }

  keepSourcedata(operatesList, historyList, filtersList,specialCharacters) {
    //初始化原始数据  方法(存放的是 全量原始数据)
    var sourceData = {}
    //支持的逻辑运算符
    sourceData.operatesList = operatesList || []
    //历史记录 这是个麻烦 最后再写
    sourceData.historyList = historyList || []
    //过滤器列表
    sourceData.filtersList = filtersList || []
    sourceData.specialCharacters = specialCharacters || []
    return sourceData
  }

  matchHightlight(keyWord) {
    //匹配高亮
    // var reg = new RegExp(keyWord, 'i')
    var matchFlag=false
   //reg.test(val)
    matchFlag=this.sourceData.operatesList.some((item)=>{
      return keyWord === item.name
    })
    if(matchFlag){
      return  'keyword'
    }
    matchFlag=this.sourceData.historyList.some((item)=>{
      return keyWord === item.name
    })
    if(matchFlag){
      return  'variable-2'
    }
    matchFlag=this.sourceData.filtersList.some((item)=>{
      return keyWord === item.name
    })
    if(matchFlag){
      return  'comment'
    }
    matchFlag=this.sourceData.specialCharacters.some((item)=>{
      return keyWord === item.name
    })
    if(matchFlag){
      return  'atom'
    }
  }
}
var dataset=new Dataset(initData)
createMode(CodeMirror,'searchMode',dataset);
createHint(CodeMirror,'searchMode',dataset)

export default CodeMirror
