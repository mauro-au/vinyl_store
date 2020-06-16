<template>
  <div>
    <h1>Crear Producto</h1>
    <section class="section">
      <div class="container">
        <form class="login-container">
          <div class="control">
            <label>Nombre</label>
            <input
              class="input"
              type="text"
              placeholder="Normal input"
              v-model="name"
            />
          </div>
          <div class="control">
            <label>Picture</label>
            <input
              class="input"
              type="text"
              placeholder="Normal input"
              v-model="picture"
            />
          </div>
          <div class="control">
            <label>Precio</label>
            <input
              class="input"
              type="number"
              placeholder="Precio"
              v-model="price"
            />
          </div>
          <div class="control">
            <label>Descripción</label>
            <textarea
              class="textarea"
              placeholder="Descripción"
              v-model="description"
            ></textarea>
          </div>

          <button @click.prevent="createProduct">Añadir</button>
          <button v-if="edit" @click="updateProduct(id)">Actualizar</button>
        </form>
      </div>
    </section>
    <section>
      <div class="container">
        <h1>Listar Productos</h1>
        <table class="table">
          <thead>
            <tr>
              <th>Nombre Producto</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th colspan="2" class="action">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in computedProductList" :key="p.id">
              <td>{{ p.data.name }}</td>
              <td>{{ p.data.price }}</td>
              <td>{{ p.data.description }}</td>
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
        picture: this.picture,
        price: this.price,
        description: this.description,
      };
      axios
        .post(
          "https://us-central1-tddg3-ca51a.cloudfunctions.net/products/product",
          create,
          { headers: { "content-type": "application/json" } }
        )
        .then((response) => {
          console.log(response);
          this.$store.dispatch("getProducts");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteProduct(id) {
      let confirmation = confirm("Seguro?");
      if (confirmation) {
          axios.delete(`https://us-central1-tddg3-ca51a.cloudfunctions.net/products/product/${id}`, 
            { headers: { "content-type": "application/json" }}
        )
        .then(() => {
            alert("Produco Eliminado");
            this.$store.dispatch("getProducts");
        });
      }
    },
    editProduct(id){
        this.updateEdit()
        this.findProduct(id)
    },
    findProduct(id){
        axios.get(`https://us-central1-tddg3-ca51a.cloudfunctions.net/products/product/${id}`, 
            { headers: { "content-type": "application/json" }}
        )
        .then((response) =>{
            this.name = response.data.name
            this.picture = response.data.picture
            this.price = response.data.price
            this.description = response.data.description
            this.id = id
        })
    },
    updateProduct(id){
      let create = {
        name: this.name,
        picture: this.picture,
        price: this.price,
        description: this.description,
      };
      axios.put(`https://us-central1-tddg3-ca51a.cloudfunctions.net/products/product/${id}`, create,
          { headers: { "content-type": "application/json" } }
        )
        .then(() => {
          this.name = ''
          this.price = ''
          this.picture = ''
          this.description = ''
          this.id = ''
          this.$store.dispatch("getProducts");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapState(["products", "edit"]),
    computedProductList() {
      return this.products;
    },
  },
  mounted() {
    this.$store.dispatch("getProducts");
  },
};
</script>

<style></style>
