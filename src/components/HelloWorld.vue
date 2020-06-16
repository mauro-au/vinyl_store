<template>
  <div>
    <div data-testId='hello-component'>{{ msg }}</div>
    <span>Siguenos en Tiktock</span>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: "Light, Camara, laser!!!"
    }
  }
};
</script>

<style>
</style>