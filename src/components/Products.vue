<template>
  <div>
    <section class="hero is-bold">
      <div class="hero-body">
        <div class="container header">
          <div class="header-title">
            <h1 class="title">
              Nuestros Productos
            </h1>
            <h2 class="subtitle">
              Primary subtitle
            </h2>
          </div>
          <div class="search">
            <!-- <label for="searchBox">Buscar </label>
            <input type="text" id="searchBox" v-model="search"/> -->
            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input"
                  type="text"
                  placeholder="Buscar"
                  v-model="search"
                />
                <span class="icon is-small is-left">
                  <i class="mdi mdi-magnify"></i>
                </span>
              </p>
            </div>
            <!--  -->
          </div>
        </div>
      </div>
    </section>

    <div class="container has-padding-5">
      <h2 class="has-text-centered is-size-5">
        NUEVOS LANZAMIENTOS EN LA TIENDA
      </h2>
      <div class="columns is-multiline">
        <div class="column is-4" v-for="p in computedProductList" :key="p.id">
          <!-- Item -->
          <div class="card has-equal-height">
            <div class="image-card">
              <div class="image has-spacing image">
                <img alt="product" :src="p.data.picture" />
                <div class="product-title">
                  <h3 class="title">{{ p.data.name }}</h3>
                  <h4>Altars of madness</h4>
                </div>
              </div>
            </div>
            <div class="card-content">
              <div class="content card-detail">
                <div class="card-description">
                  <p class="subtitle">$ {{ parseInt(p.data.price) }}</p>
                  <!-- <div class="has-spacing-bottom"> -->
                  <!-- <div class="has-spacing-bottom">
                  <span class="tag is-medium">tortor</span>
                  <span class="tag is-medium">suscipit</span>
                  <span class="tag is-medium">Vivamus</span>
                </div> -->
                  <!-- </div> -->
                  <!-- <p></p> -->
                  <p>{{ p.data.description }}</p>
                </div>
                <!-- <p></p> -->
                <div class="card-footer">
                  <div class="counter">
                    <button @click="decrQty(p.id)" :disabled="p.qty === 1">
                      <i class="mdi mdi-minus"></i>
                    </button>
                    {{ p.qty }}
                    <button @click="incrQty(p.id)">
                      <i class="mdi mdi-plus"></i>
                    </button>
                  </div>
                  <button
                    @click="addToCart(p)"
                    class="button is-pulled-right is-warning"
                  >
                    <i class="mdi mdi-cart"></i>
                  </button>
                </div>
                <div class="is-clearfix"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Item  -->
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script>
// import { Products } from "../services/API";

import { mapState } from "vuex";

export default {
  components: {},
  props: {},
  data() {
    return {
      search: "",
    };
  },
  methods: {
    incrQty(id) {
      let idx = this.products.map((p) => p.id).indexOf(id);
      this.products[idx].qty++;
    },
    decrQty(id) {
      let idx = this.products.map((p) => p.id).indexOf(id);
      // console.log('decr on ', this.products[idx])
      if (this.products[idx].qty > 1) {
        this.products[idx].qty--;
      }
    },
    addToCart(product) {
      // push a copy of product to the cart
      let p = JSON.parse(JSON.stringify(product));
      this.$store.dispatch("addToCart", p);
      // reset qty
      product.qty = 1;
    },
  },
  computed: {
    ...mapState(["products"]),
    computedProductList() {
      console.log(this.products);
      return this.products.filter((p) => {
        return p.data.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  watch: {},
  created() {
    this.$store.dispatch("getProducts");
    // Pull products from Product service
    // Products.all().then(response => {
    //   response.data.forEach(p => {
    //     p['qty'] = 1
    //     this.products.push(p)
    //   })
    // })
    // .catch(error => {
    //   alert(error.message)
    // })
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.counter {
  display: inline-block;
  button {
    text-align: center;
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
    cursor: pointer;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.hero {
  background: url("/img/header.png") no-repeat bottom !important;
  background-size: cover !important;
  height: 290px !important;
}
.hero-body {
  padding: 4rem 1.5rem;
  display: flex;
  align-items: flex-end;
}
.input {
  padding: 10px 10px 10px 3.5rem !important;
  height: auto;
  border-radius: 30px;
}
.search {
  width: 22%;
}
.icon i {
  font-size: 1.8rem;
  color: #a7a5a5;
}
.icon {
  width: 3.5rem !important;
  height: 3rem !important;
}
.product-title {
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  bottom: 0px;
  padding: 20px;
  width: 100%;
  .title {
    font-weight: bold;
    color: #fff;
    margin: 0;
  }
  h4 {
    color: #fff;
    font-size: 1.5em;
    font-weight: normal;
  }
}
.image img {
  border-radius: 20px 20px 0 0;
}
.card {
  border-radius: 20px;
  height: 100%;
}
.card-detail{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
