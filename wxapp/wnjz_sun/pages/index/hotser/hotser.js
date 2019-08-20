var app = getApp(), WxParse = require("../../../../we7/js/wxParse/wxParse.js");

Page({
    data: {
        title: "",
        indicatorDots: !1,
        autoplay: !1,
        interval: 3e3,
        duration: 800,
        hots: [],
        showModalStatus: !1,
        videoSrc: "",
        isIpx: app.globalData.isIpx
    },
    onLoad: function(t) {
        var a = this.data.title;
        10 < a.length && (a = a.substr(0, 10) + "..."), this.setData({
            orderid: t.id
        });
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
        var o = this, e = "";
        app.util.request({
            url: "entry/wxapp/Hotser",
            method: "GET",
            data: {
                id: o.data.orderid
            },
            success: function(t) {
                console.log(t), e = t.data.sele_name, console.log(t.data.sele_name);
                var a = t.data.video;
                o.setData({
                    hots: t.data,
                    videoSrc: a,
                    content: t.data.content.replace(/\<img/gi, '<img style="display:block;" ')
                }), WxParse.wxParse("article", "html", t.data.content, o, 5), wx.setNavigationBarTitle({
                    title: e
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    powerDrawer: function(t) {
        var a = t.currentTarget.dataset.statu;
        this.util(a);
    },
    util: function(t) {
        var a = wx.createAnimation({
            duration: 100,
            timingFunction: "linear",
            delay: 0
        });
        (this.animation = a).opacity(0).height(0).step(), this.setData({
            animationData: a.export()
        }), setTimeout(function() {
            a.opacity(1).height("360rpx").step(), this.setData({
                animationData: a
            }), "close" == t && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == t && this.setData({
            showModalStatus: !0
        });
    },
    toBooks: function(t) {
        wx.navigateTo({
            url: "../classify/classify"
        });
    }
});