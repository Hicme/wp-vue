export default ({ app }, inject) => {
  const functions = {
    setVal(name, val, expiry = 10080) {
      const time = new Date().getTime()
      const data = {
        ...val,
        expire: time + expiry * 60000
      }

      localStorage.setItem(name, JSON.stringify(data))
    },
    getVal(name) {
      const val = localStorage.getItem(name)

      if (val) {
        const data = JSON.parse(val)
        const time = new Date().getTime()
        if (data.expire > time) {
          delete data.expire
          return data
        } else {
          return false
        }
      } else {
        return false
      }
    },
    deleteVal(name) {
      localStorage.removeItem(name)
    }
  }

  inject('LStore', functions)
}
