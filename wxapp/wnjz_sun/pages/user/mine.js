var _Page;

function _defineProperty(e, a, t) {
  return a in e ? Object.defineProperty(e, a, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[a] = t, e;
}

var app = getApp();

Page((_defineProperty(_Page = {
  data: {
    tabs: ["收藏", "订阅", "浏览"],
    curIdenx: "0",
    all: [],
    allhistory: [],
    allsubscribe: [],
    sh: [],
    url: [],
    status: []
  },
  onLoad: function (e) {
    app.editTabBar();
    var a = this;
    a.getUrl(), wx.getUserInfo({
      success: function (e) {
        a.setData({
          thumb: e.userInfo.avatarUrl,
          nickname: e.userInfo.nickName
        });
      }
    });
    var t = this;
    wx.setNavigationBarColor({
      frontColor: wx.getStorageSync("fontcolor"),
      backgroundColor: wx.getStorageSync("color"),
      animation: {
        duration: 0,
        timingFunc: "easeIn"
      }
    }), app.util.request({
      url: "entry/wxapp/system",
      cachetime: "0",
      success: function (e) {
        "" != e.data.js_tel && null != e.data.js_tel && (t.data.jszc.js_tel = e.data.js_tel),
          "" != e.data.js_name && null != e.data.js_name && (t.data.jszc.js_name = e.data.js_name),
          "" != e.data.js_logo && null != e.data.js_logo && (t.data.jszc.js_logo = e.data.js_logo),
          t.setData({
            shop: e.data,
            jszc: t.data.jszc
          });
      }
    });
  },
  getUrl: function () {
    var a = this;
    app.util.request({
      url: "entry/wxapp/url",
      cachetime: "0",
      success: function (e) {
        wx.setStorageSync("url", e.data), a.setData({
          url: e.data
        });
      }
    });
  },
  onReady: function () { },
  onShow: function () {
    var e = this, t = wx.getStorageSync("build_id"), a = wx.getStorageSync("openid");
    var data = {
      list: [{
        id: 1,
        name: '苹果说明书',
        pic: '/style/images/tab_home.png',
        time: '2019-10-12',
        num: 3,
        oid: 0,
        status: 2,
        orderNum: '00001',
      }, {
        id: 2,
        name: '华为说明书',
        pic: '/style/images/tab_home.png',
        time: '2019-10-12',
        num: 4,
        oid: 3,
        status: 3,
        orderNum: '00003',
      }]
    }
    e.setData({
      allcollect: data.list,
      allsubscribe: data.list,
      // allhistory: data.list
    })


    // app.util.request({
    //   url: "entry/wxapp/Orrde",
    //   cachetime: "0",
    //   method: "GET",
    //   data: {
    //     userid: a,
    //     build_id: t
    //   },
    //   success: function (t) {
    //     e.setData({
    //       // allcollect: t.data.data,
    //       allcollect: data.list,
    //       status: !0
    //     }), e.getdafuwu(), e.getdazhifu(), e.getdaquer(), e.getservices();
    //   }
    // });
  },

  navTab: function (t) {
    var e = t.currentTarget.dataset.index;
    this.setData({
      curIdenx: e
    });
  },
  toBackstage: function () {
    wx.navigateTo({
      url: "../backstage/index2/index2"
    });
  },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },
  toService: function (e) {
    wx.navigateTo({
      url: "service/service"
    });
  }
}), _Page));