<template>
  <div>
      <input type="text">
      <input type="email">
      <input type="password">
      <input type="checkbox" v-model="isAccepted">
      <button type="submit" 
      :class='{"is-disabled": !isAccepted}' 
      @click="submitForm">
      Register
      </button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isAccepted: false
        }
    },
    methods: {
        submitForm(){
            //Very complicated function whith a lot of logic
            //...
        }
    },
    
}
</script>

<style>

</style>