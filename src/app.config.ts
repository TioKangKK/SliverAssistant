export default defineAppConfig({
  pages: [
    'pages/main/index',
    'pagesPersonal/login/index',
    'pagesPersonal/register/index',
    'pagesPersonal/registerResult/index',
    'pagesPersonal/addSocialWorker/index',
    'pagesNotification/notificationList/index',
    'pagesNotification/notificationDetail/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
