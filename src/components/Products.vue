<template>
  <div>
    <section class="header hero is-bold">
      <header class="hero-body">
        <div class="header__container container">
          <div class="header__content">
            <h1 class="header__title">
              Lo mejor en vinilos
            </h1>
            <h2 class="header__subtitle">
              En un solo lugar
            </h2>
          </div>
          <div class="header__search">
            <div class="field">
              <p class="control has-icons-left">
                <input class="input is-medium" type="text" placeholder="Buscar" v-model="search"/>
                <span class="header__icon icon is-small is-left">
                  <i class="mdi mdi-magnify"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
      </header>
    </section>

    <section class="container">
      <div class="columns is-multiline">
        <div class="column is-4-desktop is-6-tablet card-container" v-for="p in computedProductList" :key="p.id">
          <!-- Item -->
          <div class="card has-equal-height">
            <div class="image-card">
              <div class="image has-spacing">
                <img alt="product" :src="p.data.picture" />
                <div class="product">
                  <h3 class="product__title">{{ p.data.name }}</h3>
                  <h4 class="product__subtitle">{{ p.data.album }}</h4>
                </div>
              </div>
            </div>
            <div class="card-content">
              <div class="content card__detail">
                <div class="card__description">
                  <p class="card__price">$ {{ p.data.price * p.qty }}</p>
                  <p>{{ p.data.description }}</p>
                </div>
              </div>
            </div>

            <div class="card__footer">
              <div class="counter">
                <button @click="decrQty(p.id)" :disabled="p.qty === 1">
                  <i class="mdi mdi-minus"></i>
                </button>
                {{ p.qty }}
                <button @click="incrQty(p.id)">
                  <i class="mdi mdi-plus"></i>
                </button>
              </div>
              <div @click="addToCart(p)" class="is-pulled-right clickable">
                <img src="/img/cart.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
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
      // console.log(this.products);
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
.header{
  background: url("/img/header.jpg") no-repeat bottom !important;
  background-size: cover !important;
  height: 65vh !important;
  margin-bottom: 70px;
  &__container{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  &__title{
    color: #fff;
    font-size: 4rem;
    font-weight: bold;
  }
  &__subtitle{
    font-size: 2.5rem;
    color: #fff;
  }
  &__search {
    width: 90%;
    margin-top: 40px;
  }
  &__icon {
    width: 3.5rem !important;
    height: 3rem !important;
    i{
      font-size: 1.8rem;
      color: #a7a5a5;
  }
}

}
.product{
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  bottom: 0px;
  padding: 20px;
  width: 100%;
  &__title {
    font-weight: bold;
    color: #fff;
    margin: 0;
    font-size: 2.2rem;
  }
  &__subtitle{
    color: #fff;
    font-size: 1.5em;
    font-weight: normal;
  }
}
.image img {
  border-radius: 20px 20px 0 0;
}
.card{
  border-radius: 20px;
  height: 100%;
  &__detail {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  &__price{
      color: #4a4a4a;
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.25;
  }
  &__footer {
    padding: 0px 26px 35px;
  }
  &-container {
    padding: 25px;
  }
}

.hero-body {
    display: flex;
    align-items: center;
}
.input {
  padding: 10px 10px 10px 3.5rem !important;
  height: auto;
  border-radius: 30px;
  transition: 1s;
  -webkit-box-shadow: 0px 10px 13px 4px rgba(0,0,0,0.54);
  -moz-box-shadow: 0px 10px 13px 4px rgba(0,0,0,0.54);
  box-shadow: 0px 10px 13px 4px rgba(0,0,0,0.54);
}
.input:focus {
  -webkit-box-shadow: 0px 0px 21px 13px rgba(85,85,85,0.54);
  -moz-box-shadow: 0px 0px 21px 13px rgba(85,85,85,0.54);
  box-shadow: 0px 0px 21px 13px rgba(85,85,85,0.54);
}
.main-subtitle {
  margin: 3rem;
}
.clickable {
  cursor: pointer;
}
.columns{
  margin: 0;
}
@media (min-width: 515px) {
  .header__search {
    width: 50%;
  }
}
@media (min-width: 769px) {
  .card__footer {
    position: absolute;
    bottom: 0;
    padding: 15px 26px;
    width: 100%;
  }
  .card__description{
    margin-bottom: 55px;
  }
  .header__search {
      width: 30%;
  }
}
</style>