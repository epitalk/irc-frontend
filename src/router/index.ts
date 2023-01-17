import { createRouter, createWebHistory } from 'vue-router'
import ChatPage from "@/pages/ChatPage.vue"
import DesignSystemPage from "@/pages/DesignSystemPage.vue"
import WelcomePage from "@/pages/WelcomePage.vue"
import NotFound from "@/pages/NotFound.vue"
import { useUserStore } from "@/stores/user.store";
import { useChannelStore } from "@/stores/channel.store";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: ChatPage,
            meta: {
                layout: "MainLayout"
            }
        },
        {
            path: '/channel/:channel',
            name: 'channel',
            component: ChatPage,
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

    /*Middleware current channel*/
    const channelStore = useChannelStore()
    if (to.path === '/'){
        channelStore.setCurrentChannel('general')
    }

    if (to.path.includes('channel')){
        const regex = /(?<=channel\/).*$/g;
        const matchs = to.path.match(regex);
        if (matchs){
            channelStore.setCurrentChannel(matchs[0])
        }
    }
});

export default router
