import Vue from 'vue';
import VueRouter from 'vue-router';
import componentView from './views/components.vue';
import indexView from './views/index.vue';

const ctx = require.context('../packages', true, /\index.md$/);

const components = ctx.keys().map((path) => {
  const [name] = path.match(/(?<=.\/)\w+/);
  const [file] = path.match(/(?<=.\/).*/);
  return {
    path: `/components/${name}`,
    name,
    component: () => import(`../packages/${file}`),
  };
});

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: indexView,
  },
  {
    path: '/components',
    name: 'components',
    component: componentView,
    children: [
      {
        path: `/components/overview`,
        name: 'overview',
        component: () => import(`./views/overview.vue`),
      },
      ...components,
    ],
    redirect: '/components/overview',
  },
  {
    path: '*',
    redirect: '/components/overview',
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
