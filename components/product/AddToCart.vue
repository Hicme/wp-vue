<template>
  <div class="addToCartWrapper">
    <button @click="tryAddToCart">
      Add To Cart
    </button>
    <div v-if="addedToCart" class="addedToCart">
      {{ addedToCartText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      addedToCart: false,
      addedToCartText: ''
    }
  },
  methods: {
    async tryAddToCart() {
      const { data, message } = await this.$store.dispatch('cart/addToCart', {
        id: this.product.id,
        quantity: 1
      })

      if (data) {
        this.addedToCartText = message

        this.showAdded()
      } else {
        console.log('Error while adding to cart')
      }
    },
    showAdded() {
      this.addedToCart = true

      setTimeout(() => {
        this.addedToCart = false
      }, 3000)
    }
  }
}
</script>
