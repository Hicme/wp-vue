<template>
  <div class="reset d-flex align-items-center py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 col-xl-7 mx-auto">
          <h3 class="display-4">Lost your password?</h3>
          <p class="text-muted mb-4">
            Please enter your username or email address. You will receive a link
            to create a new password via email.
          </p>
          <form @submit.prevent="tryResetPassword">
            <div class="form-group mb-3">
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="Email address"
                autofocus=""
                class="form-control rounded-pill border-0 shadow-sm px-4"
              />
            </div>
            <div
              v-if="response"
              class="alert text-center"
              :class="response.class"
            >
              {{ response.message }}
            </div>
            <button
              type="submit"
              class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
            >
              Sign in
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
      response: false
    }
  },
  methods: {
    async tryResetPassword() {
      const response = await this.$store.dispatch('user/resetPassword', {
        email: this.email
      })

      this.response = response
    }
  }
}
</script>
