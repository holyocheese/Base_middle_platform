import fetch from 'utils/fetch';
import fetch4File from 'utils/fetch4File';
import constant from 'utils/constant';


export function page(query) {
  return fetch({
    url: '/pdfLinedata/page',
    method: 'get',
    params: query
  })
}

export function addObj(data) {
  return fetch({
    url: '/pdfLinedata/',
    method: 'post',
    data
  })
}

export function getObj(data) {
  return fetch({
    url: '/pdfLinedata/'+ data.id,
    method: 'put',
    data
  })
}

export function updateObj(obj) {
  return fetch({
    url: '/pdfLinedata/' + obj.id,
    method: 'put',
    data: obj
  })
}

export function delObj(id) {
  return fetch({
    url: '/pdfLinedata/' + id,
    method: 'delete'
  })
}

export function getPdfLinedataByPdfId(query) {
  return fetch({
    url: '/pdfLinedata/pdfList',
    method: 'get',
    params: query
  })
}

export function getTableJsonById(query) {
  return fetch({
    url: '/pdfLinedata/getTableJson',
    method: 'get',
    params: query
  })
}

export function getTableJsonByIdAndArea(data) {
  return fetch({
    url: `/pdfLinedata/getTableJsonByArea?id=${data.pdfId}`,
    method: 'post',
    data
  })
}
