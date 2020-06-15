import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '~/views/Index'
import MainView from "~/views/MainView";
import ShowInfo from "~/views/ShowInfo";
import PageThree from "~/views/PageThree";
import PageFour from "~/views/PageFour";
import AddObject from "~/views/AddObject";
import test from "~/views/test";
//引入-》使用
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: '导航1',
        component: Index,
        children: [
            {
                path: '/p1',
                name: '检索信息对象',
                component: MainView,

            },
            {
                path: '/p2',
                name: '展示检索结果',
                component: ShowInfo,
            },
            {
                path: 'addobject',
                name: '添加对象',
                component: AddObject
            }
        ]
    },
    {
        path: '/navigation',
        name: '导航2',
        component: Index,
        children: [
            {
                path: '/p3',
                name: '页面3',
                component: PageThree,
            },
            {
                path: '/p4',
                name: '页面4',
                component: PageFour,
            },
            {
                path: '/test',
                name: 'test',
                component: test,
            }
        ]
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


export default router

