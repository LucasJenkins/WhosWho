import 'whatwg-fetch'

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON (response) {
  if (response.status === 204 || response.status === 205) {
    return null
  }
  return response.json()
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request (url, options) {
  // eslint-disable-next-line no-undef
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
}

export const chooseRandom = (array = [], numItems) => {
  let newArr = []
  let randomIndex = 0

  if (array.length < 2) {
    return array
  }

  if (numItems > array.length) {
    numItems = getRandomInt(0, array.length)
  }

  let copyArr = []
  copyArr = array

  for (let i = 0; i < numItems; i++) {
    randomIndex = getRandomInt(0, copyArr.length)
    console.log(randomIndex)
    newArr.push(copyArr[randomIndex])
    console.log(newArr)
    copyArr.splice(randomIndex, 1)
  }

  return newArr
}

export function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
