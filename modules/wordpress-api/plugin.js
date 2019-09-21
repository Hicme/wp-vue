import { Wp } from '@/modules/wordpress-api/wp'

const wp = new Wp(<%= serialize(options) %>)

export default ({ app }, inject) => {
  inject('wp', wp)
}
