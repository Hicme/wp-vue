<template>
  <div class="reset d-flex align-items-center py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 col-xl-7 mx-auto">
          <h3 class="display-4">Create new password.</h3>
          <p class="text-muted mb-4">
            Please enter your new password.
          </p>
          <form @submit.prevent="trySetPassword">
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
            <div
              v-if="response"
              class="alert alert-info text-center"
              :class="response.class"
            >
              {{ response.message }}
            </div>
            <button
              type="submit"
              class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
            >
              Change
            </button>
            <ul class="list-inline">
              <li class="list-inline-items">
                <nuxt-link to="/login">Back to Log In</nuxt-link>
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
      password: '',
      confirmPassword: '',
      response: false
    }
  },
  methods: {
    async trySetPassword() {
      const response = await this.$store.dispatch('user/setPassword', {
        login: this.$route.query.login,
        key: this.$route.query.key,
        password: this.password,
        confirmPassword: this.confirmPassword
      })

      this.response = response
    }
  }
}
</script>
