import fetch from 'utils/fetch';
import constant from 'utils/constant';

export function page(query) {
  return fetch({
    customUrl: constant.integration_platform_url,
    url: '/integration/project/service/list',
    method: 'post',
    data: query
  });
}

export function addObj(obj) {
  return fetch({
    customUrl: constant.integration_platform_url,
    url: '/integration/project/service/add',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    customUrl: constant.integration_platform_url,
    url: '/integration/project/service/get?id=' + id,
    method: 'get'
  });
}



export function delObj(data) {
  return fetch({
    customUrl: constant.integration_platform_url,
    url: '/integration/project/service/delete',
    method: 'delete',
    params: data
  })
}

export function updateObj(obj) {
  return fetch({
    customUrl: constant.integration_platform_url,
    url: '/integration/project/service/update',
    method: 'post',
    data: obj
  })
}
