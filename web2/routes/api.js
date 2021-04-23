const unirest = require('unirest')
const express = require('express')
const router = express.Router()

router.all('/*', function (req, res) {
  let result = { error: 'Not found' }

  let _url = req.url
  let url = process.env.APIurl + _url
  let data = req.body
  let method = req.method
  let remote = {}
  //remote.ip = req.headers['cf-connecting-ip'] ? req.headers['cf-connecting-ip'] : req.ip //req.connection.remoteAddress;
  remote.ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] : req.connection.remoteAddress
  remote.url = req.hostname
  data.remote = remote
  //req.headers["x-forwarded-for"] = req.connection.remoteAddress;
  req.headers['Content-type'] = 'application/json'
  req.headers['Content-Length'] = data.length
  let headers = req.headers

  if (url.length === 1) {
    result = { error: 'file not found' }
    res.json(result)
  }

  if (_url.length > 1) {
    unirest(method, url)
      .headers(headers)
      .send(data)
      .encoding('utf-8')
      .end(function (_res) {
        if (_res.error) {
          if (_res.status >= 500) console.error('GET error', _res.error)
          //res.send({ecode:1000,message:'Service Unavailable!!'});//todo

          res.status(_res.status ? _res.status : 503).send(_res.body) //todo
          //.send({ ecode: 503, url: _url, error: "Service Unavailable!!" }); //todo
        } else {
          if (process.env.DEV) {
            let now = new Date()
            console.log(method, url, '\n', data, '\n', _res.body, '\n', now, req.connection.remoteAddress)
          }
          res.send(_res.body)
        }
      })
  }
})

module.exports = router
