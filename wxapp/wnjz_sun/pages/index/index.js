var app = getApp();

Page({
    data: {
      imgUrls: {
        lb_imgs: '/style/images/banner01.png',
        lb_imgs1: '/style/images/banner02.png',
        lb_imgs2: '/style/images/banner03.png',
        lb_imgs3: '/style/images/banner04.png',
      },
      navdata: ["推荐", "家用电器", "数码产品", "办公设备", "家具", "厨房用品", "小玩具","儿童书"],
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      userInfo: {},
      currentTab: 0,
      navScrollLeft: 0,
      indicatorDots: !1,
      autoplay: !1,
      interval: 3e3, 
      duration: 800,
      alldata: {
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
      },
      url: [],
      hot: [],
      order: [],
      jszc: {
          js_name: "",
          js_logo: "",
          js_tel: ""
      },
      is_modal_Hidden: !0,
      isIpx: app.globalData.isIpx
    },
    onLoad: function(t) {
      if(app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if(this.data.canIUse) {
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }

      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            pixelRatio: res.pixelRatio,
            windowHeight: res.windowHeight,
            windowWidth: res.windowWidth
          })
        },
      })

      app.editTabBar(), wx.showLoading({
          title: "加载中"
      });
      var o = this;
      console.log("ceshi2-------------"), console.log(t.scene), console.log("ceshi2-------------"), 
      t = app.func.decodeScene(t), 
      o.setData({
          options: t
      }), wx.setNavigationBarTitle({
          title: o.data.navTile
      }), (o = this).getUrl();
      var n = wx.getStorageSync("openid"), a = wx.getStorageSync("isSwitch");
      if (console.log(a), 1 == a) var s = 1; else s = 2;
      wx.setStorageSync("Switch", s), wx.getLocation({
          type: "gcj02",
          success: function(t) {
              var a = t.latitude, e = t.longitude;
              app.util.request({
                  url: "entry/wxapp/CurrentBranch",
                  cachetime: "0",
                  data: {
                      openid: n,
                      latitude: a,
                      longitude: e,
                      Switch: s
                  },
                  success: function(t) {
                      o.setData({
                          Branch: t.data
                      }), wx.setStorageSync("build_id", t.data.id);
                  }
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
      }), o.wxauthSetting(), app.util.request({
          url: "entry/wxapp/system",
          cachetime: "0",
          success: function(t) {
              console.log(t.data), "" != t.data.js_tel && null != t.data.js_tel && (o.data.jszc.js_tel = t.data.js_tel), 
              "" != t.data.js_name && null != t.data.js_name && (o.data.jszc.js_name = t.data.js_name), 
              "" != t.data.js_logo && null != t.data.js_logo && (o.data.jszc.js_logo = t.data.js_logo), 
              console.log(o.data.jszc), o.setData({
                  shop: t.data,
                  jszc: o.data.jszc
              });
              t.data.pt_name ? wx.setNavigationBarTitle({
                  title: t.data.pt_name
              }) : wx.setNavigationBarTitle({
                  title: "首页"
              }), wx.setStorageSync("system", t.data), wx.setStorageSync("color", t.data.color), 
              wx.setStorageSync("fontcolor", t.data.fontcolor), wx.setNavigationBarColor({
                  frontColor: wx.getStorageSync("fontcolor"),
                  backgroundColor: wx.getStorageSync("color"),
                  animation: {
                      duration: 0,
                      timingFunc: "easeIn"
                  }
              }), o.setData({
                  jikaopen: t.data.is_jkopen
              });
          }
      });

        
    },
    onShow: function() {
        var a = this, t = a.data.options;
        t.d_user_id && app.distribution.distribution_parsent(app, t.d_user_id);
        var e = wx.getStorageSync("build_id");
        a.setData({
            showAd: app.globalData.showAd
        }), app.util.request({
            url: "entry/wxapp/Fuwu",
            data: {
                build_id: e
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    order: t.data
                }), a.getnewdr(), a.getBannerd(), a.getIngreat(), a.tab(), a.indexTan();
            }
        });
    },
    tab: function() {
        var a = this, e = app.globalData.tabBar, o = e.list, n = a.data.url;
        app.util.request({
            url: "entry/wxapp/Tab",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), wx.setStorageSync("tab", t.data), o[0].text = t.data.index, 
                o[0].iconPath = n + t.data.indeximg, o[0].selectedIconPath = n + t.data.indeximgs, 
                o[1].text = t.data.coupon, o[1].iconPath = n + t.data.couponimg, o[1].selectedIconPath = n + t.data.couponimgs, 
                o[2].text = t.data.fans, o[2].iconPath = n + t.data.fansimg, o[2].selectedIconPath = n + t.data.fansimgs, 
                o[3].text = t.data.mine, o[3].iconPath = n + t.data.mineimg, o[3].selectedIconPath = n + t.data.mineimgs, 
                console.log(o), e.list = o, a.setData({
                    tabBar: e
                });
            }
        });
    },

  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 4;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },
    getnewdr: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/new",
            success: function(t) {
                console.log(t.data), a.setData({
                    notice: t.data
                });
            }
        });
    },
    getBannerd: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Banner",
            cachetime: "30",
            success: function(t) {
                console.log(t.data), a.setData({
                    imgUrls: t.data
                });
            }
        });
    },
    getIngreat: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Demand",
            success: function(t) {
                a.setData({
                    hot: t.data
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
    indexTan: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/IndexTan",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), a.setData({
                    indexTan: t.data
                });
            }
        });
    },
    wxauthSetting: function(t) {
        var s = this;
        wx.getStorageSync("openid") ? wx.getSetting({
            success: function(t) {
                console.log("进入wx.getSetting 1"), console.log(t), t.authSetting["scope.userInfo"] ? (console.log("scope.userInfo已授权 1"), 
                wx.getUserInfo({
                    success: function(t) {
                        s.setData({
                            is_modal_Hidden: !0,
                            thumb: t.userInfo.avatarUrl,
                            nickname: t.userInfo.nickName
                        });
                    }
                })) : (console.log("scope.userInfo没有授权 1"), wx.showModal({
                    title: "获取信息失败",
                    content: "请允许授权以便为您提供给服务",
                    success: function(t) {
                        s.setData({
                            is_modal_Hidden: !1
                        });
                    }
                }));
            },
            fail: function(t) {
                console.log("获取权限失败 1"), s.setData({
                    is_modal_Hidden: !1
                });
            }
        }) : wx.login({
            success: function(t) {
                console.log("进入wx-login");
                var a = t.code;
                wx.setStorageSync("code", a), wx.getSetting({
                    success: function(t) {
                        console.log("进入wx.getSetting"), console.log(t), t.authSetting["scope.userInfo"] ? (console.log("scope.userInfo已授权"), 
                        wx.getUserInfo({
                            success: function(t) {
                                s.setData({
                                    is_modal_Hidden: !0,
                                    thumb: t.userInfo.avatarUrl,
                                    nickname: t.userInfo.nickName
                                }), console.log("进入wx-getUserInfo"), console.log(t.userInfo), wx.setStorageSync("user_info", t.userInfo);
                                var e = t.userInfo.nickName, o = t.userInfo.avatarUrl, n = t.userInfo.gender;
                                app.util.request({
                                    url: "entry/wxapp/openid",
                                    cachetime: "0",
                                    data: {
                                        code: a
                                    },
                                    success: function(t) {
                                        console.log("进入获取openid"), console.log(t.data), wx.setStorageSync("key", t.data.session_key), 
                                        wx.setStorageSync("openid", t.data.openid);
                                        var a = t.data.openid;
                                        wx.setStorage({
                                            key: "openid",
                                            data: a
                                        }), app.util.request({
                                            url: "entry/wxapp/Login",
                                            cachetime: "0",
                                            data: {
                                                openid: a,
                                                img: o,
                                                name: e,
                                                gender: n
                                            },
                                            success: function(t) {
                                                console.log("进入地址login"), console.log(t.data), wx.setStorageSync("users", t.data), 
                                                wx.setStorageSync("uniacid", t.data.uniacid), s.setData({
                                                    usersinfo: t.data
                                                });
                                            }
                                        });
                                    }
                                });
                            },
                            fail: function(t) {
                                console.log("进入 wx-getUserInfo 失败"), wx.showModal({
                                    title: "获取信息失败",
                                    content: "请允许授权以便为您提供给服务!",
                                    success: function(t) {
                                        s.setData({
                                            is_modal_Hidden: !1
                                        });
                                    }
                                });
                            }
                        })) : (console.log("scope.userInfo没有授权"), s.setData({
                            is_modal_Hidden: !1
                        }));
                    }
                });
            },
            fail: function() {
                wx.showModal({
                    title: "获取信息失败",
                    content: "请允许授权以便为您提供给服务!!!",
                    success: function(t) {
                        s.setData({
                            is_modal_Hidden: !1
                        });
                    }
                });
            }
        });
    },
    updateUserInfo: function(t) {
        console.log("授权操作更新");
        this.wxauthSetting();
    },
    indexTap: function(t) {
        var a = this.data.indexTan;
        wx.navigateTo({
            url: "/" + a.path1
        });
    },
    godetails: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.imgUrls;
        0 == a ? wx.navigateTo({
            url: "/" + e.url
        }) : 1 == a ? wx.navigateTo({
            url: "/" + e.url1
        }) : 2 == a ? wx.navigateTo({
            url: "/" + e.url2
        }) : wx.navigateTo({
            url: "/" + e.url3
        });
    },
    toBook: function(t) {
        wx.setStorageSync("keyword", ""), wx.navigateTo({
            url: "classify/classify"
        });
    },
    toSerdesc: function(t) {
        wx.navigateTo({
            url: "serdesc/serdesc"
        });
    },
    toOrder: function(t) {
        parseInt(t.target.dataset.productid);
        wx.navigateTo({
            url: "order/order"
        });
    },
    toAbout: function(t) {
        wx.navigateTo({
            url: "about/about"
        });
    },
    pay: function(t) {
        wx.navigateTo({
            url: "pay/pay"
        });
    },
    cards: function(t) {
        wx.navigateTo({
            url: "card/card"
        });
    },
    toHotser: function(t) {
        wx.navigateTo({
            url: "hotser/hotser"
        });
    },
    toArticle: function(t) {
        wx.navigateTo({
            url: "article/article"
        });
    },
    onShareAppMessage: function(t) {
        return {
            path: "/wnjz_sun/pages/index/index?d_user_id=" + wx.getStorageSync("users").id
        };
    },
    isLogin: function(t) {
        this.data.isLogin;
        this.setData({
            isLogin: !1
        });
    },
    dialogYZ: function(t) {
        null == this.data.shop.js_tel || "" == this.data.shop.js_tel ? wx.makePhoneCall({
            phoneNumber: "0592-666666"
        }) : wx.makePhoneCall({
            phoneNumber: this.data.shop.js_tel
        });
    },
    closeAd: function(t) {
        app.globalData.showAd = !0, this.onShow();
    },
    toMap: function(t) {
        var a = parseFloat(t.currentTarget.dataset.lat), e = parseFloat(t.currentTarget.dataset.lng);
        wx.getLocation({
            type: "gcj02",
            success: function(t) {
                wx.openLocation({
                    latitude: a,
                    longitude: e,
                    scale: 28
                });
            }
        });
    },
    inputFocus: function(t) {
        console.log(t.detail.value), this.setData({
            keyword: t.detail.value
        });
    },
    toSearch: function(t) {
        var a = this.data.keyword;
        "" == a || null == a ? wx.showToast({
            title: "请输入关键词",
            icon: "none"
        }) : (wx.setStorageSync("keyword", a), wx.navigateTo({
            url: "/wnjz_sun/pages/index/classify/classify"
        }));
    },
    kbSearch: function(t) {
        console.log(t.detail.value);
    },
    onPosterTab: function() {
        var e = this;
        if (wx.showLoading({
            title: "海报生成中..."
        }), e.data.posterUrl) wx.hideLoading(), wx.previewImage({
            current: e.data.posterUrl,
            urls: [ e.data.posterUrl ]
        }); else {
            var o = wx.getStorageSync("system"), n = app.siteInfo.siteroot.split("/app/")[0] + "/attachment/", s = wx.getStorageSync("user_info");
            app.util.request({
                url: "entry/wxapp/GetwxCode",
                data: {
                    page: "wnjz_sun/pages/index/index",
                    width: 120
                },
                success: function(t) {
                    console.log("获取小程序二维码"), console.log(t.data);
                    var a = t.data;
                    e.setData({
                        posterinfo: {
                            avatar: s.avatarUrl,
                            banner: n + "" + o.poster_img,
                            qr: n + a,
                            wxcode_pic: a
                        },
                        loadImgKey: !0
                    }), console.log(e.data.posterinfo);
                }
            });
        }
    },
    createPoster: function(t) {
        console.log(t);
        var a = t.detail;
        this.setData({
            posterUrl: a.url
        }), wx.hideLoading(), console.log(5555), console.log(t.detail.url), wx.previewImage({
            current: "" + t.detail.url,
            urls: [ t.detail.url ]
        });
    }
});