<template>
  <div class="demo-block">
    <div class="description" v-if="$slots.default">
      <slot></slot>
    </div>
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="meta" ref="meta">
      <slot name="highlight"></slot>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'DemoBlock',
};
</script>
