import { IStore } from '@/store';
import { Route } from 'vue-router';
import Vue, { ComponentOptions } from 'vue';

declare module '*.json';
declare module '*.gql';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    context?: {
      title: string;
      description: string;
    };
    asyncData?: (
      store: IStore,
      route: Route
    ) => Promise<{
      metas?: {
        title: string;
        description: string;
      };
      data: any;
    }>;
  }
}
