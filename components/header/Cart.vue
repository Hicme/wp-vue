<template>
  <div class="col-md-2 col-sm-3 header-cart">
    <ul class="nav navbar-nav">
      <li class="mini-cart__holder nav-item">
        <nuxt-link to="/checkout" class="cart-link nav-link">
          {{ count }}
        </nuxt-link>
        <div class="mini-cart">
          <div
            v-for="item in cart.products"
            :key="item.id"
            class="mini-cart__item"
          >
            <a :href="`/shop/${item.slug}/`" class="mini-cart__link">
              <img :src="item.image" :alt="item.title" />
              <div class="mini-cart__content">
                <span class="mini-cart__title">{{ item.title }}</span>
                <span class="mini-cart__quantity">
                  {{ item.quantity }} x
                  <span class="mini-cart__amount">${{ item.price }}</span>
                </span>
              </div>
            </a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  computed: {
    count() {
      if (this.cart.content_count) {
        return this.cart.content_count + ' products'
      } else {
        return 'No Items'
      }
    },
    cart() {
      return this.$store.getters['cart/cart']
    }
  }
}
</script>
