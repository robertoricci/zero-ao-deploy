const { verify } = require('../services/firebase')

const R = require('ramda')

const extractToken = ctx => {
  const authorization = ctx.headers.authorization || ''
  return authorization.replace('Bearer ', '')
}

const handleError = error => {
  console.error('Failed to verify token', error)
  // illustration purposes only
  // for production-ready code, use error codes/types and a catalog (maps codes -> responses)

  /* eslint-disable prefer-promise-reject-errors */
  return Promise.reject({
    status: 401,
    message: 'Invalid authentication token',
    code: 'UNAUTHENTICATED',
  })
}

module.exports = (ctx, next) => {
  const token = extractToken(ctx)
  return verify(token)
    .then(R.tap(console.info))
    .catch(handleError)
    .then(next)
}
