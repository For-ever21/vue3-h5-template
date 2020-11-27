import { resultSuccess } from '../_util';

const userInfo = {
  name: 'krystal',
  userid: '00000001',
  email: 'antdesign@alipay.com',
  signature: '海纳百川，有容乃大',
  introduction: 'asdadadad',
  title: '交互专家',
  notifyCount: 12,
  unreadCount: 11,
  country: 'China',
  address: '厦门市 77 号',
  phone: '0592-268888888',
}

module.exports = [
  {
    url: "/user/info",
    methods: "get",
    response: () => {
      return resultSuccess(userInfo);
    }
  }
]