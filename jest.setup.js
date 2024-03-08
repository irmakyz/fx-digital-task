const Vue = require("vue");
const Vuetify = require("vuetify");
const { config } = require("@vue/test-utils");

Vue.use(Vuetify);

// Mock the $vuetify object to prevent warnings
Vue.prototype.$vuetify = {
  breakpoint: {},
};

// Set the config.mocks to Vue.prototype
config.mocks.$vuetify = Vue.prototype.$vuetify;
