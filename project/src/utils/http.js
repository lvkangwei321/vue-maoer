import axios from 'axios'
const qs = require('qs');
export const get = ({
  url,
  params
}) => {
  return axios({
      url,
      params
    })
    .then((result) => {
      return result.data
    })
    .catch((err) => {
      return err.message
    })
}

export const post = (
  url,
  data
) => {
  return axios.post(url, qs.stringify(data))
    .then((result) => {
      return result.data
    })
    .catch((err) => {
      return err.message
    })
}