//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    name: 123456,  
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
 // 点击上边列表进入detail
  todetail: function (e) {  
    var uuid = e.currentTarget.id;
    var title = e.currentTarget.dataset.text
    // var app = getApp();
    // app.requestDetailids = uuid;
    wx.navigateTo({
      url: '../detail/detail?model='+title+'&id='+uuid
    })
  },
  onLoad: function () {
    var that = this;
    // 上边分类列表
    wx.request({
      url: 'https://zzbji.chuangkegf.com/zzbj/public/index.php/api/Server/category',
      data: '',
      header: {
        'content-type': 'application/json '
      },
      success: function (data) {
        console.log(data)
        that.setData({
          topList: data.data.data
        })
      }
    })

    // 下边商品列表
    wx.request({
      url: 'https://zzbji.chuangkegf.com/zzbj/public/index.php/api/server/nearserver?uid=2',
      data: {
      },
      success: function (res) {
        // console.log(res.data.data)
        that.setData({
          array1: res.data.data
        })
      }
    })

  },
  // 点击下边列表进入detail
  toPagetwo: function (e) {
    //获取id----index值
    var id = e.currentTarget.id;   
    var name = e.currentTarget.dataset.text   
    wx.navigateTo({
      url: '../detail/detail?mid=' + id
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
