import fetch from 'utils/fetch';
import constant from 'utils/constant';

export function page(query) {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/yfgate/gateClientService/pageByClientId',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/yfgate/gateClientService',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/yfgate/gateClientService/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/yfgate/gateClientService/' + id,
    method: 'delete'
  })
}

export function updateObj(obj) {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/yfgate/gateClientService/' + obj.id,
    method: 'put',
    data: obj
  })
}

export function addService(id,obj) {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/yfgate/gateClientService/addService/' + id,
    method: 'put',
    params: obj
  })
}
