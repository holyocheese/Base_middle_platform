import fetch from 'utils/fetch';
import fetch4File from 'utils/fetch4File';
import constant from 'utils/constant';


export function page(query) {
  return fetch({
    url: '/pdf/page',
    method: 'get',
    params: query
  })
}

export function addObj(data) {
  return fetch({
    url: '/pdf/',
    method: 'post',
    data
  })
}

export function getObj(data) {
  return fetch({
    url: '/pdf/'+ data.id,
    method: 'put',
    data
  })
}

export function updateObj(obj) {
  return fetch({
    url: '/pdf/' + obj.id,
    method: 'put',
    data: obj
  })
}

export function delObj(id) {
  return fetch({
    url: '/pdf/' + id,
    method: 'delete'
  })
}

export function uploadFile(obj) {
  return fetch({
    url: '/pdf/uploadApp',
    method: 'post',
    data: obj,
    headers: { 'Content-Type': 'multipart/form-data' },
    isUpload: true
  })
}
