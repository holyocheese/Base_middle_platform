import fetch from 'utils/fetch';
import constant from 'utils/constant';


export function selectGeneralConfigCategoryList() {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/general/getGeneralConfigCategoryList',
    method: 'get'
  })
}

export function getGeneralConfiguratioList(query) {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/general/getGeneralConfigurationList?categoryId=' + query,
    method: 'get'
  })
}

export function selectGeneralConfigurationMapping(query) {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/general/getGeneralConfigurationMappingList?generalConfigurationIds=' + query,
    method: 'get'
  })
}

export function saveGeneralConfiguration(query) {
  return fetch({
    customUrl: constant.hotel_base_url,
    url: '/general/saveGeneralConfiguration',
    method: 'post',
    data: query
  })
}
