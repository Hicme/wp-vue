<template>
  <div class="login d-flex align-items-center py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 col-xl-7 mx-auto">
          <h3 class="display-4">Sign In!</h3>
          <p class="text-muted mb-4">
            Use your email and password to log in
          </p>
          <form @submit.prevent="tryLogin">
            <div class="form-group mb-3">
              <input
                v-model="username"
                type="email"
                placeholder="Email address"
                autofocus=""
                class="form-control rounded-pill border-0 shadow-sm px-4"
              />
            </div>
            <div class="form-group mb-3">
              <input
                v-model="password"
                type="password"
                placeholder="Password"
                class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
              />
            </div>
            <div class="custom-control custom-checkbox mb-3">
              <input
                id="customCheck1"
                v-model="remember"
                type="checkbox"
                checked
                class="custom-control-input"
              />
              <label for="customCheck1" class="custom-control-label">
                Remember Me
              </label>
            </div>
            <div v-if="trying" class="alert alert-danger text-center">
              The username or password is not correct. <br />
              Did you
              <nuxt-link to="/login/reset" class="alert-link">
                forget your password
              </nuxt-link>
              ?
            </div>
            <button
              type="submit"
              class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
            >
              Sign in
            </button>
            <ul class="list-inline">
              <li class="list-inline-items">
                <nuxt-link to="/login/register">Registration</nuxt-link>
              </li>
              <li class="list-inline-items">
                <nuxt-link to="/login/reset">Lost Password?</nuxt-link>
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
      username: '',
      password: '',
      remember: false,
      trying: false
    }
  },
  methods: {
    async tryLogin() {
      const response = await this.$store.dispatch('user/logIn', {
        username: this.username,
        password: this.password,
        remember: this.remember
      })

      if (response) {
        this.trying = false
        this.$router.push('/account/')
      } else {
        this.trying = true
      }
    }
  }
}
</script>
