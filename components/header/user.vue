<template>
  <div class="col-md-2 col-sm-3 user_menu">
    <div v-if="!user" class="not-logged">
      <nuxt-link
        class="user_menu-link"
        no-prefetch
        exact
        active-class="active"
        to="/login"
      >
        Log-in
      </nuxt-link>
    </div>
    <div v-else class="logged-in dropdown">
      <div class="user_menu-name btn dropdown-toggle" data-toggle="dropdown">
        Hello, {{ user.first_name }}
      </div>
      <ul class="user_menu-list dropdown-menu">
        <li>
          <nuxt-link
            class="user_menu-link"
            no-prefetch
            exact
            active-class="active"
            to="/account"
          >
            Dashboard
          </nuxt-link>
        </li>
        <li>
          <a href="#" class="user_menu-link" @click="logOut">
            Log-out
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('user/logOut')
      this.$router.push('/')
    }
  }
}
</script>
