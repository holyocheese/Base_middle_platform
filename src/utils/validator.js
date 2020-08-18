/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

// 验证是否整数
export function isInteger(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数'));
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/;
      const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error('请输入正整数'));
      } else {
        callback();
      }
    }
  }, 1000);
}


// 验证是否是[0-1]的小数
export function isDecimal(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入数字'));
    } else {
      if (value < 0 || value > 1) {
        callback(new Error('请输入[0,1]之间的数字'));
      } else {
        callback();
      }
    }
  }, 1000);
}

// 验证端口是否在[0,65535]之间
export function isPort(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (value == '' || typeof value == undefined) {
      callback(new Error('请输入端口值'));
    } else {
      const re = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
      const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error('请输入在[0-65535]之间的端口值'));
      } else {
        callback();
      }
    }
  }, 1000);
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

// 验证固话
export function validatePhone(rule, value, callback) {
  if (value === '') {
    callback(new Error('机构电话不可为空'));
  } else {
    if (value !== '') {
      const reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
      if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号或者座机号格式为：0000-0000000'));
      }
    }
    callback();
  }
}

// 验证邮箱
export function validateEmail(rule, value, callback) {
  if (value === '') {
    callback(new Error('请正确填写邮箱'));
  } else {
    if (value !== '') {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(value)) {
        callback(new Error('请输入有效的邮箱'));
      }
    }
    callback();
  }
}

export function validateEmailAllowNull(rule, value, callback) {
  if (value !== '' && value) {
    const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!reg.test(value)) {
      callback(new Error('请输入有效的邮箱'));
    }
  }
}

// 验证手机
export function validateMobilePhone(rule, value, callback) {
  if (value === '') {
    callback(new Error('负责人手机号不可为空'));
  } else {
    if (value !== '') {
      // var reg = /^1[3456789]\d{9}$/;
      const reg = /^[1]\d{10}$/;
      if (!reg.test(value)) {
        callback(new Error('请输入有效的手机号码'));
      }
    }
    callback();
  }
}

// 验证密码
export function validatePass(rule, value, callback) {
  if (value === '') {
    callback(new Error('请设置正确格式的密码'));
  } else if (value.length < 6) {
    callback(new Error('密码长度最小6位'));
  } else {
    callback();
  }
}
