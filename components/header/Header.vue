<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <app-logo />
        <app-menu />
        <app-user />
        <app-cart />
      </div>
    </div>
  </header>
</template>

<script>
import AppLogo from '~/components/header/Logo'
import AppMenu from '~/components/header/menu/Menu'
import AppUser from '~/components/header/User'
import AppCart from '~/components/header/Cart'

export default {
  components: {
    AppLogo,
    AppMenu,
    AppUser,
    AppCart
  }
}
</script>
