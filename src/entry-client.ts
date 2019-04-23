import { IStore } from '@/store';
import { createApp } from './entry-common';

declare global {
  interface Window {
    __INITIAL_STATE__: IStore;
  }
}

const lang = navigator.language;
const { app, router, store } = createApp({ lang, ssr: false });

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => app.$mount('#app'));
