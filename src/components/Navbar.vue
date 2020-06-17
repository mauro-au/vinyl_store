<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="container">
    <!-- Brand -->
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <img src="/img/logo.svg" alt="">
      </router-link>
      <a role="button"
      class="navbar-burger burger" aria-label="menu" aria-expanded="false"
      data-target="navbarMenu"
      :class="{ 'is-active': displayMenu }"
      @click="displayMenu = !displayMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <!--  -->
    <div id="navbarMenu" class="navbar-menu" :class="{ 'is-active': displayMenu }">
        <div class="navbar-start">
          <!--
          <a class="navbar-item">
            Home
          </a>
          -->
        </div>

        <div class="navbar-end">
          <a data-testId="cart" class="navbar-item" @click="showCart">
            <span class="icon">
              <img src="/img/supermarket.svg" alt="" class="">
              <span
              class="tag is-warning"
              v-if="$store.getters.shoppingCart.list.length > 0">
                {{ $store.getters.shoppingCart.list.length }}
              </span>
            </span>
          </a>
          <router-link v-if="!isLoggedIn" to="/login" class="navbar-item">
            Login
          </router-link>
          <div v-else class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <img src="/img/user.svg" alt="">
            </a>

            <div class="navbar-dropdown">
              <p class="navbar-item">
                {{ getCurrentUser ? getCurrentUser.email : '' }}
              </p>
              <hr class="navbar-divider">
              <a class="navbar-item" @click="showCart">
                Ver Carrito
              </a>

              <router-link to="/create" class="navbar-item">
                <span @click="displayMenu = !displayMenu">Crear Producto</span>
              </router-link>
              <a class="navbar-item" @click="logout">
                Cerrar Sesión
              </a>
            </div>
          </div>
        </div>
      </div>
    <!--  -->
    </div> <!-- container -->
  </nav>
</template>

<script>
import Firebase from "firebase";
// import firebaseConfig from "@/firebase";

// Firebase.initializeApp(firebaseConfig);

export default {
  name: '',
  components: {},
  props: {
    brand: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      displayMenu: false,
      currentUser: ''
    }
  },
  methods: {
    showCart(event) {
      event.preventDefault();
      this.$store.dispatch('updateShowCart', true)
    },
    logout() {
      // let user = Firebase.auth().currentUser;
      Firebase.auth().signOut().then(()=>{
        this.$router.push('login')
        this.$store.dispatch('updateUser', false)
        this.displayMenu = false
      })
    }
  },
  computed: {
    // displayMenuStyle() {
    //   return { display: this.displayMenu ? 'block' : 'none' }
    // },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    getCurrentUser(){
      return Firebase.auth().currentUser ? Firebase.auth().currentUser : ''
    }
  },
  watch: {},
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
nav {
  height: 4.25rem;
  background-color: #000000bf;
  -webkit-box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.75);
box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.75);
}
.navbar-item img{
  max-height: 100% !important;
}
.navbar-item:hover{
  background: transparent;
}
.tag{
  border-radius: 50%;
  background: red !important;
  color: #fff !important;
  margin-left: 10px;
}
.navbar-dropdown{
  right: 0 !important;
  left: auto;
}
.navbar-link:hover, .navbar-link:focus{
    border-radius: 22px;
    margin-left: 20px;
}
.navbar-link{
    border-radius: 22px;
    margin-left: 20px;
}
.icon{
  width: 25px;
}
.navbar-item.has-dropdown:focus .navbar-link, .navbar-item.has-dropdown:hover .navbar-link, .navbar-item.has-dropdown.is-active .navbar-link{
  background: transparent;
}
</style>