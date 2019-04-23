import { Vue, Component } from 'vue-property-decorator';

const isServer = process.env.VUE_ENV === 'server';

/**
 * if follow the vue-hackernews way. (check flag and export one mixin)
 * it will break Mixins, so I change to this way.
 */
@Component
export default class PageContextMixin extends Vue {
  created() {
    if (isServer) {
      const context = this.$options.context;
      if (context) {
        const { title, description } = context;
        if (title) this.$ssrContext.title = this.$t(title);
        if (title) this.$ssrContext.description = this.$t(description);
      }
    }
  }
}
