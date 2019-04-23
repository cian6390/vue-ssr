import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import shopify from '@/config/shopify';
import fetch from 'node-fetch';

/**
 * defined variables.
 */
const END_POINT = shopify.storefront.endpoint;
const ACCESS_TOKEN = shopify.storefront.accessToken;

Vue.use(VueApollo);

function createApolloClient(ssr: boolean) {
  const httpLinkOptions: HttpLink.Options = {
    uri: END_POINT,
    headers: {
      'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN
    }
  };
  // @ts-ignore
  if (ssr) httpLinkOptions.fetch = fetch;
  const link = new HttpLink(httpLinkOptions);

  const cache = new InMemoryCache();

  if (!ssr) {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      const state = window.__APOLLO_STATE__;
      if (state) {
        cache.restore(state.defaultClient);
      }
    }
  }

  const ssrOptions = ssr ? { ssrMode: true } : { ssrForceFetchDelay: 100 };
  return new ApolloClient({ cache, link, ...ssrOptions });
}

export function createApolloProvider(ssr: boolean) {
  return new VueApollo({
    defaultClient: createApolloClient(ssr)
  });
}
