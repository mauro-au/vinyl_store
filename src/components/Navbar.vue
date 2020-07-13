<template>
  <nav
    class="navbar is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <!-- Brand -->
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <img src="/img/logo.svg" class="navbar-logo" alt="" />
        </router-link>
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMenu"
          :class="{ 'is-active': displayMenu }"
          @click="displayMenu = !displayMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <!--  -->
      <div
        id="navbarMenu"
        class="navbar-menu"
        :class="{ 'is-active': displayMenu }"
      >
        <div class="navbar-end navbar-center">
          <a data-testId="cart" class="navbar-item" @click="showCart">
            <span class="icon cart__icon">
              <img src="/img/supermarket.svg" alt="" class="" />
              <span class="tag is-warning" v-if="$store.getters.shoppingCart.list.length > 0">
                {{ $store.getters.shoppingCart.list.length }}
              </span>
            </span>
          </a>
          <router-link v-if="!isLoggedIn" to="/login" class="button is-rounded navbar-login mx-4">
            Login
          </router-link>

          <div v-else class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link navbar-user-content">
              <img src="/img/user.svg" class="navbar-user" alt="" />
            </a>
            <div class="navbar-dropdown">
              <p class="navbar-item">
                {{ getCurrentUser ? getCurrentUser.email : "" }}
              </p>
              <hr class="navbar-divider" />

              <router-link to="/" class="navbar-item">
                Home
              </router-link>

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
    </div>
    <!-- container -->
  </nav>
</template>

<script>
import Firebase from "firebase";
// import firebaseConfig from "@/firebase";

// Firebase.initializeApp(firebaseConfig);

export default {
  name: "",
  components: {},
  props: {
    brand: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      displayMenu: false,
      currentUser: "",
    };
  },
  methods: {
    showCart(event) {
      event.preventDefault();
      this.$store.dispatch("updateShowCart", true);
    },
    logout() {
      // let user = Firebase.auth().currentUser;
      Firebase.auth()
        .signOut()
        .then(() => {
          this.$router.push("login");
          this.$store.dispatch("updateUser", false);
          this.displayMenu = false;
        });
    },
  },
  computed: {
    // displayMenuStyle() {
    //   return { display: this.displayMenu ? 'block' : 'none' }
    // },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    getCurrentUser() {
      return Firebase.auth().currentUser ? Firebase.auth().currentUser : "";
    },
  },
  watch: {},
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
nav {
  background-color: #000000d9;
  -webkit-box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.75);
}
.navbar-item img {
  max-height: 100% !important;
}
.navbar-item:hover {
  background: transparent;
}
.tag {
  border-radius: 50%;
  background: red !important;
  color: #fff !important;
  margin-left: 15px;
  margin-top: -10px;
  position: absolute;
}
.navbar-dropdown {
  right: 0 !important;
  left: auto;
}
.navbar-dropdown a, .navbar-dropdown p{
  color: #fff;
  font-size: 1.2rem;
}
.cart__icon {
  width: auto;
  margin-right: 10px !important;
  margin-left: .7rem !important;
}
.navbar-item.has-dropdown:focus .navbar-link,
.navbar-item.has-dropdown:hover .navbar-link,
.navbar-item.has-dropdown.is-active .navbar-link {
  background: transparent;
}
.navbar-logo{
    width: 6.5rem;
}
.navbar-center{
  align-items: center;
  position: relative;
}
.navbar-user {
  width: 2.5rem;
}
.navbar-burger{
  width: 6rem;
  height: auto;
  color: #fff;
}
.navbar-burger span{
  width: 25px;
  height: 2px;
  border-radius: 25px;
}
.navbar-menu {
  background-color: #0000;
  -webkit-box-shadow: 0 8px 16px rgba(10,10,10,0.1);
  box-shadow: 0 8px 16px rgba(10,10,10,0.1);
  padding: 0.5rem 0;
}
.navbar-user-content{
  position: absolute;
  right: 0;
  top: -57px;
}
#navbarMenu {
  margin-top: 20px;
}
.navbar-login{
  position: absolute;
  top: 0;
  right: 15px;
}
.navbar-link:not(.is-arrowless) {
    padding-right: 1.5em;
}
.navbar-link:not(.is-arrowless)::after {
  display: none;
}
@media (min-width: 1023px) {
.navbar-dropdown a, .navbar-dropdown p{
  color: #000;
}
.navbar-user-content{
  position: relative;
  top: auto;
}
#navbarMenu {
  margin-top: 0px;
}
.navbar-login{
  position: relative;
  right: 0px;
}
}
</style>