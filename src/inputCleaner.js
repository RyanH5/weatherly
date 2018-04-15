
const inputCleaner = (string) => {
  return string.toLowerCase().split(' ').join('_')
}

const upperCaser = (string) => {
  string.split('_').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1)
    }
  ).join(' ')
}

export {
  inputCleaner,
  upperCaser
}