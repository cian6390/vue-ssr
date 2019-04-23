<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import PageSetup from '@/mixins/PageSetup';

@Component({
  context: {
    title: 'home.title',
    description: 'home.description'
  }
})
export default class Home extends Mixins(PageSetup) {}
</script>

<template>
  <div class="home-page">
    Home page
  </div>
</template>

<style lang="scss">
.home-page {
  color: $primary;
}
</style>
