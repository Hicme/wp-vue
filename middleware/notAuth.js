export default function({ store, redirect }) {
  if (!store.getters['user/isLogged']) {
    return redirect('/login')
  }
}
