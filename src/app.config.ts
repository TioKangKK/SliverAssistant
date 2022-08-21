export default defineAppConfig({
  pages: [
    'pages/main/index',
    'pages/blank/index',
  ],
  subPackages: [
    {
      root: "pagesPersonal",
      pages: [
        "login/index",
        "register/index",
        "registerResult/index",
        "addSocialWorker/index",
      ]
    },
    {
      root: "pagesNotification",
      pages: [
        'notificationList/index',
        'notificationRegister/index',
        'notificationDocument/index',
        'notificationWatchOver/index',
      ]
    },
    {
      root: "pagesDocument",
      pages: [
        'documentList/index',
        'documentSearch/index',
        'documentProfile/index',
        'documentDetail/index',
        'documentForm/index',
        'documentDraftBox/index',
      ]
    },
    {
      root: "pagesWatchOver",
      pages: [
        'watchOverDetail/index',
        'watchOverDraftBox/index',
        'watchOverForm/index',
      ],
    },
    {
      root: "pagesGroups",
      pages: [
        'volunteerList/index',
        'groupList/index',
        'groupForm/index',
        'groupMember/index',
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
