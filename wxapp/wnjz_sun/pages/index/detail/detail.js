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
    navTile: "详情",
    isIpx: app.globalData.isIpx,
    open_distribution: true,
    thumb: "/style/images/bg_detail.jpeg",
  },
  onLoad: function (e) {
    app.editTabBar();
    var a = this;
    wx.setNavigationBarTitle({
      title: a.data.navTile
    })
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
    }), app.util.request({
      url: "entry/wxapp/Plugin",
      data: {
        type: 1
      },
      showLoading: !1,
      success: function (e) {
        var a = 2 != e.data && e.data;
        console.log("分销"), console.log(e.data), t.setData({
          open_distribution: a
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
    var t = this, e = wx.getStorageSync("openid"), a = wx.getStorageSync("build_id");
    app.util.request({
      url: "entry/wxapp/Countcounp",
      method: "GET",
      data: {
        userid: e,
        build_id: a
      },
      success: function (e) {
        var a = e.data.length;
        t.setData({
          cardnum: a
        }), t.Moneys();
      }
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
  },
  toAddress: function (e) {
    wx.navigateTo({
      url: "address/address"
    });
  }
}, "toBackstage", function (e) {
  wx.navigateTo({
    url: "../backstage/backstage"
  });
}), _defineProperty(_Page, "toDialogue", function (e) {
  wx.navigateTo({
    url: "dialogue/dialogue"
  });
}), _defineProperty(_Page, "toBgorder", function (e) {
  wx.navigateTo({
    url: "bgorder/bgorder"
  });
}), _defineProperty(_Page, "toRecharge", function (e) {
  wx.navigateTo({
    url: "recharge/recharge"
  });
}), _defineProperty(_Page, "toBargain", function (e) {
  wx.navigateTo({
    url: "bargain/bargain"
  });
}), _defineProperty(_Page, "toCards", function (e) {
  wx.navigateTo({
    url: "cards/cards"
  });
}), _defineProperty(_Page, "dialogYZ", function (e) {
  wx.makePhoneCall({
    phoneNumber: this.data.shop.js_tel
  });
}), _defineProperty(_Page, "toAddress", function () {
  var a = this;
  wx.chooseAddress({
    success: function (e) {
      console.log(e), console.log("获取地址成功"), a.setData({
        address: e,
        hasAddress: !0
      });
    },
    fail: function (e) {
      console.log("获取地址失败");
    }
  });
}), _defineProperty(_Page, "toMybill", function (e) {
  wx.navigateTo({
    url: "mybill/mybill"
  });
}), _defineProperty(_Page, "toFxCenter", function (e) {
  this.data.open_distribution;
  var a = wx.getStorageSync("openid"), t = e.detail.formId, n = wx.getStorageSync("users");
  app.util.request({
    url: "entry/wxapp/IsPromoter",
    data: {
      openid: a,
      form_id: t,
      uid: n.id,
      status: 3,
      m: app.globalData.Plugin_distribution
    },
    showLoading: !1,
    success: function (e) {
      e && 9 != e.data ? 0 == e.data ? wx.navigateTo({
        url: "/wnjz_sun/plugin/distribution/fxAddShare/fxAddShare"
      }) : wx.navigateTo({
        url: "/wnjz_sun/plugin/distribution/fxCenter/fxCenter"
      }) : wx.navigateTo({
        url: "/wnjz_sun/plugin/distribution/fxAddShare/fxAddShare"
      });
    }
  });
}), _Page));