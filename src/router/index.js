import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '~/views/Index'
import MainView from "~/views/MainView";
import ShowInfo from "~/views/ShowInfo";
import PageFour from "~/views/PageFour";
import PageFive from "~/views/PageFive"
import AddObject from "~/views/AddObject";
import test from "~/views/Echarts";
import ContourRele from "~/views/ContourRele";
import Echarts from "~/views/Echarts";
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
                name: '区划信息交互式查询及可视化',
                component: ContourRele,
            },
            {
                path: '/p4',
                name: '史上今日',
                component: PageFour,
            },
            {
                path: '/p5',
                name: '轨迹可视化',
                component: PageFive,
            },
            {
                path: '/test',
                name: 'test',
                component: Echarts,
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

