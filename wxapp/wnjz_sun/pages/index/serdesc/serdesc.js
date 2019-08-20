var app = getApp();

Page({
    data: {
        order: [],
        url: [],
        curIndex: 0,
        comment: [],
        imgUrls: [ "http://cgkqd.img48.wal8.com/img48/569611_20170429191245/152202745503.png", "http://cgkqd.img48.wal8.com/img48/569611_20170429191245/152202745488.png", "http://cgkqd.img48.wal8.com/img48/569611_20170429191245/152202745503.png", "http://cgkqd.img48.wal8.com/img48/569611_20170429191245/15220274544.png" ],
        isIpx: app.globalData.isIpx
    },
    onLoad: function(t) {
        this.getUrl(), wx.setNavigationBarColor({
            frontColor: wx.getStorageSync("fontcolor"),
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), this.setData({
            orderid: t.id
        });
    },
    getUrl: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/url",
            cachetime: "30",
            success: function(t) {
                wx.setStorageSync("url", t.data), a.setData({
                    url: t.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Ordercheck",
            method: "GET",
            data: {
                id: a.data.orderid
            },
            success: function(t) {
                console.log(t.data);
                t.data.shopprice;
                a.setData({
                    order: t.data.goods,
                    comment: t.data.comment
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    serviceTap: function(t) {
        var a = parseInt(t.currentTarget.dataset.index);
        this.setData({
            curIndex: a
        });
    },
    toOrder: function(t) {
        var a = t.currentTarget.dataset.gid;
        app.util.request({
            url: "entry/wxapp/CheckGoods",
            method: "GET",
            data: {
                gid: a
            },
            success: function(t) {
                wx.navigateTo({
                    url: "../order/order?id=" + a
                });
            }
        });
    }
});