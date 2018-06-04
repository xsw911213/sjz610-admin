import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'

const Main = resolve => require(['../src/views/Main'], resolve);
const personInfo = resolve => require(['../src/views/personInfo'], resolve);
const singInInfo = resolve => require(['../src/views/singInInfo'], resolve);
const liveRoom = resolve => require(['../src/views/liveRoom'], resolve);
const questionNaire = resolve => require(['../src/views/questionNaire'], resolve);
const pageConfig = resolve => require(['../src/views/pageconfig'], resolve);




let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,//只有一个节点
        //iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/pageConfig', component: pageConfig, name: '页面模块管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '参会人员信息',
        //iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/personInfo', component: personInfo, name: '人员信息' },
            { path: '/singInInfo', component: singInInfo, name: '签到情况' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        //iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/liveRoom', component: liveRoom, name: '直播间' }
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '景区导览',
    //     //iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/articleList', component: personInfo, name: '文章列表' },
    //         { path: '/addArticle', component: singInInfo, name: '添加文章' },
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '',
        //iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/questionNaire', component: questionNaire, name: '留言板' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;