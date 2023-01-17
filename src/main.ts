import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/styles/main.scss'

const app = createApp(App)

/*Vee-validate*/
import { configure, defineRule } from 'vee-validate';
import { localize } from '@vee-validate/i18n';
import fr from '@vee-validate/i18n/dist/locale/fr.json';
import { required, between, confirmed, email, min, min_value, url, numeric } from '@vee-validate/rules';

// define global rules
defineRule('required', required);
defineRule('between', between);
defineRule('email', email);
defineRule('confirmed', confirmed);
defineRule('min', min);
defineRule('url', url);
defineRule('min_value', min_value);
defineRule('numeric', numeric);

localize({ fr });

// Activate the locale
configure({
    generateMessage: localize('fr', {
        names: {},
    }),
});

app.use(createPinia())
app.use(router)

app.mount('#app')
