import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import shopModule from '@/store/modules/shop';

Vue.use(Vuex);

// eslint-disable-next-line
export interface RootState {}

export type IStore = Store<RootState>;

export function createStore() {
  const store: IStore = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
      ShopNS: shopModule
    }
  });
  return store;
}
