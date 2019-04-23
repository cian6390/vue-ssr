import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from './messages';

Vue.use(VueI18n);

export function createI18n(lang: string) {
  const locale = lang; // default locale
  return new VueI18n({
    locale,
    messages
  });
}
