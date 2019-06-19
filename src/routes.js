import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'

const Main = resolve => require(['../src/views/Main'], resolve);
const meetingNotice = resolve => require(['../src/views/MeetingNotice'], resolve);
const news = resolve => require(['../src/views/News'], resolve);

const meetingIntroduce = resolve => require(['../src/views/MeetingIntroduce'], resolve);
const viewService = resolve => require(['../src/views/ViewService'], resolve);


const liveRoom = resolve => require(['../src/views/liveRoom'], resolve);
const questionNaire = resolve => require(['../src/views/questionNaire'], resolve);
const pageConfig = resolve => require(['../src/views/pageconfig'], resolve);

const editor = resolve => require(['../src/views/Editor'], resolve);


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
            { path: '/pageConfig', component: pageConfig, name: '首页状态' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,//只有一个节点
        hidden: true,
        //iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/editor/:from/:id', component: editor, name: '编辑' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,//只有一个节点
        //iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/meetingIntroduce', component: meetingIntroduce, name: '会议介绍' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,//只有一个节点
        //iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/viewService', component: viewService, name: '观摩服务' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,//只有一个节点
        //iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/meetingNotice', component: meetingNotice, name: '会议通知' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,//只有一个节点
        //iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/news', component: news, name: '新闻报道' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        hidden: true,
        //iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/liveRoom', component: liveRoom, name: '直播间' }
        ]
    },
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