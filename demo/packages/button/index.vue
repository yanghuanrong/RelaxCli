<template>
  <button class="x-btn" :class="['x-btn-' + type]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: (value) =>
        ['success', 'primary', 'warning', 'info', 'danger', 'text'].includes(
          value
        ),
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['lg', 'sm', 'md'].includes(value),
    },
    icon: String,
    plain: Boolean,
    round: Boolean,
    circle: Boolean,
    block: Boolean,
    disabled: Boolean,
    loading: Boolean,
  },
};
</script>
