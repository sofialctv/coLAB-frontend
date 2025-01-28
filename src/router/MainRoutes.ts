const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: false
    },
    redirect: '/main',
    component: () => import('../layouts/FullLayout.vue'),
    children: [
        {
            path: '/',
            redirect: "/resolucao/IndexResolucao",
        },
        {
            path: '',
            redirect: "/resolucao/IndexResolucao",
        },
    ]
};

export default MainRoutes;