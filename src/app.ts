import { Component } from 'react'

import { getPhone, login } from '@/service/index';
import { redirectTo } from '@/utils/navigator';

import './app.less'
import { showToast } from './utils/toast';
import { delay } from './utils';

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  async onLaunch() {
    const phone = getPhone()
    if (!phone) {
      showToast('用户尚未登录，请先登录')
      await delay(1000);
      redirectTo('/pagesPersonal/login/index')
      return;
    }
    await login({ phone })
  }

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
