// 引入全局实例
import _CodeMirror from 'codemirror'
// 核心样式
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/eclipse.css'
import './codeMirror.css'//自己定制的  codeMirror 样式
// 引入mode 这里是sql
import 'codemirror/mode/sql/sql'
// 引入代码提示
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/anyword-hint' //关键字
// 引入keymap
import 'codemirror/addon/comment/comment'
import 'codemirror/keymap/sublime'
// import './code_editor.scss'
//自动匹配括号
import 'codemirror/addon/edit/closebrackets'
//自定义 mode hint
import createHint from './sql-hint.js'
import createMode from './sql.js'

import data from './data'

// 尝试获取全局实例
const CodeMirror = window.CodeMirror || _CodeMirror


import 'codemirror/addon/lint/lint'
import  createLint from './javascript-lint'
import 'codemirror/addon/lint/lint.css'



//产生初始化  数据
var initData = {
  operatesList: [
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
  historyList: [],
  filtersList: data.data.fields,
  //操作符仓库  用于记录 类型 和 操作符之间的映射关系
  operatesDic: [
    {
      "type": "int",
      "functions": "=,!=,>,<,>=,<=,in,not in"
    },
    {
      "type": "long",
      "functions": "=,!=,>,<,>=,<=,in,not in"
    },
    {
      "type": "float",
      "functions": "=,!=,>,<,>=,<="
    },
    {
      "type": "double",
      "functions": "=,!=,>,<,>=,<="
    },
    {
      "type": "string",
      "functions": "=,!=,in,not in,like,not like,not empty,empty"
    },
    {
      "type": "date",
      "functions": "=,!=,>,<,>=,<="
    },
    {
      "type": "timestamp",
      "functions": "=,!=,>,<,>=,<="
    }
  ]
};

// 自定义 提示信息的实现
class Dataset {
  constructor({operatesList, historyList, filtersList, operatesDic}) {
    //存储原始数据
    this.sourceData = {}
    this.sourceData = this.keepSourcedata(operatesList, historyList, filtersList, operatesDic)
    //存储格式化的数据
    this.hintData = {}
    this.hintData.operatesList = this.formatOperates(operatesList)
    this.hintData.historyList = this.formatHistory(historyList)
    this.hintData.filtersList = this.formatFilters(filtersList)
  }

  getHintList(keyword) {
    // 获取提示列表
    var operatesList = this.matchFilter(this.hintData.operatesList || [], keyword)
    var historyList = this.matchFilter(this.hintData.historyList || [], keyword)
    var filtersList = this.matchFilter(this.hintData.filtersList || [], keyword)
    return [...operatesList, ...filtersList, ...historyList]
  }

  matchFilter(list, keyword, exact = false) {
    // 用于 匹配过滤器
    const results = list.filter((item) => {
      if (item.type === 'abstract') {
        return true
      }
      var displayTextLow = item.displayText + '' ? (item.displayText + '').toLowerCase() : item.displayText;
      var keywordLow = keyword + '' ? (keyword + '').toLowerCase() : keyword;

      if (exact) {
        return displayTextLow && displayTextLow === keywordLow
      }
      return displayTextLow && displayTextLow.indexOf(keywordLow) !== -1
    });
    var hasEnable = results.some((item) => {
      return item.type !== 'abstract'
    });

    return hasEnable ? results : []
  }

  formatHistory(list) {
    //格式化 历史数据
    if (!(list && list.length > 0)) {
      return
    }
    var tempTitle = {}
    var clearHistory = {
      type: "abstract",
      text: "清空历史记录",
      displayText: "清空历史记录",
      className: "divider hint-clear",
      hint(cm, callback, options) {
        console.log("清空历史记录");
      }
    }
    var results = []
    tempTitle = {
      type: "abstract",
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
      type: "abstract",
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
        displayText: `${item.label}(${item.name})`,
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
      type: "abstract",
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

  keepSourcedata(operatesList, historyList, filtersList, operatesDic) {
    //初始化原始数据  方法(存放的是 全量原始数据)
    var sourceData = {};
    //支持的逻辑运算符
    sourceData.operatesList = operatesList || [];
    //历史记录 这是个麻烦 最后再写
    sourceData.historyList = historyList || [];
    //过滤器列表
    sourceData.filtersList = filtersList || [];
    //操作符仓库
    sourceData.operatesDic = operatesDic || [];
    return sourceData
  }

  matchHightlight(keyWord) {
    //匹配高亮
    // var reg = new RegExp(keyWord, 'i')
    var matchFlag = false
    //reg.test(val)
    matchFlag = this.sourceData.operatesList.some((item) => {
      return keyWord === item.name
    })
    if (matchFlag) {
      return 'keyword'
    }
    matchFlag = this.sourceData.historyList.some((item) => {
      return keyWord === item.name
    })
    if (matchFlag) {
      return 'variable-2'
    }
    matchFlag = this.sourceData.filtersList.some((item) => {
      return keyWord === item.name
    })
    if (matchFlag) {
      return 'comment'
    }
    matchFlag = this.sourceData.specialCharacters.some((item) => {
      return keyWord === item.name
    })
    if (matchFlag) {
      return 'atom'
    }
  }

  getOperates(type, item) {
    //获取 当前类型支持的操作符
    var operator_functions = ''
    if (item && item.doc && item.doc.constraints && item.doc.constraints.operator_functions) {
      operator_functions = item.doc.constraints.operator_functions
    } else {
      var functions = this.sourceData.operatesDic.find(item => {
        return item.type === type
      })
      operator_functions = functions && functions.functions || ''
    }
    var funList = operator_functions.split(',');
    var result = [];
    result = funList.map((item) => {
      return {
        text: item,
        displayText: item,
        className: "filter-item el-dropdown-menu__item relative-item",
      }
    });
    return result
  }

  getFieldInfo(keywords) {
    //获取字段的相关信息  1.下拉数据是需要获取的 2.支持的运算符 是不是需要呢  ???
    if (!keywords || !keywords.toLowerCase) {
      return
    }
    var fieldInfo = {}
    var matchItem = this.sourceData.filtersList.find((item) => {
      var itemName = item.name && item.name.toLowerCase()
      return keywords.toLowerCase() === itemName
    });
    if (!matchItem) {
      return null
    }
    if (matchItem && matchItem.doc && matchItem.doc.data) {
      fieldInfo.options = matchItem.doc.data.map(item => {
        return {
          text: item.code,
          displayText: item.value,
          className: "filter-item el-dropdown-menu__item relative-item",
        }
      });
      fieldInfo.operateType = 'select'
    }
    fieldInfo._matchItem = matchItem;
    fieldInfo.name = matchItem.name;
    fieldInfo.type = matchItem.type;
    fieldInfo.label = matchItem.label;
    return fieldInfo
  }
}

var codeMirrorMixin = {
  //组件中的其他属性 都可写在这里
  data() {
    return {
      CodeMirror,
      initData: {},
      dataset: null

    }
  },
  methods: {
    createMode,
    createHint,
    hinthook(result, {search, keywords, leftpart, rightpart}) {
      var fieldInfo = null
      if (leftpart) {
        fieldInfo = this.dataset.getFieldInfo(leftpart)
        //当你输入运算标识符的时候  做出如下提示
        if (fieldInfo && fieldInfo.options) {
          return fieldInfo.options
        } else {
          return []
        }
      }
      if (rightpart) {
        return []
      }

      // fieldInfo=this.dataset.getFieldInfo(search)
      // if (fieldInfo) {
      //   //当keywords 时完整的关键字的时候  展示当前字段支持的运算符
      //   return  this.dataset.getOperates(fieldInfo.type , fieldInfo._matchItem)
      // }
      result = this.dataset.getHintList(search)
      // return result
    },
    modehook(CodeMirror, set) {
      //自定义 过滤器类型
      CodeMirror.defineMIME("text/x-filter", {
        name: "sql",
        client: set("common_recv_time"),        //客户端解析指令
        keywords: set("and or like in not empty"),                //关键字
        //aggregation count count_distinct avg sun max min
        //type  int long float double string date timestamp
        builtin: set("count count_distinct avg sun max min int long float double string date timestamp"),     //内置类型 可以提示高亮
        atoms: set("false true null unknown"),
        operatorChars: /^[*+\-%<>!=&|^]/,
        dateSQL: set("date time timestamp"),
        support: set("ODBCdotTable doubleQuote binaryNumber hexNumber"),  //支持的数据编码  ODBC double 二进制  16进制
        hooks: {}
      });
    },
    keywordshook(keywords, mode) {
      // return Object.assign({}, mode.keywords,mode.client)
    },
    initCodeMirror() {
      //初始化方法
      this.initData = initData;
      var dataset = new Dataset(initData);
      this.dataset = dataset;
      createMode(CodeMirror,
        {
          dataset,
          modehook: this.modehook
        });
      createHint(CodeMirror, {
        dataset,
        hinthook: this.hinthook,
        keywordshook: this.keywordshook
      })
      // createLint(CodeMirror)
    }
  }
};

export default codeMirrorMixin
