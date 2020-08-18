import Mock from 'mockjs';
import loginAPI from './login';
import articleAPI from './article';
import article_tableAPI from './article_table';
import remoteSearchAPI from './remoteSearch';
import carApi from './car'

// 登录相关
Mock.mock(/\/login\/loginbyemail/, 'post', loginAPI.loginByEmail);
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout);
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getInfo)

// // 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList);
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle);

// // table example相关
Mock.mock(/\/article_table\/list/, 'get', article_tableAPI.getList);
Mock.mock(/\/article_table\/p/, 'get', article_tableAPI.getPv);

// // 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser);

Mock.mock(/\/api\/admin\/travelStandard\/car\/admin\/queryAll/, 'get', carApi.queryAll);
Mock.mock(/\/api\/admin\/travelStandard\/car\/queryDetail/, 'get', carApi.queryDetail);
Mock.mock(/\/api\/admin\/travelStandard\/car\/create/, 'post', carApi.create);
Mock.mock(/\/api\/admin\/travelStandard\/car\/edit/, 'post', carApi.edit);
Mock.mock(/\/api\/admin\/travelStandard\/car\/delete/, 'post', carApi.delete);
Mock.mock(/\/api\/admin\/travelStandard\/car\/getAllLevels/, 'get', carApi.getAllLevels);


Mock.mock(/\/api\/admin\/health/, 'get', carApi.health);

export default Mock;
