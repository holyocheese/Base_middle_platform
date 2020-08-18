import fetch from 'utils/fetch';
import constant from 'utils/constant';

export function page(query) {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/yfgate/gateClient/page',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/yfgate/gateClient',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/yfgate/gateClient/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/yfgate/gateClient/' + id,
    method: 'delete'
  })
}

export function updateObj(obj) {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/yfgate/gateClient/' + obj.id,
    method: 'put',
    data: obj
  })
}
