<template>
  <div class="register d-flex align-items-center py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 col-xl-7 mx-auto">
          <h3 class="display-4">Registration!</h3>
          <p class="text-muted mb-4">
            Use your email and strong password to register
          </p>
          <form @submit.prevent="tryRegister">
            <div class="form-group mb-3">
              <input
                id="RegisterEmail"
                v-model="email"
                type="email"
                placeholder="Email address"
                autofocus=""
                class="form-control rounded-pill border-0 shadow-sm px-4"
              />
            </div>
            <div class="form-group mb-3">
              <input
                id="RegisterPassword"
                v-model="password"
                type="password"
                placeholder="Password"
                class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
              />
            </div>
            <div class="form-group mb-3">
              <input
                id="RegisterPasswordConfirmation"
                v-model="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
              />
            </div>
            <div v-if="trying" class="alert alert-danger text-center">
              {{ trying }}
            </div>
            <button
              type="submit"
              class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
            >
              Register
            </button>
            <ul class="list-inline">
              <li class="list-inline-items">
                <nuxt-link to="/login/">Back to Log In</nuxt-link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      trying: false
    }
  },
  methods: {
    async tryRegister() {
      const response = await this.$store.dispatch('user/register', {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      })

      if (response === true) {
        this.trying = false
        this.$router.push('/account/')
      } else {
        this.trying = response.data.message
      }
    }
  }
}
</script>
