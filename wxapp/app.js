App({
    onLaunch: function() {
        var t = this;
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(e) {
                        t.globalData.userInfo = e.userInfo, wx.setStorageSync("user_info", e.userInfo), 
                        t.userInfoReadyCallback && t.userInfoReadyCallback(e);
                    }
                });
            }
        });
    },
    onShow: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                -1 != e.model.search("iPhone X") && (t.globalData.isIpx = !0);
            }
        });
    },
    globalData: {
        userInfo: null,
        showAd: !1,
        Plugin_distribution: "wnjz_sun_plugin_distribution",
        tabBar: {
            color: "#9E9E9E",
            selectedColor: "#f00",
            backgroundColor: "#fff",
            borderStyle: "#ccc",
            list: [ {
                pagePath: "/wnjz_sun/pages/index/index",
                text: "首页",
                iconPath: "/style/images/tab_home.png",
                selectedIconPath: "/style/images/tab_home_selected.png",
                selectedColor: "#41c2fc",
                active: !0
            },
             {
                pagePath: "/wnjz_sun/pages/user/mine",
                text: "我的",
                iconPath: "/style/images/tab_mine.png",
                selectedIconPath: "/style/images/tab_mine_selected.png",
                selectedColor: "#41c2fc",
                active: !1
            } ],
            position: "bottom"
        },
        isIpx: !1
    },
    editTabBar: function() {
        var e = getCurrentPages(), t = e[e.length - 1], o = t.__route__;
        0 != o.indexOf("/") && (o = "/" + o);
        for (var n = this.globalData.tabBar, s = 0; s < n.list.length; s++) n.list[s].active = !1, 
        n.list[s].pagePath == o && (n.list[s].active = !0);
        t.setData({
            tabBar: n
        });
    },
    getSiteUrl: function() {
        var t = wx.getStorageSync("url");
        if (t) return console.log("图片路径缓存"), console.log(t), t;
        wx.request({
            url: this.siteInfo.siteroot + "?i=" + this.siteInfo.uniacid + "&t=undefined&v=1.0.0&from=wxapp&c=entry&a=wxapp&do=Url&m=wnjz_sun",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                return console.log("服务器路径"), console.log(e.data), t = e.data, wx.setStorageSync("url", t), 
                t;
            }
        });
    },
    wxauthSetting: function(e) {
        var a = this, t = getCurrentPages(), i = t[t.length - 1];
        wx.login({
            success: function(e) {
                console.log("进入wx-login");
                var t = e.code;
                wx.setStorageSync("code", t), a.util.request({
                    url: "entry/wxapp/openid",
                    showLoading: !1,
                    data: {
                        code: t
                    },
                    success: function(e) {
                        console.log("进入获取openid"), console.log(e.data), wx.setStorageSync("key", e.data.session_key), 
                        wx.setStorageSync("openid", e.data.openid);
                        var s = e.data.openid;
                        wx.getSetting({
                            success: function(e) {
                                console.log("进入wx.getSetting"), console.log(e), e.authSetting["scope.userInfo"] && (console.log("scope.userInfo已授权"), 
                                wx.getUserInfo({
                                    success: function(e) {
                                        var t = e.userInfo.nickName, o = e.userInfo.avatarUrl, n = e.userInfo.gender;
                                        i.setData({
                                            is_modal_Hidden: !0,
                                            thumb: o,
                                            nickname: t
                                        }), console.log("进入wx-getUserInfo"), console.log(e.userInfo), wx.setStorageSync("user_info", e.userInfo), 
                                        a.util.request({
                                            url: "entry/wxapp/Login",
                                            showLoading: !1,
                                            cachetime: "0",
                                            data: {
                                                openid: s,
                                                img: o,
                                                name: t,
                                                gender: n
                                            },
                                            success: function(e) {
                                                i.onShow(), console.log("进入地址login"), console.log(e.data), wx.setStorageSync("users", e.data), 
                                                wx.setStorageSync("uniacid", e.data.uniacid), i.setData({
                                                    usersinfo: e.data
                                                });
                                            }
                                        });
                                    }
                                }));
                            }
                        });
                    }
                });
            }
        });
    },
    siteInfo: require("siteinfo.js"),
    util: require("/we7/js/util.js"),
    func: require("func.js"),
    distribution: require("/zhy/distribution/distribution.js")
});