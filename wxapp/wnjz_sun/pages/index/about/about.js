var app = getApp();

Page({
    data: {
        aboutsdd: [],
        url: [],
        indicatorDots: !1,
        autoplay: !1,
        interval: 3e3,
        duration: 800,
        isIpx: app.globalData.isIpx
    },
    onLoad: function(t) {
        wx.setNavigationBarColor({
            frontColor: wx.getStorageSync("fontcolor"),
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Aboutus",
            success: function(t) {
                o.setData({
                    aboutsdd: t.data
                }), o.getUrl();
            }
        });
    },
    getUrl: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/url",
            cachetime: "0",
            success: function(t) {
                wx.setStorageSync("url", t.data), o.setData({
                    url: t.data
                });
            }
        });
    },
    dialogYZ: function(t) {
        wx.makePhoneCall({
            phoneNumber: this.data.aboutsdd.tel
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    dialog: function(t) {
        wx.makePhoneCall({
            phoneNumber: this.data.phone
        });
    }
});