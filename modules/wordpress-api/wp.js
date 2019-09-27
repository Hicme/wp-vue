import axios from 'axios'
import FormData from 'form-data'

export class Wp {
  constructor(options) {
    this.options = options
  }

  settings(name) {
    if (this.options.hasOwnProperty(name)) {
      return this.options[name]
    }

    return false
  }

  async ajax(data) {
    try {
      const formData = new FormData()

      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })

      const response = await axios.post(this.settings('ajax_url'), formData, {
        headers: process.browser
          ? { 'Content-Type': 'multipart/form-data' }
          : formData.getHeaders(),
        withCredentials: true
      })

      return {
        status: true,
        response: response.data
      }
    } catch (err) {
      return {
        status: false,
        response: err.response ? err.response.data : false
      }
    }
  }

  async rest(url, params = {}) {
    try {
      const response = await axios.get(this.settings('url') + url, {
        params: {
          ...params
        }
      })

      return {
        status: true,
        headers: response.headers,
        response: response.data
      }
    } catch (err) {
      return {
        status: false,
        response: err.response.data
      }
    }
  }
}
