import axios from 'axios'

export default async (siteUrl = '') => {
  if (!siteUrl) {
    const err = 'No site url defined!'
    throw err
  }

  try {
    const settings = await axios.get(siteUrl)
    return settings.data
  } catch (err) {
    throw err
  }
}
