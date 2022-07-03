export default defineAppConfig({
  pages: [
    'pages/main/index',
    'pagesPersonal/login/index',
    'pagesPersonal/register/index',
    'pagesPersonal/registerResult/index',
    'pagesPersonal/addSocialWorker/index',
    'pagesNotification/notificationList/index',
    'pagesNotification/notificationDetail/index',
    'pagesDocument/documentList/index',
    'pagesDocument/documentSearch/index',
    'pagesDocument/documentDetail/index',
    'pagesDocument/documentForm/index',
    'pagesDocument/documentDraftBox/index',
    'pagesWatchOver/watchOverDetail/index',
    'pagesWatchOver/watchOverDraftBox/index',
    'pagesWatchOver/watchOverForm/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
