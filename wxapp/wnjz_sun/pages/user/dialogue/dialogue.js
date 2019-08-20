var app = getApp();

Page({
    data: {
        phone: []
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Aboutus",
            success: function(n) {
                t.setData({
                    phone: n.data.tel
                });
            }
        }), app.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(n) {
                t.setData({
                    shop: n.data
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    dialog: function(n) {
        wx.makePhoneCall({
            phoneNumber: this.data.shop.tel
        });
    }
});