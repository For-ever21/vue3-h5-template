import type { App } from "vue";
import { createStore } from "vuex";

export const store = createStore({
  modules: {},
});

export function setupStore(app: App<Element>) {
  app.use(store);
}
