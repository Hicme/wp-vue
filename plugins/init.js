export default function(ctx) {
  ctx.store.dispatch('user/fetch')
  ctx.store.dispatch('menu/fetch')
  ctx.store.dispatch('sidebar/fetch')
  ctx.store.dispatch('footer/fetch')

  if (ctx.route.query.preview) {
    if (ctx.route.query.p) {
      ctx.store.dispatch('page/fetchPreview', ctx.route.query.p)
    }

    if (ctx.route.query.page_id) {
      ctx.store.dispatch('page/fetchPreview', ctx.route.query.page_id)
    }
  }
}
