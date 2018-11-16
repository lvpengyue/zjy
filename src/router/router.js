import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () =>
        import ('@/views/login.vue')
};

// export const registerRouter = {
//     path: '/register',
//     name: 'register',
//     meta: {
//         title: 'register - 注册'
//     },
//     component: () =>
//         import ('@/views/register/index.vue')
// };

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () =>
        import ('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () =>
        import ('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () =>
        import ('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () =>
        import ('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () =>
        import ('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [{
            path: 'home',
            title: {
                i18n: 'home'
            },
            name: 'home_index',
            component: () =>
                import ('@/views/home/home.vue')
        },
        {
            path: 'ownspace',
            title: '个人中心',
            // access: '0',
            name: 'ownspace_index',
            component: () =>
                import ('@/views/own-space/own-space.vue')
        },
        {
            path: 'newsinfo',
            title: '新增/编辑新闻',
            // access: '0',
            name: 'newsinfo',
            component: () =>
                import ('@/views/newsinfo/index.vue')
        },
        // { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        // { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        // { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
        path: '/permission',
        icon: 'ios-cog',
        name: 'permission',
        title: '权限管理',
        access: 0,
        component: Main,
        children: [{
                path: 'index',
                title: '人员列表',
                access: 0,
                name: 'permission_index',
                component: () =>
                    import ('@/views/permission-index/index.vue')
            },
            {
                path: 'role',
                title: '角色列表',
                access: 0,
                name: 'permission_role',
                component: () =>
                    import ('@/views/permission-role/index.vue')
            },
            {
                path: 'resource',
                title: '资源列表',
                access: 0,
                name: 'permission_resource',
                component: () =>
                    import ('@/views/permission-resource/index.vue')
            }
        ]
    },
    {
        path: '/hr',
        icon: 'ios-cog',
        name: 'hr',
        title: '人力资源管理',
        access: 0,
        component: Main,
        children: [{
                path: 'user',
                title: '员工信息目录',
                access: 0,
                name: 'hr_user',
                component: () =>
                    import ('@/views/hr-user/index.vue')
            },
            {
                path: 'time',
                title: '员工考勤管理',
                access: 0,
                name: 'hr_time',
                component: () =>
                    import ('@/views/hr-time/index.vue')
            },
            {
                path: 'salary',
                title: '员工薪资管理',
                access: 0,
                name: 'hr_salary',
                component: () =>
                    import ('@/views/hr-salary/index.vue')
            }
        ]
    },
    {
        path: '/news',
        icon: 'ios-cog',
        name: 'news',
        title: '官网新闻管理',
        access: 0,
        component: Main,
        children: [{
            path: 'index',
            title: '官网新闻列表',
            access: 0,
            name: 'news_index',
            component: () =>
                import ('@/views/news/index.vue')
        }]
    },
    {
        path: '/canteen',
        icon: 'ios-cog',
        name: 'canteen',
        title: '公司食堂管理',
        access: 0,
        component: Main,
        children: [{
            path: 'index',
            title: '公司食堂管理',
            access: 0,
            name: 'canteen_index',
            component: () =>
                import ('@/views/canteen/index.vue')
        }]
    },
    {
        path: '/contract',
        icon: 'ios-cog',
        name: 'contract',
        title: '计划合同管理',
        access: 0,
        component: Main,
        children: [{
                path: 'material',
                title: '物资信息管理',
                access: 0,
                name: 'contract_material',
                component: () =>
                    import ('@/views/contract-material/index.vue')
            },
            {
                path: 'in',
                title: '物资入库管理',
                access: 0,
                name: 'contract_in',
                component: () =>
                    import ('@/views/contract-in/index.vue')
            },
            {
                path: 'out',
                title: '物资出库管理',
                access: 0,
                name: 'contract_out',
                component: () =>
                    import ('@/views/contract-out/index.vue')
            },
            {
                path: 'tender',
                title: '招标合同管理',
                access: 0,
                name: 'contract_tender',
                component: () =>
                    import ('@/views/contract-tender/index.vue')
            }
        ]
    },
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];