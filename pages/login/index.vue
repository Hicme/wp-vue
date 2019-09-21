<template>
  <section class="section section--py-0">
    <div class="container-fluid">
      <div class="row no-gutter">
        <div class="col-md-6 d-none d-md-flex bg-image"></div>
        <div class="col-md-6 bg-light overflow-hidden">
          <app-login />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogin from '@/components/signin/Login'

export default {
  middleware: 'isAuth',
  components: {
    AppLogin
  }
}
</script>

<style scoped>
.login,
.image,
.register,
.reset {
  min-height: 100vh;
}

.login,
.register,
.reset {
  animation: 1s fadeInLeft;
}

.bg-image {
  background-image: url('https://via.placeholder.com/500x500/000000/FFFFFF/?text=ImageBackground');
  background-size: cover;
  background-position: center center;
}
</style>
