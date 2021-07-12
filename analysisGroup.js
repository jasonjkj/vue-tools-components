// 对方当前的 分组信息  进行一些操作  例如  识别分组信息

`
输入一个  list  分组信息
返回一个对象
该对象 
label:  当前列  对应的字段
type :    in empty operator  like unrecognizedExp
operatorKeyword:操作符关键字   in , not in ,  like , not like,empty, not empty , = ,  != , >= , <= , > , <,  
`

var val = [
  {
    "start": 2,
    "end": 21,
    "string": "common_s2c_byte_num",
    "type": "string-2",
    "state": {
      "tokenize": {"_custom": {"type": "function", "display": "<span>ƒ</span> tokenBase(stream, state)"}},
      "context": null
    }
  }, {
    "start": 22,
    "end": 23,
    "string": ">",
    "type": "operator",
    "state": {
      "tokenize": {"_custom": {"type": "function", "display": "<span>ƒ</span> tokenBase(stream, state)"}},
      "context": null
    }
  }, {
    "start": 24,
    "end": 26,
    "string": "12",
    "type": "number",
    "state": {
      "tokenize": {"_custom": {"type": "function", "display": "<span>ƒ</span> tokenBase(stream, state)"}},
      "context": null
    }
  }]

class TypeCharacteristics {
  //为什么 不用正则 直接看  字符串里面  会藏有  标识符 到时候 就玩砸了
  isOpetater(item, groupList, index) {
    //判断是不是存在  其他的关键字
    var hansOtherType = false;
    hansOtherType = groupList.some((item, index) => {
      if (item.type === 'builtin') {
        return true
      }
    });
    //判断有几个关键字
    var hasOneKeyword = true
    var keywords = groupList.filter((item, index) => {
      return item.type === 'operator'
    });
    keywords && keywords.length > 1 ? hasOneKeyword = false : hasOneKeyword = true

    if (!hansOtherType && hasOneKeyword) {
      return true
    }
    return false
  }

  isLike() {
    var hansOtherType = false;
    hansOtherType = groupList.some((item, index) => {
      if (item.type === 'operator') {
        return true
      }
      return item.type === 'builtin' && !['like', 'not'].includes(item.string.toLowerCase());
    });

    //判断有几个关键字
    var hasOneKeyword = true
    var keywords = groupList.filter((item, index) => {
      return item.type === 'builtin' && ['like'].includes(item.string.toLowerCase());
    });
    (keywords && keywords.length > 1) ? hasOneKeyword = false : hasOneKeyword = true

    var brackets = groupList.filter((item, index) => {
      return item.type === 'bracket'
    });
    var bracketMatch = !!(brackets && brackets.length === 2)
    if (!hansOtherType && hasOneKeyword && bracketMatch) {
      return true
    }
  }

  isIn(item, groupList, index) {
    //判断是不是 符合正则格式
    var hansOtherType = false;
    hansOtherType = groupList.some((item, index) => {
      if (item.type === 'operator') {
        return true
      }
      return item.type === 'builtin' && !['in', 'not'].includes(item.string.toLowerCase());
    });

    //判断有几个关键字
    var hasOneKeyword = true
    var keywords = groupList.filter((item, index) => {
      return item.type === 'builtin' && ['in'].includes(item.string.toLowerCase());
    });
    keywords && keywords.length > 1 ? hasOneKeyword = false : hasOneKeyword = true

    //有两个括号
    var brackets = groupList.filter((item, index) => {
      return item.type === 'bracket'
    });
    var bracketMatch = !!(brackets && brackets.length === 2)
    if (!hansOtherType && hasOneKeyword && bracketMatch) {
      return true
    }
  }

  isEmpty(item, groupList, index) {
    //判断是不是 符合正则格式
    var hansOtherType = false;
    hansOtherType = groupList.some((item, index) => {
      if (item.type === 'operator') {
        return true
      }
      return item.type === 'builtin' && !['empty', 'not'].includes(item.string.toLowerCase());
    });

    //判断有几个关键字
    var hasOneKeyword = true
    var keywords = groupList.filter((item, index) => {
      return item.type === 'builtin' && ['empty'].includes(item.string.toLowerCase());
    });
    (keywords && keywords.length > 1) ? hasOneKeyword = false : hasOneKeyword = true

    var brackets = groupList.filter((item, index) => {
      return item.type === 'bracket'
    });
    var bracketMatch = !!(brackets && brackets.length === 2)
    if (!hansOtherType && hasOneKeyword && bracketMatch) {
      return true
    }
  }
}

//类型格式化
class TypeFormat extends TypeCharacteristics {
  constructor() {
    super();
  }

  spliceVal(groupList) {
    //获取该片段字符串
    var str = '';
    var arrs = []
    groupList.forEach((item) => {
      str += item.string + " "
      arrs.push(item.string)
    });
    // return {
    //   valueStr: str,
    //   values: arrs
    // }
    return str
  }

  formatOperator(groupList, signIndex) {
    var labelFragment = groupList.slice(0, signIndex);
    var signFragment = [groupList[signIndex]];
    var valFragment = groupList.slice(signIndex + 1) || [];

    var labelStr = this.spliceVal(labelFragment);
    var signStr = this.spliceVal(signFragment);
    var valStr = this.spliceVal(valFragment);
    var completeStr = this.spliceVal(groupList);
    return {
      groupList,
      completeStr,
      valStr,
      signStr,
      labelStr,
      type: "operator"
    }
  }

  formatIn(groupList, signIndex) {
    var lastSignIndex = --signIndex;
    var labelFragment = [];
    var signFragment = [];
    var valFragment = [];
    if (lastSignIndex > 0 && groupList[lastSignIndex]) {
      if (groupList[lastSignIndex].type === 'builtin' && ['not'].includes(groupList[lastSignIndex].string.toLowerCase())) {
        labelFragment = groupList.slice(0, lastSignIndex);
        signFragment = groupList.slice(lastSignIndex, signIndex);
        valFragment = groupList.slice(signIndex + 1) || [];
      }
    } else {
      labelFragment = groupList.slice(0, signIndex);
      signFragment = [groupList[signIndex]];
      valFragment = groupList.slice(signIndex + 1) || [];
    }
    //去掉 value 的括号
    // valFragment=valFragment.filter((item)=>{
    //   return item.type!=='bracket'
    // })

    var labelStr = this.spliceVal(labelFragment);
    var signStr = this.spliceVal(signFragment);
    var valStr = this.spliceVal(valFragment);
    var completeStr = this.spliceVal(groupList);
    return {
      groupList,
      completeStr,
      valStr,
      signStr,
      labelStr,
      type: "in"
    }
  }

  formatEmpty(groupList, signIndex) {
    var lastSignIndex = --signIndex;
    var labelFragment = [];
    var signFragment = [];
    var valFragment = [];
    if (lastSignIndex > 0 && groupList[lastSignIndex]) {
      if (groupList[lastSignIndex].type === 'builtin' && ['not'].includes(groupList[lastSignIndex].string.toLowerCase())) {
        labelFragment = groupList.slice(0, lastSignIndex);
        signFragment = groupList.slice(lastSignIndex, signIndex);
        valFragment = groupList.slice(signIndex + 1) || [];
      }
    } else {
      labelFragment = groupList.slice(0, signIndex);
      signFragment = [groupList[signIndex]];
      valFragment = groupList.slice(signIndex + 1) || [];
    }
    //去掉 value 的括号
    // valFragment=valFragment.filter((item)=>{
    //   return item.type!=='bracket'
    // })

    var labelStr = this.spliceVal(labelFragment);
    var signStr = this.spliceVal(signFragment);
    var valStr = this.spliceVal(valFragment);
    var completeStr = this.spliceVal(groupList);
    return {
      groupList,
      completeStr,
      valStr,
      signStr,
      labelStr,
      type: "empty"
    }
  }

  formatLike(groupList, signIndex) {
    var lastSignIndex = --signIndex;
    var labelFragment = []
    var signFragment = []
    var valFragment = []
    if (lastSignIndex > 0 && groupList[lastSignIndex]) {
      if (groupList[lastSignIndex].type === 'builtin' && ['not'].includes(groupList[lastSignIndex].string.toLowerCase())) {
        labelFragment = groupList.slice(0, lastSignIndex);
        signFragment = groupList.slice(lastSignIndex, signIndex);
        valFragment = groupList.slice(signIndex + 1) || [];
      }
    } else {
      labelFragment = groupList.slice(0, signIndex);
      signFragment = [groupList[signIndex]];
      valFragment = groupList.slice(signIndex + 1) || [];
    }
    var labelStr = this.spliceVal(labelFragment);
    var signStr = this.spliceVal(signFragment);
    var valStr = this.spliceVal(valFragment);
    var completeStr = this.spliceVal(groupList);
    return {
      groupList,
      completeStr,
      valStr,
      signStr,
      labelStr,
      type: "like"
    }
  }

  formatUnrecognizedExp(groupList, signIndex) {
    var completeStr = this.spliceVal(groupList);
    return {
      groupList,
      completeStr,
      type: "unrecognizedExp"
    }
  }
}

//组信息 分析
class Groupanalysis extends TypeFormat {
  constructor(groupList) {
    super()
    this.groupList = groupList
    this.type = null
    this.expressionInfo = {}
    this.main()
  }

  main() {
    var typeObj = this.getType()
    this.type = typeObj.type
    this.expressionInfo = this.formatGroup({
      type: this.type,
      groupList: this.groupList,
      signIndex: typeObj.signIndex
    })
  }

  formatGroup({type, groupList, signIndex}) {
    var expressionInfo = {};
    switch (type) {
      case 'in':
        expressionInfo = this.formatIn(groupList, signIndex);
        break;
      case 'like':
        expressionInfo = this.formatLike(groupList, signIndex);
        break;
      case 'empty':
        expressionInfo = this.formatEmpty(groupList, signIndex);
        break;
      case 'operator':
        expressionInfo = this.formatOperator(groupList, signIndex);
        break;
      default:
        expressionInfo = this.formatUnrecognizedExp(groupList);
    }
    return expressionInfo
  }

  getType() {
    var groupList = this.groupList
    var type = 'unrecognizedExp'; // 默认 不识别的类型
    for (var i = 0; i < groupList.length; i++) {
      if (groupList[i].type === 'operator') {
        //考虑  operator 类型
        if (this.isOpetater(groupList[i], groupList, i)) {
          type = "operator"
          return {
            type,
            signIndex: i
          }
        }
      }
      if (groupList[i].type === 'builtin') {
        //考虑  operator 类型
        if (groupList[i].string.toLowerCase() === 'in') {
          //考虑是  in 类型
          if (this.isIn(groupList[i], groupList, i)) {
            type = "in"
            return {
              type,
              signIndex: i
            }
          }
        }
        if (groupList[i].string.toLowerCase() === 'empty') {
          //考虑是  empty 类型
          if (this.isIn(groupList[i], groupList, i)) {
            type = "empty"
            return {
              type,
              signIndex: i
            }
          }
        }
        if (groupList[i].string.toLowerCase() === 'like') {
          //考虑是  empty 类型
          if (this.isLike(groupList[i], groupList, i)) {
            type = "like"
            return {
              type,
              signIndex: i
            }
          }
        }
      }
    }
    return {
      type,
      signIndex: null
    }
  }
}

var instance = new Groupanalysis(val)
console.log(instance.expressionInfo);
