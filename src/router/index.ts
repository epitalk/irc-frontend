import { createRouter, createWebHistory } from 'vue-router'
import type { Router } from 'vue-router'
import ChatPage from "@/pages/ChatPage.vue"
import DesignSystemPage from "@/pages/DesignSystemPage.vue"
import WelcomePage from "@/pages/WelcomePage.vue"
import NotFound from "@/pages/NotFound.vue"
import { useUserStore } from "@/stores/user.store";
import { useChannelStore } from "@/stores/channel.store";
import { SITE_NAME } from "@/utils/env";
import { useAppStore } from "@/stores/app.store";
import BlankLayout from "@/layouts/BlankLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";

const router: Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: MainLayout,
            children: [
                {
                    path: '',
                    name: 'home',
                    components: {
                        default: ChatPage
                    }
                },
                {
                    path: 'channel/:channel',
                    name: 'channel',
                    components: {
                        default: ChatPage
                    }
                },
                {
                    path: 'channel/@me/:channel',
                    name: 'privateMessage',
                    components: {
                        default: ChatPage
                    }
                },
                {
                    path: 'design-system',
                    name: 'designSystem',
                    components: {
                        default: DesignSystemPage
                    }
                },
            ]
        },
        {
            path: '/',
            component: BlankLayout,
            children: [
                {
                    path: 'welcome',
                    name: 'welcome',
                    components: {
                        default: WelcomePage
                    }
                },
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: NotFound
        }
    ]
})

/*Router middlewares*/
router.beforeEach(async (to) => {
    /*Middleware check if username isset*/
    const routesWithUsernameNotRequired = ['/welcome']
    const userStore = useUserStore();
    const appStore = useAppStore();

    if (!userStore.user?.username && !routesWithUsernameNotRequired.includes(to.path)) {
        await router.push('/welcome')
    }

    /*Middleware current channel*/
    const channelStore = useChannelStore()
    if (to.path === '/'){
        channelStore.setCurrentChannel('general')
        /*META*/
        document.title = SITE_NAME + " | " + channelStore.currentChannel
    }

    if (to.path.includes('channel')){
        const regex = to.path.includes('@me') ? /(?<=channel\/@me\/).*$/g : /(?<=channel\/).*$/g;
        const matchs = to.path.match(regex);

        if (matchs){
            channelStore.setCurrentChannel(matchs[0])
            /*META*/
            document.title = SITE_NAME + " | " + channelStore.currentChannel
        }
    }

    /*Middleware @me channels*/
    appStore.isInPrivateMessage = to.path.includes('@me')
});

export default router
