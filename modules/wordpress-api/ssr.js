const axios = require('axios')
const pMap = require('p-map')

export const loadObjects = async function(
  url,
  urlParams = {},
  baseRoute,
  paginate = false,
  perPage = 10
) {
  const object = await new Promise(async (resolve, reject) => {
    let object
    const routes = []
    try {
      object = await axios.get(url, {
        params: {
          per_page: perPage,
          ...urlParams
        }
      })
    } catch (err) {
      return reject(err)
    }

    const totalItems = parseInt(object.headers['x-wp-total'], 10)
    const totalPages = parseInt(object.headers['x-wp-totalpages'], 10)

    try {
      object.data = ensureArrayData(url, object.data)
    } catch (err) {
      return reject(err)
    }

    if (paginate) {
      routes.push({
        route: `/${baseRoute}`,
        payload: {
          pageNumber: 1,
          objects: object.data,
          totalObjects: totalItems,
          totalPages
        }
      })

      routes.push({
        route: `/${baseRoute}page/1`,
        payload: {
          pageNumber: 1,
          objects: object.data,
          totalObjects: totalItems,
          totalPages
        }
      })
    }

    if (!totalItems || totalPages < 1) {
      object.data.forEach(obj => {
        routes.push({
          route: `/${baseRoute}${obj.slug}`,
          payload: obj
        })
      })

      resolve(routes)
    }

    const queue = []

    for (let page = 2; page <= totalPages; page++) {
      queue.push({
        per_page: perPage,
        page
      })
    }

    await pMap(queue, async params => {
      try {
        const { data } = await axios.get(url, {
          params: {
            params,
            ...urlParams
          }
        })
        object.data.push(...ensureArrayData(url, data))

        if (paginate) {
          routes.push({
            route: `/${baseRoute}page/${params.page}`,
            payload: {
              pageNumber: params.page,
              objects: data,
              totalObjects: totalItems,
              totalPages
            }
          })
        }
      } catch (err) {
        console.log(err.message)
      }
    })

    object.data.forEach(cont => {
      routes.push({
        route: `/${baseRoute}${cont.slug}`,
        payload: cont
      })
    })

    resolve(routes)
  })

  return object
}

export const loadCategories = function(
  categoryUrl,
  baseRoute,
  objectUrl,
  perPage = 10
) {
  const categoris = new Promise(async (resolve, reject) => {
    let category
    const routes = []

    try {
      category = await axios.get(categoryUrl, {
        params: {
          per_page: perPage
        }
      })
    } catch (err) {
      reject(err)
    }

    try {
      category.data = ensureArrayData(categoryUrl, category.data)
    } catch (err) {
      return reject(err)
    }

    await pMap(category.data, async category => {
      let object
      try {
        object = await axios.get(objectUrl, {
          params: {
            per_page: perPage,
            categories: category.id
          }
        })
      } catch (err) {
        console.log(err)
      }

      const totalItems = parseInt(object.headers['x-wp-total'], 10)
      const totalPages = parseInt(object.headers['x-wp-totalpages'], 10)

      routes.push({
        route: `/${baseRoute}/${category.slug}`,
        payload: {
          pageNumber: 1,
          objects: object.data,
          category: category,
          totalObjects: totalItems,
          totalPages: totalPages
        }
      })

      routes.push({
        route: `/${baseRoute}/${category.slug}/page/1`,
        payload: {
          pageNumber: 1,
          objects: object.data,
          category,
          totalObjects: totalItems,
          totalPages: totalPages
        }
      })

      if (totalPages > 1) {
        const queue = []

        for (let page = 2; page <= totalPages; page++) {
          queue.push({
            per_page: perPage,
            page
          })
        }

        await pMap(queue, async params => {
          try {
            const { data } = await axios.get(objectUrl, {
              params: {
                params,
                categories: category.id
              }
            })

            routes.push({
              route: `/${baseRoute}/${category.slug}/page/${params.page}`,
              payload: {
                pageNumber: params.page,
                objects: data,
                category,
                totalObjects: totalItems,
                totalPages: totalPages
              }
            })
          } catch (err) {
            console.log(err.message)
          }
        })
      }
    })

    resolve(routes)
  })

  return categoris
}

function ensureArrayData(url, data) {
  if (!Array.isArray(data)) {
    try {
      data = JSON.parse(data)
    } catch (err) {
      throw new Error(
        `Failed to fetch ${url}\n` +
          `Expected JSON response but received:\n` +
          `${data.trim().substring(0, 150)}...\n`
      )
    }
  }
  return data
}
