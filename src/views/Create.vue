<template>
  <div>
    <section class="section mt-5">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-two-thirds">
        <h2 class="title is-1 has-text-centered create__title">Crear Producto</h2>
        <form class="login-container">
          <div class="field">
            <label>Nombre de Banda</label>
            <input class="input is-medium" type="text" placeholder="Nombre de Banda" v-model="name"/>
          </div>
          <div class="field">
            <label>Album</label>
            <input class="input is-medium" type="text" placeholder="Album" v-model="album"/>
          </div>
          <div class="field">
            <label>Imagen</label>
            <input class="input is-medium" type="text" placeholder="Imagen" v-model="picture"/>
          </div>
          <div class="field">
            <label>Precio</label>
            <input class="input is-medium" type="number" placeholder="Precio" v-model="price"/>
          </div>
          <div class="field">
            <label>Descripción</label>
            <textarea class="textarea is-medium" placeholder="Descripción" v-model="description"></textarea>
          </div>

          <button class="button is-success" @click.prevent="createProduct">Añadir</button>
          <button class="button is-info mx-4" v-if="edit" @click="updateProduct(id)">Actualizar</button>
        </form>
      </div>
      </div>
      </div>
    </section>
    <section>
      <div class="container">
        <h2 class="title is-1 has-text-centered create__title">Lista de Productos</h2>
        <div class="columns is-centered">
        <table class="table is-responsive">
          <thead>
            <tr>
              <th>Banda</th>
              <th>Album</th>
              <th>Precio</th>
              <th class="description-th">Descripción</th>
              <th>Imagen</th>
              <th colspan="2" class="action">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in computedProductList" :key="p.id">
              <td>{{ p.data.name }}</td>
              <td>{{ p.data.album }}</td>
              <td>${{ p.data.price }}</td>
              <td>{{ p.data.description.substring(0,100) }}...</td>
              <td><img alt="product logo" :src="p.data.picture"></td>
              <td>
                <button class="button btn-success" @click="editProduct(p.id)">Editar</button>
              </td>
              <td>
                <button class="button btn-danger" @click="deleteProduct(p.id)">
                  Borrar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      picture: "",
      price: "",
      description: "",
      id: undefined
    };
  },
  methods: {
    ...mapActions(["updateEdit"]),
    createProduct() {
      let create = {
        name: this.name,
        album: this.album,
        picture: this.picture,
        price: this.price,
        description: this.description
      };
      axios
        .post(
          "https://us-central1-tddg3-ca51a.cloudfunctions.net/products/product",
          create,
          { headers: { "content-type": "application/json" } }
        )
        .then(response => {
          console.log(response);
          this.$store.dispatch("getProducts");
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteProduct(id) {
      let confirmation = confirm("Seguro?");
      if (confirmation) {
        axios
          .delete(
            `https://us-central1-tddg3-ca51a.cloudfunctions.net/products/product/${id}`,
            { headers: { "content-type": "application/json" } }
          )
          .then(() => {
            alert("Produco Eliminado");
            this.$store.dispatch("getProducts");
          });
      }
    },
    editProduct(id) {
      this.updateEdit();
      this.findProduct(id);
    },
    findProduct(id) {
      axios
        .get(
          `https://us-central1-tddg3-ca51a.cloudfunctions.net/products/product/${id}`,
          { headers: { "content-type": "application/json" } }
        )
        .then(response => {
          this.name = response.data.name;
          this.album = response.data.album;
          this.picture = response.data.picture;
          this.price = response.data.price;
          this.description = response.data.description;
          this.id = id;
        });
    },
    updateProduct(id) {
      let create = {
        name: this.name,
        album: this.album,
        picture: this.picture,
        price: this.price,
        description: this.description
      };
      axios
        .put(
          `https://us-central1-tddg3-ca51a.cloudfunctions.net/products/product/${id}`,
          create,
          { headers: { "content-type": "application/json" } }
        )
        .then(() => {
          this.name = "";
          this.album = "";
          this.price = "";
          this.picture = "";
          this.description = "";
          this.id = "";
          this.$store.dispatch("getProducts");
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    ...mapState(["products", "edit"]),
    computedProductList() {
      return this.products;
    }
  },
  mounted() {
    this.$store.dispatch("getProducts");
  }
};
</script>

<style lang="scss" scoped>

.create__title{
    font-weight: bold;
    margin: 2.5rem 0 2rem 0;
}
.login-container{
  font-size: 1.2rem;
  font-weight: bold;
}
th, td{
  width: auto;
  padding: 20px;
}

table{
    width: 80vw;
    border-radius: 10px;
    margin-top: 20px;
}
img{
    width: 20vh;
    border-radius: 10px;
}
.columns{
  margin: 0;
}
@media screen and (max-width: 800px) {
  .is-responsive {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    display: block;
    position: relative;
  }

  .is-responsive th,
  .is-responsive td {
    margin: 0;
    vertical-align: top;
  }
  .is-responsive th {
    text-align: left;
  }
  .is-responsive thead {
    border-right: solid 2px #dbdbdb;
    display: block;
    float: left;
  }
  .is-responsive thead tr {
    display: block;
    padding: 0 10px 0 0;
  }

  .is-responsive thead td,
  .is-responsive thead th {
    border-width: 0 0 1px;
  }
  .is-responsive tbody {
    display: block;
    width: auto;
    position: relative;
    overflow-x: auto;
    white-space: nowrap;
  }
  .is-responsive tbody tr {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    border-right: 1px solid #eaeaea;
  }
  .is-responsive th {
    display: block;
    text-align: right;
  }
  .is-responsive td {
    display: block;
    min-height: 1.25em;
    text-align: left;
    overflow: hidden;
    margin: 0 10px;
  }
  .is-responsive th:last-child,
  .is-responsive td:last-child {
    border-bottom-width: 0;
  }
  .is-responsive tr:last-child td:not(:last-child) {
    border: 1px solid #dbdbdb;
    border-width: 0 0 1px;
  }
  .is-responsive.is-bordered td,
  .is-responsive.is-bordered th {
    border-width: 1px;
  }
  .is-responsive.is-bordered tr td:last-child,
  .is-responsive.is-bordered tr th:last-child {
    border-bottom-width: 1px;
  }
  .is-responsive.is-bordered tr:last-child td,
  .is-responsive.is-bordered tr:last-child th {
    border-width: 1px;
  }
}
</style>