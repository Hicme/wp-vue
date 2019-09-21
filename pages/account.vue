<template>
  <section class="section section--py-0">
    <div class="container-fluid">
      <div class="row no-gutter">
        <div class="col-md-12 text-center bg-light overflow-hidden">
          <h1>Hello {{ user.first_name }}!</h1>
          <p>Your ID is #{{ user.ID }}</p>
          <p>Your email is: {{ user.email }}</p>
          <button @click="logout">Log out</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters['user/user']
    }
  },
  middleware: 'notAuth',
  methods: {
    logout() {
      this.$store.dispatch('user/logOut')
      this.$router.push('/login')
    }
  }
}
</script>
