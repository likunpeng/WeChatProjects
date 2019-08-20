var app = getApp();

function count_down(t, a, e) {
    parseInt(e);
    var n = t.data.bargainList, i = a - Date.parse(new Date());
    if (n[e].clock = date_format(i), i <= 0) return n[e].clock = "已经截止", void t.setData({
        bargainList: n
    });
    setTimeout(function() {
        i -= 100, count_down(t, t.data.bargainList[e].endTime, e);
    }, 100), t.setData({
        bargainList: n
    });
}

function date_format(t) {
    var a = Math.floor(t / 1e3), e = Math.floor(a / 3600 / 24), n = Math.floor((a - 60 * e * 60 * 24) / 3600), i = Math.floor(a / 3600), o = fill_zero_prefix(Math.floor((a - 3600 * i) / 60));
    return "距离结束还剩：" + e + "天" + n + "时" + o + "分" + fill_zero_prefix(a - 3600 * i - 60 * o) + "秒";
}

function fill_zero_prefix(t) {
    return t < 10 ? "0" + t : t;
}

Page({
    data: {
        order: [],
        kanjia: [],
        url: [],
        showModalStatus: !1,
        imgsrc: "http://cgkqd.img48.wal8.com/img48/569611_20170429191245/152178548159.png",
        title: "日式精细擦窗",
        price: "100",
        minPrice: "68",
        surplus: "100",
        startTime: "2017-12-12 00:00:00",
        endTime: "2018-01-12 00:00:00",
        imgArr: [ "http://cgkqd.img48.wal8.com/img48/569611_20170429191245/152084048151.png", "http://cgkqd.img48.wal8.com/img48/569611_20170429191245/152084048161.png" ],
        bargainList: [ {
            endTime: "1523519898765",
            clock: ""
        } ],
        isIpx: app.globalData.isIpx
    },
    onLoad: function(t) {
        var a = (e = this).data.bargainList;
        wx.setStorageSync("kanjiaid", t.id), wx.getUserInfo({
            success: function(t) {
                e.setData({
                    thumb: t.userInfo.avatarUrl,
                    nickname: t.userInfo.nickName
                });
            }
        }), a.endTime = [ {
            antime: "1521863868099",
            astime: "2018-03-23 00:00:00",
            content: "321",
            createtime: "1521790326",
            hits: "0",
            id: "45",
            num: "2",
            sort: "3",
            status: "1",
            titl: "时间"
        } ].antime, e.setData({
            bargainList: a,
            id: t.id
        }), count_down(this, this.data.bargainList[0].endTime, 0);
        var e = this;
        wx.setNavigationBarColor({
            frontColor: wx.getStorageSync("fontcolor"),
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        e.data.id, wx.getStorageSync("openid");
    },
    onReady: function() {},
    onShow: function() {
        var e = this, t = e.data.id, a = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/kanzhu",
            data: {
                id: t,
                openid: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    kanzhu: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/kanjiade",
            method: "GET",
            data: {
                id: e.data.id
            },
            success: function(t) {
                console.log(t), e.setData({
                    order: t.data
                }), e.getUrl();
            }
        }), console.log(e.data.id);
        a = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/iskanjia",
            data: {
                id: e.data.id,
                openid: a
            },
            success: function(t) {
                console.log(t);
                var a = t.data.status;
                e.setData({
                    join: a
                });
            }
        }), app.util.request({
            url: "entry/wxapp/HelpFriends",
            data: {
                id: e.data.id,
                openid: a
            },
            success: function(t) {
                console.log(t.data), e.setData({
                    friend: t.data
                });
            }
        });
    },
    getUrl: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/url",
            cachetime: "0",
            success: function(t) {
                wx.setStorageSync("url", t.data), a.setData({
                    url: t.data
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    order: function(t) {
        console.log(t);
        var a = t.target.dataset.id, e = t.target.dataset.price, n = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/isBuyKjgoods",
            cachetime: "0",
            data: {
                id: a,
                openid: n
            },
            success: function(t) {
                1 == t.data ? wx.showToast({
                    title: "您已购买过该商品！",
                    icon: "none",
                    duration: 2e3
                }) : wx.navigateTo({
                    url: "../cforder/cforder?id=" + a + "&price=" + e
                });
            }
        });
    },
    bargain: function(t) {},
    gokanjiadetails: function(t) {
        var a = wx.getStorageSync("openid"), e = wx.getStorageSync("kanjiaid");
        wx.navigateTo({
            url: "/wnjz_sun/pages/bargain/help/help?id=" + e + "&openid=" + a
        });
    },
    onShareAppMessage: function(t) {
        var a = wx.getStorageSync("openid"), e = wx.getStorageSync("kanjiaid"), n = wx.getStorageSync("system");
        return console.log(n), "button" === t.from && console.log(t.target), {
            title: n.share_title,
            path: "wnjz_sun/pages/bargain/help/help?id=" + e + "&openid=" + a,
            success: function(t) {
                console.log("转发成功");
            },
            fail: function(t) {
                console.log("转发失败");
            }
        };
    },
    powerDrawer: function(t) {
        var a = this, e = t.currentTarget.dataset.statu;
        a.util(e);
        var n = t.currentTarget.dataset.join;
        if (a.setData({
            join: n
        }), "open" == e) {
            var i = t.currentTarget.dataset.id, o = wx.getStorageSync("openid");
            console.log(o), console.log(o), app.util.request({
                url: "entry/wxapp/Kanjiaorder",
                data: {
                    id: i,
                    openid: o
                },
                success: function(t) {
                    console.log(t), a.setData({
                        kanjia: t.data
                    }), a.onShow();
                }
            });
        }
    },
    util: function(t) {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        (this.animation = a).opacity(0).height(0).step(), this.setData({
            animationData: a.export()
        }), setTimeout(function() {
            a.opacity(1).height("488rpx").step(), this.setData({
                animationData: a
            }), "close" == t && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == t && this.setData({
            showModalStatus: !0
        });
    },
    help: function(t) {
        wx.updateShareMenu({
            withShareTicket: !0,
            success: function() {}
        });
    },
    toIndex: function(t) {
        wx.reLaunch({
            url: "../../index/index"
        });
    }
});