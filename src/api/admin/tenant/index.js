import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/admin/tenant/page',
    method: 'post',
    data: query
  });
}

export function pageAll(query) {
  return fetch({
    url: '/api/admin/tenant/pageAll',
    method: 'post',
    data: query
  });
}

export function page4out(query) {
  return fetch({
    url: '/api/admin/tenant/pageAll',
    method: 'post',
    data: query
  });
}

export function listTenants() {
  return fetch({
    url: '/api/admin/tenant/listTenants',
    method: 'get'
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/tenant/add',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/tenant/info/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/tenant/delete/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/tenant/update/' + id,
    method: 'put',
    data: obj
  })
}
