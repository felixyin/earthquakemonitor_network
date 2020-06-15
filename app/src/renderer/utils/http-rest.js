/**
 * HTTP数据通信模块
 */
var rest = require('restler')
import $ from 'jquery'
var Promise = require('promise')

export const postJson = (url, data) => {
  var promise = new Promise(function (resolve, reject) {
    let dataStr = JSON.stringify(data)
    $.ajax({
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      url: url,
      data: dataStr
    }).then(function (data, textStatus, jqXHR) {
      if (data.status) {
        resolve(data.data)
      } else {
        let error = new Error(data.message)
        reject(error)
      }
    }, function (jqXHR, textStatus, errorThrown) {
      reject(errorThrown)
    })
  })
  return promise
}

export const post = (url, data) => {
  var promise = new Promise(function (resolve, reject) {
    $.ajax({
      method: 'POST',
      url: url,
      data: data
    }).then(function (data, textStatus, jqXHR) {
      if (data.status) {
        resolve(data.data)
      } else {
        let error = new Error(data.message)
        reject(error)
      }
    }, function (jqXHR, textStatus, errorThrown) {
      reject(errorThrown)
    })
  })
  return promise
}

export const get = (url, options) => {

  var promise = new Promise(function (resolve, reject) {
    rest.get(url, options).on('complete', function (data, response) {
      if (response.statusCode === 200) {
        if (data.status) {
          resolve(data.data)
        } else {
          let error = new Error(data.message)
          error.response = response
          reject(error)
        }
      } else {
        let error = new Error(response.statusText)
        error.response = response
        reject(error)
      }
    })
  })

  return promise
}


