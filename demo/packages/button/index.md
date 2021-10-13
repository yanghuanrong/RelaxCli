---
title: Button 按钮
tag: General
---

# Button 按钮

> 帅气的Button

## 演示

> 按钮可以根据 `type` 来设置不同的颜色，提供了5种类型的按钮 `primary` `success` `info` `danger` `warning`
:::demo

```html
<template>
  <div>
    <x-button type="primary"> default </x-button>
    <x-button type="success"> default </x-button>
    <x-button type="info"> default </x-button>
    <x-button type="danger"> default </x-button>
    <x-button type="warning"> default </x-button>
  </div>
</template>
```

:::

## Button API

| 参数    |  说明  | 类型   | 可选值 | 默认值   |
| ------  | ------ | ---- | ------ | ----    |
| type  |  类型 |  string  |  success / primay / info / danger / warning  |  primary
