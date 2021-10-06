---
title: Button 按钮
tag: General
---

# Button 按钮

> 帅气的Button

## 演示

> 按钮可以根据 `type` 来设置不同的颜色，提供了6种类型的按钮 `primary` `success` `info` `danger` `warning`
:::demo

```html
<template>
  <div>
  <x-button type="default"> default </x-button>
  <x-button class="a" type="default"> default </x-button>
  <x-button style="color:#F00" type="default"> default </x-button>
  </div>
</template>

<style>
  .a{
    color: #ccc
  }
</style>
```

:::
