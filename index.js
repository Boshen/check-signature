const crypto = require('crypto')
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const request = require('request-promise')

const app = new Koa()
const router = new Router()

/*
 * Secret 密匙
 */
const secret = 'Datv6r63_'

/*
 * 生成 signature 的算法
 */
const sign = (body) => {
  return crypto.createHmac('sha1', secret).update(body, 'utf8').digest('hex')
}

/*
 * 模拟我方服务器像用户发送数据
 */
router.post('/api/sign', (ctx) => {
  const body = {
    "id": "asdf",
    "payload": {
      "name": "asdf",
      "ts": 1560396834
    }
  }
  const rawBody = JSON.stringify(body)
  const signature = sign(rawBody)
  console.log('/api/sign rawBody: ' + rawBody)
  console.log('/api/sign signature: ' + signature)
  ctx.status = 200
  ctx.body = {}

  request({
    method: 'POST',
    uri: 'http://localhost:4000/api/check',
    body: rawBody,
    headers: {
      'Content-type': 'application/json',
      'Agora-Signature': signature,
    }
  })
})

/*
 * 模拟对方服务器接收数据
 */
router.post('/api/check', (ctx) => {
  const signature = ctx.request.headers['agora-signature']
  const rawBody = ctx.request['rawBody']
  const signed = sign(rawBody)
  console.log('/api/check rawBody: ' + rawBody)
  console.log('/api/check signature ' + signature)
  console.log('/api/check signd: ' + signed)
  ctx.status = signature === signed ? 200 : 400
  ctx.body = {}
})

app
  .use(bodyParser())
  .use(router.routes())
  .listen(4000)
