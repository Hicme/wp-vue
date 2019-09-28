const axios = require('axios')

const loadSettings = async (siteUrl = '') => {
  if (!siteUrl) {
    throw new Error('No site url defined!')
  }

  try {
    const settings = await axios.get(siteUrl)
    return settings.data
  } catch (err) {
    throw new Error(`Error while loading WP settings. URL: ${siteUrl}`)
  }
}

module.exports = loadSettings