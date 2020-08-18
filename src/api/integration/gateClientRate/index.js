import fetch from 'utils/fetch';
import constant from 'utils/constant';

export function page(query) {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/yfgate/gateClientRate/page',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/yfgate/gateClientRate',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/yfgate/gateClientRate/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/yfgate/gateClientRate/' + id,
    method: 'delete'
  })
}

export function updateObj(obj) {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/yfgate/gateClientRate/' + obj.id,
    method: 'put',
    data: obj
  })
}
