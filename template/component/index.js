import <%= name %> from './index.vue';

<%= name %>.install = function(Vue) {
  Vue.component(<%= name %>.name, <%= name %>);
};

export default <%= name %>;
