<template>
  <section class="section section--py-0">
    <div class="container-fluid">
      <div class="row no-gutter">
        <div class="col-md-6 d-none d-md-flex bg-image"></div>
        <div class="col-md-6 bg-light overflow-hidden">
          <app-password-reset v-if="!response" />
          <app-new-password v-if="response" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppPasswordReset from '@/components/signin/PasswordReset'
import AppNewPassword from '@/components/signin/NewPassword'

export default {
  components: {
    AppPasswordReset,
    AppNewPassword
  },
  async asyncData({ route, store }) {
    if (route.query.key && route.query.login) {
      const response = await store.dispatch('user/validateKey', {
        key: route.query.key,
        login: route.query.login
      })

      return { response }
    }
    return { response: false }
  },
  middleware: 'isAuth'
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
