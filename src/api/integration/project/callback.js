import fetch from 'utils/fetchCustom';
import constant from 'utils/constant';

export function page(query) {
  return fetch({
    customUrl: constant.integration_platform_url,
    url: '/integration/project/callback/list',
    method: 'post',
    data: query
  });
}

export function addObj(obj) {
  console.log("3");
  console.log(obj.callbackUrl);
  console.log(obj.service);
  console.log(obj.clientId);
  console.log(obj.type);
  console.log(obj);
  return fetch({
    customUrl: constant.integration_platform_url,
    url: '/integration/project/callback/add',
    method: 'post',
    data: obj
  });
}

export function getObj(projectId) {
  return fetch({
    customUrl: constant.integration_platform_url,
    url: '/integration/project/callback/get?projectId=' + projectId,
    method: 'get'
  });
}



export function delObj(data) {
  return fetch({
    customUrl: constant.integration_platform_url,
    url: '/integration/project/callback/delete',
    method: 'delete',
    params: data
  })
}

export function updateObj(obj) {
  return fetch({
    customUrl: constant.integration_platform_url,
    url: '/integration/project/callback/update',
    method: 'post',
    data: obj
  })
}
