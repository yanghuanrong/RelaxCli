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
  </div>
</template>

<script>
import navData from '../data/components.json';
export default {
  data() {
    return {
      nav: navData.data,
    };
  },
};
</script>
