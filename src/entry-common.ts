import Vue from 'vue';
import App from './App.vue';
import { createStore } from '@/store';
import { createRouter } from '@/router';
import { createI18n } from '@/i18n';
import { createApolloProvider } from '@/apollo';
import { sync } from 'vuex-router-sync';

export function createApp(options: { ssr: boolean; lang: string }) {
  const { ssr, lang } = options;
  const router = createRouter();
  const store = createStore();
  const i18n = createI18n(lang);
  const apolloProvider = createApolloProvider(ssr);

  sync(store, router);

  const app = new Vue({
    i18n,
    store,
    router,
    apolloProvider,
    render: h => h(App)
  });

  return { app, router, store };
}
