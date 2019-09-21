<template>
  <transition name="fade">
    <div class="row">
      <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
        <!-- Shopping cart table -->
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="border-0 bg-light">
                  <div class="p-2 px-3 text-uppercase">Product</div>
                </th>
                <th scope="col" class="border-0 bg-light">
                  <div class="py-2 text-uppercase">Price</div>
                </th>
                <th scope="col" class="border-0 bg-light">
                  <div class="py-2 text-uppercase">Quantity</div>
                </th>
                <th scope="col" class="border-0 bg-light">
                  <div class="py-2 text-uppercase">Remove</div>
                </th>
              </tr>
            </thead>
            <transition-group name="list" tag="tbody">
              <tr
                v-for="product in getProducts"
                :key="product.id"
                class="animation-list"
              >
                <th scope="row">
                  <div class="p-2">
                    <img
                      :src="product.image"
                      alt=""
                      width="70"
                      class="img-fluid rounded shadow-sm"
                    />
                    <div class="ml-3 d-inline-block align-middle">
                      <h5 class="mb-0">
                        <nuxt-link
                          :to="getProductLink(product)"
                          class="text-dark d-inline-block align-middle"
                        >
                          {{ product.title }}
                        </nuxt-link>
                      </h5>
                    </div>
                  </div>
                </th>
                <td class="align-middle">
                  <strong>${{ product.price }}</strong>
                </td>
                <td class="align-middle">
                  <strong>{{ product.quantity }}</strong>
                </td>
                <td class="align-middle">
                  <a
                    href="#"
                    class="text-dark"
                    @click.prevent.stop="
                      removeCartItem(product.item_key, $event)
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 774.266 774.266"
                      xml:space="preserve"
                    >
                      <g>
                        <path
                          d="M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875
                          C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916
                          c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703
                          c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z
                          M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282
                          c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802
                          H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z"
                        />
                        <rect
                          x="475.031"
                          y="286.593"
                          width="48.418"
                          height="396.942"
                        />
                        <rect
                          x="363.361"
                          y="286.593"
                          width="48.418"
                          height="396.942"
                        />
                        <rect
                          x="251.69"
                          y="286.593"
                          width="48.418"
                          height="396.942"
                        />
                      </g>
                    </svg>
                  </a>
                </td>
              </tr>
            </transition-group>
          </table>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    getProducts() {
      return this.$store.getters['cart/cart'].products
    }
  },
  methods: {
    getProductLink(product) {
      return '/shop/' + product.slug
    },
    async removeCartItem(itemKey, e) {
      try {
        await this.$store.dispatch('cart/removeFromCart', itemKey)
        const elHeight = e.target.closest('.animation-list').offsetHeight
        e.target.closest('.animation-list').style.maxHeight = elHeight
      } catch (err) {
        console.log(err.response)
      }
    }
  }
}
</script>

<style scoped>
svg {
  width: 17px;
}
</style>
