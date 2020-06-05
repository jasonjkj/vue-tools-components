const routes = [
    {
        path: '/index/Test',
        name: 'Yest',
        meta: {
            hidden: true
        },
        component: () => import('../views/Test/Test')
    },
];

export default routes
