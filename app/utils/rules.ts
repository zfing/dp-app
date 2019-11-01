import { pick } from 'ramda'

export const rules = {
  account: {
    // format: /^(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*|\d{1,})$/,
    format: {
      pattern: /^(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*|\d{1,})$/,
      message: "账号格式有误"
    }
  },
  email: {
    format: {
      pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      message: '邮箱格式有误',
    }
  },
  phone: {
    format: {
      pattern: /^\d{1,}$/,
      message: '手机号格式有误',
    }
  },
  password: {
    type: 'password',
  },
  validateCode: {
    format: {
      pattern: /^\d{6}$/,
      message: '验证码格式有误',
    },
  },
  apikey: {
    presence: {
      allowEmpty: false
    }
  },
  apisecret: {
    presence: {
      allowEmpty: false
    }
  },
}

export function getRules(keys: string[]) {
  return pick(keys, rules)
}
