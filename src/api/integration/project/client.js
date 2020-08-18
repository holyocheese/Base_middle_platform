import fetch from 'utils/fetchCustom';
import constant from 'utils/constant';

export function page(query) {
  return fetch({
    customUrl: constant.integration_platform_url,
    url: '/integration/project/client/list',
    method: 'post',
    data: query
  });
}

export function addObj(obj) {
  return fetch({
    customUrl: constant.integration_platform_url,
    url: '/integration/project/client/add',
    method: 'post',
    data: obj
  });
}

export function getObj(projectId) {
  return fetch({
    customUrl: constant.integration_platform_url,
    url: '/integration/project/client/get?projectId=' + projectId,
    method: 'get'
  });
}



export function delObj(obj) {
  return fetch({
    customUrl: constant.integration_platform_url,
    url: '/integration/project/client/delete',
    method: 'delete',
    data: obj
  })
}

export function updateObj(obj) {
  return fetch({
    customUrl: constant.integration_platform_url,
    url: '/integration/project/client/update',
    method: 'post',
    data: obj
  })
}
