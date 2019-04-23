import { createApp } from './entry-common';

export default (context: { url: string; [k: string]: string }) => {
  return new Promise((resolve, reject) => {
    const { url, lang } = context;
    const { app, router, store } = createApp({ lang, ssr: true });
    const { fullPath } = router.resolve(url).route;

    if (fullPath !== url) {
      return reject({ url: fullPath });
    }

    // set router's location
    router.push(url);

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const route = router.currentRoute;
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      const prefetchs = matchedComponents.map(Component => {
        // @ts-ignore
        if (Component.options.asyncData) {
          // @ts-ignore
          return Component.options.asyncData(store, route).then(res => {
            if (res.metas) {
              context.title = res.metas.title;
              context.description = res.metas.description;
            }
            return res;
          });
        } else {
          Promise.resolve(true);
        }
      });
      Promise.all(prefetchs)
        .then(() => {
          // @ts-ignore
          context.state = store.state;
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
