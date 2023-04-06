const hashGenerator = (n = 10, prefix) => ((prefix)
    ? `${prefix}_${[...Array(n)].map(() => Math.floor(Math.random() * 32).toString(32)).join('')}`
    : [...Array(n)].map(() => Math.floor(Math.random() * 32).toString(32)).join(''))

module.exports = hashGenerator
