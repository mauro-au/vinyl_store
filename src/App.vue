<template>
  <div id="app">
    <navbar :brand="'Vinyl Store'"/>
    <div class="modal" :class="{'is-active': overlay}">
      <div class="modal-background"></div>
        <div class="modal-content loading">
          <img src="/img/spinner.svg" alt="">
        </div>
    </div>
    <transition name='fade'>
      <router-view/>
    </transition>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import {mapState} from 'vuex'

export default {
  components: {
    Navbar,
  },
    computed:{
        ...mapState([ 'overlay' ])
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
.loading{
  display: flex;
  justify-content: center;
}
</style>
