// detail.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: true,
    loading: false
  },
  setDisabled: function (e) {
    this.setData({
      disabled: !this.data.disabled
    })
  },
  setPlain: function (e) {
    this.setData({
      plain: !this.data.plain
    })
  },
  setLoading: function (e) {
    this.setData({
      loading: !this.data.loading
    })
  },
  makePhoneCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.id
      // phoneNumber: '18638965715'
    })
  },
  primary: function (e) {
    var titW = e.currentTarget.dataset.text
    wx.navigateTo({
      url: "../xinxi/xinxi?titW=" + titW
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //判断Did是否为undefined  请求获取上边列表的数据
    var bid = options.id;
    // console.log(options)
    if (bid !== undefined) {
      var tit = options.model;
      wx.setNavigationBarTitle({ title: tit })
      //首页上边列表 请求数据 
      wx.request({
        url: 'https://zzbji.chuangkegf.com/zzbj/public/index.php/api/server/index?uid=2&cate_id=' + bid,
        data: {
        },
        success: function (obj) {
          //  console.log(obj)         
          that.setData({
            array: obj.data.data
          })
        }
      })
    }

    //判断Did是否为undefined  请求获取下边列表的数据
    var Did = options.mid;
    if (Did !== undefined) {
      //请求数据 
      wx.request({
        url: 'https://zzbji.chuangkegf.com/zzbj/public/index.php/api/server/servermess?sid=' + Did,
        data: {
        },
        success: function (res) {
          wx.setNavigationBarTitle({ title: res.data.data[0].cate_name })
          that.setData({
            array: res.data.data
          })
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
