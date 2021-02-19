'use strict'

const {
  PORT, HASH
} = process.env

function login (user, passwd) {
  return user === 'node' && passwd === 'developer'
}