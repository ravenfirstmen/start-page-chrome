import { createApp } from 'vue'
import './style/main.scss'
import App from './App.vue'
import { BootstrapTooltip, Focus } from './directives';

const app = createApp(App);
app.directive('focus', Focus)
app.directive('tooltip', BootstrapTooltip)
app.mount('#app');