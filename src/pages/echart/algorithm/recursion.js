//该方法 用于判断数据是否存在
import { dataList } from './reference'

function isExit(val) {
  if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '' || val === false) {
    //无意义值
    return false
  }
  if (Array.isArray((val)) && val.length <= 0) {
    //空数组
    return false
  }
  if (typeof val === "object" && Object.prototype.toString.call(val) === "[object Object]") {
    //空对象
    if (Object.keys(val).length <= 0) {
      return false
    }
  }
  return true
}

//该方法 是递归的核心方法
function recursion(sourceData,callback) {
  function resetKey(list) {
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      var nextList=callback && callback(item)
      if(isExit(nextList)){
        resetKey(nextList)
      }
    }
  }
  resetKey(sourceData);
  return sourceData
}

//不想修改源数据 记得在使用该方法的时候,先做深拷贝
var data = recursion(dataList, (item) => {
  //悬浮的时候  toolTip 需要展示 id  name  type
  item.name=item.objectName || item.policyName || '-';      //当前节点名称
  item.id=item.objectId || item.policyId || '-' ;            //id
  item.value=item.objectType || item.policyType || '-';      //节点的值，把类型当作值
  item. label={}
  //节点的下级节点
  var parentObjectList=item.parentObjectList || []
  var policyList=item.policyList || []
  item.children=[
    ...parentObjectList,
    ...policyList
  ];
  item.itemStyle={}

  //把无用的数据删掉
  delete item.subObjectList
  delete item.parentObjectList
  delete item.policyList

  if (isExit(item.children)) {
    return item.children
  }
  return false
});
console.log(data);

export default data[0]
