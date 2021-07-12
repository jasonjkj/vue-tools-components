// 自定义 提示信息的实现
//创建  搜索mode  模式

//提示信息  要支持下拉操作
import data from './data'
var list = data.data.fields;
var initData={
  operatesList:[
    {
      "name": "AND",
      "function": "A AND B",
      type: "base"
    },
    {
      "name": "OR",
      "function": "A OR B",
      type: "base"
    },
    {
      "name": "(",
      type: "base"
    },
    {
      "name": ")",
      type: "base"
    },
  ],
  historyList:[],
  filtersList:list
};
class Dataset {
  constructor({operatesList, historyList, filtersList}) {
    //存储原始数据
    this.sourceData = {}
    this.sourceData = this.keepSourcedata(operatesList, historyList, filtersList)
    var hintData = {}
    hintData.operatesList = this.formatOperates(operatesList)
    hintData.historyList = this.formatOperates(historyList)
    hintData.filtersList = this.formatOperates(filtersList)

  }

  getHintList(keyword) {
    // 获取提示列表
    var operatesList = this.hintData.operatesList || []
    var historyList = this.hintData.historyList || []
    var filtersList = this.hintData.filtersList || []

    var a=this.matchFilter(filtersList,keyword)

    return [...filtersList, ...operatesList, ...historyList]
  }

  initData() {

  }

  matchFilter(list, keyword) {
    // 用于 匹配过滤器
    const results = list.filter((item) => {
      return item.name.indexOf(str) !== -1 || item.value.indexOf(str) !== -1
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
      text: "清空历史记录",
      displayText: "清空历史记录",
      supportsSelection: false,
      className: "divider hint-clear",
      hint(cm, callback, options) {
        console.log("清空历史记录");
      }
    }
    var results = []
    tempTitle = {
      text: "历史",
      displayText: "历史",
      supportsSelection: false,
      className: "divider hint-title",
      // hint(cm, callback, options) {}
    };

    results = list.map((item, index) => {
      return {
        text: item.name,
        displayText: item.label,
        supportsSelection: true,
        className: "divider history-item",
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
      text: "Filter",
      displayText: "Filter",
      supportsSelection: false,
      className: "divider hint-title",
      // hint(cm, callback, options) {}
    };

    results = list.map((item, index) => {
      return {
        text: item.name,
        displayText: item.label,
        supportsSelection: true,
        className: "divider filter-item",
        // hint(cm, callback, options) {}
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
      text: "操作符",
      displayText: "操作符",
      supportsSelection: false,
      className: "divider hint-title",
      // hint(cm, callback, options) {}
    };

    results = list.map((item, index) => {
      return {
        text: item.name,
        displayText: item.name,
        supportsSelection: true,
        className: "divider operates-item",
        // hint(cm, callback, options) {}
      }
    })
    results.unshift(tempTitle)
    return results
  }

  keepSourcedata(operatesList, historyList, filtersList) {
    //初始化原始数据  方法(存放的是 全量原始数据)
    var sourceData = {}
    //支持的逻辑运算符
    sourceData.operatesList = []
    //历史记录 这是个麻烦 最后再写
    sourceData.historyList = []
    //过滤器列表
    sourceData.filtersList = []
    return sourceData
  }
}

export function cerateHint(CodeMirror, hintName = 'searchMode') {
  CodeMirror.registerHelper("hint", hintName, function (cm, options) {
    var cur = cm.getCursor();
    var token = cm.getTokenAt(cur);
    var start = token.start;
    var end = cur.ch;
    var keyword = token.string;

    var dataSet=new Dataset(initData);
    const hintList = dataSet.getHintList(keyword)

    if (hintList.length)
      return {
        list: hintList,
        from: CodeMirror.Pos(cur.line, start),
        to: CodeMirror.Pos(cur.line, end),
      };
  })
  CodeMirror.defineMIME('text/x-searchMode', 'searchMode') //定义别名为text/x-zzzz
}
