var app = getApp(), tool = require("../../../../style/utils/tools.js");

Page({
    data: {
        price: "",
        pronum: "",
        totalprice: "",
        index: "1",
        multiArray: [],
        ispay: !0,
        url: [],
        order: [],
        hasAddress: !1,
        address: [],
        multiIndex: [ 0, 0 ],
        showtime: "false",
        showModalStatus: !1,
        cardstu: !1,
        cardsprice: "",
        flag: "true",
        cards: [],
        id: "",
        shopprice: "",
        choose: [ {
            name: "微信",
            value: "微信支付",
            icon: "../../../../style/images/wx.png"
        }, {
            name: "余额",
            value: "余额支付",
            icon: "../../../../style/images/local.png"
        } ],
        payStatus: !1,
        isIpx: app.globalData.isIpx
    },
    onLoad: function(s) {
        var r = this;
        console.log(s), wx.setStorageSync("orderid", s.id), r.getTotalPrice(), r.getUrl(), 
        app.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                for (var a = parseInt(t.data.valb), e = parseInt(t.data.valc), o = tool.formatTime(new Date()), i = [], n = a; n <= e; n++) i.push(n + ":00"), 
                i.push(n + ":30");
                o[1] = i, r.setData({
                    multiArray: o,
                    orderid: s.id
                });
            }
        }), wx.setNavigationBarColor({
            frontColor: wx.getStorageSync("fontcolor"),
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var t = s.id;
        r = this;
        app.util.request({
            url: "entry/wxapp/Ordercheck",
            method: "GET",
            data: {
                id: t
            },
            success: function(t) {
                var a = t.data.goods.shopprice, e = a, o = t.data.goods, i = void 0, n = r.data.index;
                i = 0 < parseInt(o.startbuy) ? 1 < n ? n : parseInt(o.startbuy) : n, r.setData({
                    order: o,
                    totalprice: a,
                    currprice: e,
                    shopprice: t.data.goods.shopprice,
                    index: i
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        this.conutt();
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
    conutt: function() {
        var t = wx.getStorageSync("openid"), a = wx.getStorageSync("build_id"), e = this;
        app.util.request({
            url: "entry/wxapp/CounpPay",
            cachetime: "20",
            method: "GET",
            data: {
                userid: t,
                build_id: a
            },
            success: function(t) {
                console.log(t.data), e.setData({
                    cards: t.data
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    addNum: function(t) {
        var a = this, e = t.currentTarget.dataset.index, o = parseInt(e) + 1, i = a.data.shopprice, n = a.data.order, s = parseInt(n.endbuy);
        if (0 < s && s < o) return wx.showToast({
            title: "该商品限购" + s + "份",
            icon: "none"
        }), !1;
        if (console.log(i), null != a.data.counp_index) var r = a.data.cards[a.data.counp_index].val; else r = 0;
        if (100 < o && (o = 99), r) var c = i * o - r; else c = i * o;
        var d = (i * o).toFixed(2);
        this.setData({
            index: o,
            totalprice: d,
            currprice: c
        });
    },
    reduceNum: function(t) {
        var a = this, e = t.currentTarget.dataset.index, o = parseInt(e) - 1, i = a.data.order, n = parseInt(i.startbuy);
        if (0 < n && o < n) return wx.showToast({
            title: "该商品" + n + "份起购",
            icon: "none"
        }), !1;
        var s = a.data.shopprice;
        if (null != a.data.counp_index) var r = a.data.cards[a.data.counp_index].val; else r = 0;
        o < 1 && (o = 1);
        var c = (s * o).toFixed(2);
        if (0 < r) if (a.data.cards[a.data.counp_index].vab > c) {
            this.setData({
                cardsprice: "",
                cardstu: !1,
                cid: 0,
                counp_index: void 0
            });
            var d = c;
        } else d = s * o - r; else d = s * o;
        this.setData({
            index: o,
            totalprice: c,
            currprice: d
        });
    },
    getTotalPrice: function() {
        var t = parseInt(this.data.index), a = this.data.shopprice, e = parseInt(a) * t;
        this.setData({
            totalprice: e
        });
    },
    bindMultiPickerColumnChange: function(t) {
        var a = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        a.multiIndex[t.detail.column] = t.detail.value, this.setData(a), 0 == t.detail.value ? this.setData({
            showtime: !1
        }) : this.setData({
            showtime: !0
        });
    },
    powerDrawer: function(t) {
        var a = t.currentTarget.dataset.statu;
        this.util(a);
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
            a.opacity(1).height(300).step(), this.setData({
                animationData: a
            }), "close" == t && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == t && this.setData({
            showModalStatus: !0
        });
    },
    coupon: function(t) {
        var a = parseFloat(t.currentTarget.dataset.curprice), e = parseFloat(t.currentTarget.dataset.price), o = t.currentTarget.dataset.cid, i = t.currentTarget.dataset.index, n = this.data.totalprice;
        if (console.log(n), console.log(e), n < e) return wx.showToast({
            title: "购买商品需满" + e + "元才能使用该优惠券",
            icon: "none"
        }), !1;
        n = (n - a).toFixed(2), this.setData({
            cardsprice: a,
            cardstu: !0,
            currprice: n,
            cid: o,
            counp_index: i
        }), this.util("close");
    },
    formSubmit: function(t) {
        console.log(t);
        var a = "", e = "", o = !0, i = this, n = wx.getStorageSync("build_id");
        console.log(n);
        var s = i.data.payType, r = i.data.cid, c = i.data.shopprice * i.data.index;
        if (r ? c -= i.data.cards[i.data.counp_index].val : c = c, 0 == i.data.ispay) return !1;
        i.setData({
            ispay: !1
        });
        var d = t.detail.value.gid, l = t.detail.value.num, u = t.detail.value.time, p = t.detail.value.name, h = t.detail.value.tel, g = t.detail.value.count, y = t.detail.value.city, f = t.detail.value.detai, x = t.detail.value.province, m = t.detail.value.remark, w = wx.getStorageSync("openid");
        if (100 < t.detail.value.num) a = "数量不得超过100"; else if (" " == t.detail.value.time || 0 == i.data.showtime) a = "请选择服务时间"; else if ("" == t.detail.value.name) a = "请填写地址", 
        i.setData({
            ispay: !0
        }); else if (null == this.data.payType || "" == this.data.payType) a = "请选择支付方式"; else {
            if (o = "false", console.log(l + "----" + i.data.order.startbuy), parseInt(l) < parseInt(i.data.order.startbuy) && (console.log(11111111111), 
            null != i.data.order.startbuy && "" != i.data.order.startbuy && 0 != i.data.order.startbuy)) return console.log(222222222), 
            void wx.showModal({
                title: "提示",
                content: "该商品起购为" + i.data.order.startbuy + "个!",
                showCancel: !1
            });
            if (parseInt(l) > parseInt(i.data.order.endbuy) && null != i.data.order.endbuy && "" != i.data.order.endbuy && 0 != i.data.order.endbuy) return void wx.showModal({
                title: "提示",
                content: "该商品限购" + i.data.order.endbuy + "个!",
                showCancel: !1
            });
            app.util.request({
                url: "entry/wxapp/Addorders",
                data: {
                    cid: r,
                    totalprice: c,
                    gid: d,
                    num: l,
                    time: u,
                    cityName: y,
                    detailInfo: f,
                    telNumber: h,
                    countyName: g,
                    name: p,
                    oprnid: w,
                    provinceName: x,
                    remark: m,
                    build_id: n
                },
                success: function(t) {
                    e = t.data, console.log("---------"), console.log(e), "微信" == s ? app.util.request({
                        url: "entry/wxapp/Orderarr",
                        data: {
                            price: c,
                            openid: w
                        },
                        success: function(t) {
                            console.log(t), console.log(e);
                            var a = t.data.package;
                            wx.requestPayment({
                                timeStamp: t.data.timeStamp,
                                nonceStr: t.data.nonceStr,
                                package: t.data.package,
                                signType: "MD5",
                                paySign: t.data.paySign,
                                success: function(t) {
                                    wx.showToast({
                                        title: "支付成功",
                                        icon: "success",
                                        duration: 2e3
                                    }), app.util.request({
                                        url: "entry/wxapp/PayOrder",
                                        cachetime: "0",
                                        data: {
                                            order_id: e,
                                            build_id: n
                                        },
                                        success: function(t) {
                                            console.log(t.data), app.util.request({
                                                url: "entry/wxapp/Paysuccess",
                                                cachetime: "0",
                                                data: {
                                                    prepay_id: a,
                                                    openid: w,
                                                    order_id: e
                                                },
                                                success: function(t) {
                                                    console.log(t.data), wx.showModal({
                                                        title: "提示",
                                                        content: "订单已支付成功",
                                                        cancelText: "去首页",
                                                        confirmText: "查看订单",
                                                        confirmColor: "#41c2fc",
                                                        success: function(t) {
                                                            t.cancel ? wx.reLaunch({
                                                                url: "../index"
                                                            }) : t.confirm && wx.redirectTo({
                                                                url: "../../user/service/service"
                                                            }), i.setData({
                                                                ispay: !0
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                },
                                fail: function(t) {
                                    i.conutt(), i.setData({
                                        ispay: !0
                                    });
                                }
                            });
                        }
                    }) : app.util.request({
                        url: "entry/wxapp/balancePay",
                        cachetime: "0",
                        data: {
                            openid: w,
                            order_id: e,
                            build_id: n
                        },
                        success: function(t) {
                            console.log(t.data), i.setData({
                                ispay: !0
                            }), 1 == t.data.as ? wx.showModal({
                                title: "提示",
                                content: "订单已支付成功",
                                cancelText: "去首页",
                                confirmText: "查看订单",
                                confirmColor: "#41c2fc",
                                success: function(t) {
                                    t.cancel ? wx.reLaunch({
                                        url: "../index"
                                    }) : t.confirm && wx.redirectTo({
                                        url: "../../user/service/service"
                                    });
                                }
                            }) : 3 == t.data.as && (wx.showToast({
                                title: "余额不足！",
                                icon: "none",
                                duration: 2e3
                            }), i.conutt());
                        }
                    });
                },
                fail: function(t) {
                    wx.showModal({
                        title: "提示",
                        content: t.data.message,
                        showCancel: !1
                    }), i.setData({
                        ispay: !0
                    });
                }
            });
        }
        1 == o && wx.showModal({
            title: "提示",
            content: a,
            showCancel: !1
        });
    },
    toAddress: function() {
        var a = this;
        console.log(a.data.totalprice), wx.chooseAddress({
            success: function(t) {
                console.log("获取地址成功"), a.getTotalPrice(), a.setData({
                    address: t,
                    hasAddress: !0,
                    totalprice: a.data.totalprice
                });
            },
            fail: function(t) {
                console.log("获取地址失败"), wx.getSetting({
                    success: function(t) {
                        t.authSetting["scope.address"] || (console.log("进入信息授权开关页面"), wx.openSetting({
                            success: function(t) {
                                console.log("openSetting success", t.authSetting);
                            }
                        }));
                    }
                });
            }
        });
    },
    radioChange: function(t) {
        var a = t.detail.value;
        console.log(a), this.setData({
            payType: a
        });
    },
    showPay: function(t) {
        this.setData({
            payStatus: !this.data.payStatus
        });
    }
});