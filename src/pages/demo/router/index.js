import Vue from 'vue'
import VueRouter from 'vue-router'

const path = require('path');
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

Vue.use(VueRouter)

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

function getFileName(view, componentConfig) {
    var routerName = ''
    var baseName=path.basename(view).split('.')[0]
    var dirList=path.dirname(view).split('/')
    var componentName=componentConfig.default.name
    if (componentName) {
        routerName = componentName
    }else {
        if(dirList.length > 1){   //多文件嵌套 页面
            routerName = dirList[dirList.length]
        }else {
            routerName = dirList[dirList.length]
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

var a = createRouter(deepFile)
var b = createRouter(singleFile)



const router = new VueRouter({
    mode: 'history',
    base: 'demo',
    routes: [
        ...a,
        ...b
    ]
})

export default router
