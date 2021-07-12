const path = require('path');
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

//查询index.vue 文件
const deepFile = require.context(
    '../views',
    true,
    /index+\.(vue|js)$/
);
const singleFile = require.context(
    '../views',
    false,
    /\w+\.(vue|js)$/
);

function createRouter(views) {
    var routes = []
    views.keys().forEach(view => {
        const componentConfig = views(view);
        const componentName = getFileName(view,componentConfig)
        routes.push({
            path: '/' + getFileName(componentName,componentConfig),
            name: getFileName(componentName,componentConfig),
            component: componentConfig.default || componentConfig
        })
    });
    return routes
}
// 获取文件名 先去取组件的name
// 无name  取文件名
// 文件名为index.vue  取上一层文件夹名称
function getFileName(view, componentConfig) {
    var routerName = ''
    var baseName=path.basename(view).split('.')[0]
    var dirList=path.dirname(view).split('/')
    var componentName=componentConfig.default.name
    if (componentName) {
        routerName = componentName
    }else {
        if(baseName === 'index'){   //多文件嵌套 页面
            routerName = dirList[dirList.length - 1]
        }else {
            routerName = baseName
        }
    }
    return upperFirst(
        camelCase(
            routerName.replace(/(.*\/)*([^.]+).*/ig, "$2"))
    );
}

function getFilePath(parentPath, relativePath) {
    return path.resolve(__dirname, parentPath.split(" ")[0], relativePath)
}

var nestRouter = createRouter(deepFile)
var singleRouter = createRouter(singleFile)

var routes = [
    ...nestRouter,
    ...singleRouter
]

export default routes
