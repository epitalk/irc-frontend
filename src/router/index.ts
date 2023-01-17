import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/pages/HomePage.vue"
import DesignSystemPage from "@/pages/DesignSystemPage.vue"
import WelcomePage from "@/pages/WelcomePage.vue"
import NotFound from "@/pages/NotFound.vue"
import { useUserStore } from "@/stores/user.store";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
            meta: {
                layout: "MainLayout"
            }
        },
        {
            path: '/design-system',
            name: 'designSystem',
            component: DesignSystemPage,
            meta: {
                layout: "MainLayout"
            }
        },
        {
            path: '/welcome',
            name: 'welcome',
            component: WelcomePage,
            meta: {
                layout: "BlankLayout"
            }
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: NotFound,
            meta: {
                layout: "BlankLayout"
            }
        }
    ]
})

/*Router middlewares*/
router.beforeEach(async (to) => {
    /*Middleware check if username isset*/
    const routesWithUsernameNotRequired = ['/welcome']
    const userStore = useUserStore();

    if (!userStore.user?.username && !routesWithUsernameNotRequired.includes(to.path)) {
        await router.push('/welcome')
    }
});

export default router
