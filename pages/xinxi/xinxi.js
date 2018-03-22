Page({
  data: {
    motto: 'Hello World',
    userInfo: {},

  },
  //事件处理函数
  todetail: function () {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  onLoad: function (options) {
    var title = options.titW;
    wx.setNavigationBarTitle({ title: title })

  },

  formSubmit: function (e) {
    var that = this;
    // var tokend = wx.getStorageSync('tokend')
    console.log(e)

    //获取input初始值
    var userName = e.detail.value.userName;
    var ID_num2 = e.detail.value.phoneNum;
    var needing = e.detail.value.needing;
    var addName = e.detail.value.addName;

    if (userName.length == 0 || ID_num2.length == 0 || needing.length == 0 || addName.length == 0) {
      wx.showToast({
        title: '输入框不能为空',
        // iconType:'warn',
        image: '../../image/fail.png',
        duration: 2000
      })
      return false;
    } else {
      var myreg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (!myreg.test(ID_num2)) {
        wx.showToast({
          title: '手机号有误！',
          image: '../../image/fail.png',
          duration: 1500
        })
        return false;
      } else {
        //获取接口，上传数据数据
        wx.request({
          method: 'POST',
          url: 'https://zzbji.chuangkegf.com/zzbj/public/index.php/sub_server/add?uid=2', //接口地址
          data: {
            subname: userName,
            phone: ID_num2,
            server: needing,
            address: addName
          },
          header: { 'content-type': 'application/json' },
          success: function (res) {
             console.log(res)

            wx.showToast({
              title: '预约成功',
              image: '../../image/success.png',
              duration: 1500
            })

            setTimeout(function () {
              wx.reLaunch({
                url: '../index/index',
              })
            }, 2000)
          },
          fail: function (res) {
            console.log('cuowu' + ':' + res)
          }
        })

      }

    }

  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  }
})





