// 获取高亮 字段list
/*
* @desc:深度为0 的运算符标识
* */
var operators = [
  "AND",
  "OR",
  "(",
  ")",
];
/*
* @desc:在表达式内 可以出现的 运算符
* 表达式  必须要加 "  "双引号包裹
* 在这里面是可以写括号的 , a in "(1,2,3)"
* */
var specialCharacters = [
  "=",
  "!=",
  "<",
  ">",
  ">=",
  "<=",
  "IN",
  "NOT IN",
  "LIKE",
  "NOT LIKE",
  "EMPTY",
  "NOT EMPTY",
];

//可以查找的搜索列
var columns = [
  "common_recv_time",
  "common_log_id",
  "common_subscriber_id",
  "common_client_ip",
  "bgp_type",
  "bgp_as_num",
  "common_server_ip",
  "common_server_port"
]

//创建  搜索mode  模式
export function cerateMode(CodeMirror,modeName='searchMode'){
  CodeMirror.defineMode(modeName, (config) => {
    return {
      /**
       这个token  方法就是用来标亮关键字的，
       CodeMirror会自上而下，从左往右得遍历每一个字符，依次调用token方法。
       返回样式字符串 class 类
       **/
      token: (stream, state) => {
        //匹配空白  就不需要往后面执行
        if (stream.eatSpace()) {
          return null
        }
        //需要匹配的内容
        stream.eatWhile(/[\$\w\u4e00-\u9fa5]/)
        const cur = stream.current();
        const exist = myHighlightList.some((item) => {
          return item === cur
        });

        //keyword  atom number  string   查看codemirror.css文件
        if (exist) {
          return 'string'    //注意  这里返回的是一个css的样式类.....
          // return 'hword'    //注意  这里返回的是一个css的样式类.....
        }

        stream.next()
      }
    }
  });
}
