<script lang="ts">
import { RawLocation } from 'vue-router';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  homePage: RawLocation = {
    name: 'home'
  };
  productPage: RawLocation = {
    name: 'product',
    params: { handle: 'product-a' }
  };
}
</script>

<template>
  <div id="app">
    <nav class="site-nav">
      <router-link :to="homePage" v-text="'Home'" />
      <router-link :to="productPage" v-text="'Product'" />
    </nav>
    <transition name="fade" mode="out-in">
      <router-view class="site-main" />
    </transition>
  </div>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#app {
  flex: 1 1 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #f5f5f5;
}

.site-nav {
  margin-bottom: 25px;
  a {
    color: #333;
    padding: 4px 7px;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      color: green;
      text-decoration: underline;
    }
  }
}

.site-main {
  position: relative;
}
</style>
