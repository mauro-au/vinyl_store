<template>
  <section class="hero is-fullheight bg__error">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <div class="error__body">
              <h1 class="error__title">404</h1>
              <h2 class="error__subtitle">Ooops... Pagina no encontrada!!</h2>
              <p class="size-medium">El enlace que estas buscando es incorrecto</p>
              <router-link to="/">
                <button class="button is-success mt-5 is-medium">Volver al inicio</button>
              </router-link>
            </div>
          </div>
        </div>
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
}
.error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  &__body {
    border-radius: 20px;
    padding: 50px;
    text-align: center;
    color: #fff;
    p{
      font-size: 1rem;
    }
  }
  &__title {
    font-size: 6rem;
    font-weight: bold;
    margin-bottom: 0px;
    margin-top: 0px;
  }
  &__subtitle {
    font-size: 2rem;
  }
}
.hero-body{
  display: -webkit-box !important;
}
@media (min-width: 950px) {
  .error{
    &__title {
      font-size: 13rem;
      margin-bottom: -35px;
      margin-top: -70px;
    }
    &__subtitle {
      font-size: 3rem;
    }
    &__body p{
      font-size: 1.4rem;
    }
  }
}
</style>