<template>
  <div id="app">
    <navbar :brand="'My Store'"/>

    <transition name='fade'>
      <router-view/>
    </transition>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
}
</script>


<style lang="scss">
html{
  background: #e0e0e0 !important;
}
.fade-enter-active, .fade-leave-active {
  transition: .3s;
}
 
.fade-enter-active {
  transition-delay: .3s;
}
 
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
