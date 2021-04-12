import fetch from 'utils/fetch';
import fetch4File from 'utils/fetch4File';
import constant from 'utils/constant';


export function page(query) {
  return fetch({
    url: '/pdfArea/page',
    method: 'get',
    params: query
  })
}

export function addObj(data) {
  return fetch({
    url: '/pdfArea/',
    method: 'post',
    data
  })
}

export function getObj(data) {
  return fetch({
    url: '/pdfArea/'+ data.id,
    method: 'put',
    data
  })
}

export function updateObj(obj) {
  return fetch({
    url: '/pdfArea/' + obj.id,
    method: 'put',
    data: obj
  })
}

export function delObj(id) {
  return fetch({
    url: '/pdfArea/' + id,
    method: 'delete'
  })
}
