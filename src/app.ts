import { Component } from 'react'

import { getCloudId, login } from '@/service/index';
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
    const cloudId = getCloudId()
    if (!cloudId) {
      showToast('用户尚未登录，请先登录')
      await delay(1000);
      redirectTo('/pagesPersonal/login/index')
      return;
    }
    await login({ cloudId })
  }

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
