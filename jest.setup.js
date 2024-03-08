const Vue = require("vue");
const Vuetify = require("vuetify");
const { config } = require("@vue/test-utils");

Vue.use(Vuetify);

Vue.prototype.$vuetify = {
  breakpoint: {},
};

config.mocks.$vuetify = Vue.prototype.$vuetify;
