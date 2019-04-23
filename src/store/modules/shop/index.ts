import { MutationTree, ActionTree } from 'vuex';

export interface ShopProduct {
  title: string;
  handle: string;
  desciption: string;
}

export interface ShopModuleState {
  products: {
    [key: string]: ShopProduct;
  };
}

type ShopMutationTree = MutationTree<ShopModuleState>;
type ShopActionTree = ActionTree<{}, ShopModuleState>;

export const state: ShopModuleState = {
  products: {}
};

export const mutations: ShopMutationTree = {
  ADD_PRODUCT(state, product: ShopProduct) {
    state.products[product.handle] = product;
  }
};

export const actions: ShopActionTree = {
  addProduct({ commit }, product: ShopProduct) {
    commit('ADD_PRODUCT', product);
  }
};

export interface ShopModule {
  namespaced: boolean;
  state: ShopModuleState;
  mutations: ShopMutationTree;
  actions: ShopActionTree;
}

const shopModule: ShopModule = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default shopModule;
