import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import '@plugins/vee-validate.js';
import vueDebounce from 'vue-debounce';

/* PrimeVue Import  */
import Ripple from 'primevue/ripple';
import PrimeVue from 'primevue/config';
import MyPreset from '@core/plugins/primevue';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import ConfirmationService from 'primevue/confirmationservice';
import { Chip } from 'primevue';
import '@core/styles/index.scss';
/* End PrimeVue Import  */
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';

/*  Global Components Import */
import formDialog from '@core/components/formDialog.vue';
import form from '@core/components/form.vue';
import formFiled from '@core/components/formFiled.vue';
import filter from '@core/components/filter.vue';
import table from '@core/components/dataTable.vue';
import viewDrawer from '@core/components/viewDrawer.vue';
/* End Global Components Import */

const app = createApp(App);

app.use(createPinia());
app.use(router);

/* PrimeVue Confing  */
app.use(PrimeVue, {
    ripple: true,
    theme: {
        preset: MyPreset,
        options: {
            prefix: 'jinz',
            darkModeSelector: ''
        }
    }
});

app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);
app.use(CkeditorPlugin);

/* End PrimeVue Confing  */

/* Global Components Render */
app.component('jinzFormDialog', formDialog);
app.component('jinzForm', form);
app.component('jinzFiled', formFiled);
app.component('jinzFilter', filter);
app.component('jinzTable', table);
app.component('jinzDrawer', viewDrawer);
/* End Global Components Render */

app.directive('ripple', Ripple);
app.directive('debounce', vueDebounce({ lock: true }));
app.mount('#app');
