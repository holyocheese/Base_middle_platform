import Mock from 'mockjs';


const base = {
  status: 200,
  message: 'ok',
};

function sleep(d) {
  // for (let t = Date.now(); Date.now() - t <= d;) ;
}

const getlist = function () {
  sleep(1000);
  const count = 10;
  let List = [];
  for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
      id: '@id',
      'ruleName|1': ['早上', '晚上', '加班中'],
      'useTime|1': ['1', '2', '3', '4'],
      'carType|1': ['1', '2', '3', '4'],

      'orderType|1': ['1', '2', '3', '4'],
      crtTime: '@datetime',
      modTime: '@datetime',

      'ruleType|1': [1, 2, 3, 4, 5],
    }));
  }
  return List;
};


export default {
  queryAll: () => {
    base.data = getlist();
    return base;
  },

  queryDetail: (id) => {
    base.data = Mock.mock({
      id: 1,
      'ruleName|1': ['早上', '晚上', '加班中'],
      'useTime|1': ['1', '2'],
      'carType|1': '1,2,3',
      'orderType': '1,2,3',
      crtTime: '@datetime',
      modTime: '@datetime',
      'ruleType': 1,
      costMonthly: 10,
      costDaily: 0,
      costSingle: 90,
      levelIds: [1, 2, 3]
    });
    return base;
  },
  create: () => {
    base.data = Mock.mock('@id');
    return base;
    // return {status: 400, message: 'fail'};
  },
  edit: () => {
    base.data = Mock.mock('@id');
    return base;
  },
  delete: id => base,
  getAllLevels: () => {
    base.data = [
      {id: 1, 'name': '经理'},
      {id: 2, 'name': '董事长'},
      {id: 3, 'name': '闲杂人等'}
    ];

    return base;
  },
  health() {
    base.data = 'up';
    return 'up';
  }
}
