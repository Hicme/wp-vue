export default function({ store, app }) {
  store.subscribeAction({
    after: (action, state) => {
      if (
        action.type === 'cart/addToCart' ||
        action.type === 'cart/removeFromCart' ||
        action.type === 'cart/addCoupon' ||
        action.type === 'cart/removeCoupon'
      ) {
        app.store.dispatch('cart/fetchCart')
      }
    }
  })

  store.subscribe((mutation, state) => {
    if (
      mutation.type === 'cart/userField' &&
      (mutation.payload.field === 'billing_country' ||
        mutation.payload.field === 'shipping_country')
    ) {
      app.store.dispatch('cart/fechStates', {
        code: mutation.payload.value,
        field: mutation.payload.field
      })
    }

    if (
      mutation.type === 'cart/userField' &&
      (mutation.payload.field === 'payment_method' ||
        mutation.payload.field === 'shipping_method')
    ) {
      app.store.dispatch('cart/updateTotals')
    }
  })

  app.store.dispatch('cart/fetchCart')
}
