<template>
  <div class="main-wrapper">
    <div class="main-wrapper__menu">
      <router-link to="overview" replace>组件概览</router-link>
      <dl v-for="(items, i) in nav" :key="i">
        <dt>{{ items.tag }}</dt>
        <dd v-for="(item, k) in items.child" :key="k">
          <router-link :to="item.routePath" replace>{{
            item.title
          }}</router-link>
        </dd>
      </dl>
    </div>
    <router-view class="main-wrapper__content"></router-view>

    <div class="main-wrapper__nav" v-if="menu">
      <div
        class="item"
        v-for="(item, i) in menu"
        :key="i"
        :class="{ active: menuActive === i }"
        @click="scrollView(i)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import navData from '../data/components.json';
export default {
  data() {
    return {
      nav: navData.data,
      menu: [],
      menuActive: 0,
      offsetY: 80, // 修改文档样式间距。可以修改此参数调整锚点偏移
    };
  },
  watch: {
    $route: {
      handler: 'setMenu',
      immediate: true,
    },
  },
  mounted() {
    const el = document.querySelector('.main-wrapper');
    el.addEventListener('scroll', this.scroll);
  },
  destroyed() {
    const el = document.querySelector('.main-wrapper');
    el.removeEventListener('scroll', this.scroll);
  },
  methods: {
    scrollView(i) {
      if (this.menu.length) {
        const h2 = document.querySelectorAll('.relax-docs>h2');
        const el = document.querySelector('.main-wrapper');
        el.scrollTop = h2 && h2[i].offsetTop - this.offsetY;
      }
    },
    setMenu() {
      this.$nextTick(() => {
        this.menu = [];
        const h2 = document.querySelectorAll('.relax-docs>h2');
        if (h2.length) {
          Array.from(h2).forEach((item) => {
            this.menu.push({
              name: item.innerText,
              id: item.id,
            });
          });
        }
      });
    },
    scroll(e) {
      if (!this.menu.length) {
        return;
      }
      const el = document.querySelector('.main-wrapper');
      const h2 = document.querySelectorAll('.relax-docs>h2');

      const nowTop = el.scrollTop;
      const location = [];

      for (let i = 0; i < this.menu.length; i++) {
        const top = h2 && h2[i].offsetTop - this.offsetY;
        location.push(Math.abs(nowTop - top));
      }
      let k = 0;
      let iNow = location[0];

      for (let i = 1; i < location.length; i++) {
        if (location[i] < iNow) {
          iNow = location[i];
          k = i;
        }
      }
      this.menuActive = k;
    },
  },
};
</script>
