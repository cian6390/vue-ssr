import { Vue, Component } from 'vue-property-decorator';

function updatePageMetas(metas: { title: string; description: string }) {
  let { title, description } = metas;

  if (title) {
    document.title = title;
  }

  const descriptionMeta = document.querySelector(
    'meta[name="description"]'
  ) as HTMLElement;
  descriptionMeta.setAttribute('content', description);
}

@Component({
  beforeMount() {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData(this.$store, this.$route).then(res => {
        if (res.metas) updatePageMetas(res.metas);
      });
    }
  },
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData(this.$store, to)
        .then(res => {
          if (res.metas) updatePageMetas(res.metas);
        })
        .then(next)
        .catch(next);
    } else {
      next();
    }
  }
})
export default class DataSetupMixin extends Vue {}
