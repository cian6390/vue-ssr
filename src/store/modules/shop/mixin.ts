import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ShopModuleState } from '@/store/modules/shop';

@Component
export default class ShopModuleMixin extends Vue {
  get ShopNS(): ShopModuleState {
    return this.$store.state.ShopNS;
  }
}
