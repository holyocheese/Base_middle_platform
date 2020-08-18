import fetch from 'utils/fetch';

export function logger(obj) {
  return fetch({
    url: '/logBack/logger',
    method: 'get',
    params: obj
  })
}

export function loggerByPath(obj) {
  return fetch({
    url: '/logBack/loggerByPath',
    method: 'get',
    params: obj
  })
}

export function downloadLog(obj) {
  return fetch({
    url: '/logBack/downloadByLevel',
    method: 'get',
    params: obj,
    responseType: 'blob'
  })
}


