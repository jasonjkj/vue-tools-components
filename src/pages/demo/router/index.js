import Vue from 'vue'
import VueRouter from 'vue-router'
const path = require('path');
const resolve = dir => path.join(__dirname, dir);
Vue.use(VueRouter)
const basePath='demo'

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

function createRouter(parentPath,files) {
    const routes = files.map((item,index)=>{
        return   {
            path: '/'+basePath+'/' + getFileName(item),
            name: getFileName(item),
            component: ()=>import(getFilePath(parentPath,item))
        }
    })
    return routes
}
function getFileName(filePath) {
    var fileName=path.basename(filePath).split('.')[0]
    return fileName
}
function getFilePath(parentPath,relativePath) {
    return path.resolve(__dirname,parentPath.split(" ")[0], relativePath)
}

var a=createRouter(deepFile.id, deepFile.keys())
var b=createRouter(singleFile.id, singleFile.keys())
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes:[
        ...a,
        ...b
    ]
})

export default router
