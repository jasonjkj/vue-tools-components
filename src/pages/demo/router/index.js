const routes = [
    {
        path: '/demo/Test',
        name: 'Test',
        meta: {
            hidden: true
        },
        component: () => import('../views/Test/Test')
    },
    {
        path: '/demo',
        redirect: '/demo/Test',
        name: 'root',
        meta: {

        },
    },
];

export default routes
