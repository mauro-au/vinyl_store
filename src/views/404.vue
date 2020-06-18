<template>
  <section class="bg__error">
    <div class="container error">
      <div class="error__body">
        <h1 class="error__title">404</h1>
        <h2 class="error__subtitle">Ooops... Pagina no encontrada!!</h2>
        <p class="size-1">El enlace que estas buscando es incorrecto</p>
        <router-link to="/">
          <button class="button is-success">Ir a la home</button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss">
.bg__error {
  background: url("/img/404.jpg") no-repeat center;
  background-size: cover;
  height: 100vh;
}
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  height: 100vh;
  &__body {
    background: rgba(0, 0, 0, 0.541);
    border-radius: 20px;
    padding: 50px;
    text-align: center;
  }
  &__title {
    font-size: 15rem;
    font-weight: bold;
    margin-bottom: -50px;
    margin-top: -80px;
  }
  &__subtitle {
    font-size: 3rem;
  }
}
.button {
  margin-top: 20px;
}
</style>
