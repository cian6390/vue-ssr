<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ShopModuleMixin from '@/store/modules/shop/mixin';
import PageSetup from '@/mixins/PageSetup';
import DataSetup from '@/mixins/DataSetup';

const products: {
  [k: string]: {
    title: string;
    handle: string;
    description: string;
  };
} = {
  'product-a': {
    title: 'Product A',
    handle: 'product-a',
    description: 'this is ProductA description ...'
  },
  'product-b': {
    title: 'Product B',
    handle: 'product-b',
    description: 'this is ProductB description ...'
  }
};

const mixins = Mixins(PageSetup, DataSetup, ShopModuleMixin);

@Component({
  async asyncData(store, route) {
    const product = products[route.params.handle];
    const metas = { ...product };
    await store.dispatch('ShopNS/addProduct', product);
    return { metas, data: product };
  }
})
export default class Product extends mixins {
  get product() {
    return this.ShopNS.products[this.$route.params.handle];
  }

  getProduct(handle: string) {
    this.$router.push({ name: 'product', params: { handle } });
  }
}
</script>

<template>
  <div>
    <button @click="getProduct('product-a')">Product A</button>
    <button @click="getProduct('product-b')">Product B</button>
    <pre>{{ product }}</pre>
  </div>
</template>
