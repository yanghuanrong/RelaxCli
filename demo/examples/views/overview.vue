<template>
  <div class="relax-docs">
    <h1>概览</h1>
    <p>以下是所有UI组件及工具。</p>
    <hr />
    <div class="component-list" v-for="(items, i) in component" :key="i">
      <h2>{{ items.tag }}</h2>
      <div class="component-list__item">
        <router-link
          tag="dl"
          :to="item.routePath"
          v-for="(item, k) in items.child"
          :key="k"
        >
          <dt>{{ item.title }}</dt>
          <dd><{{ item.tagName }} /></dd>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import navData from '../data/components.json';
export default {
  data() {
    return {
      component: navData.data,
    };
  },
};
</script>
