"use strict";
const common_vendor = require("../../common/vendor.js");
const common_settingsMixin = require("../../common/settingsMixin.js");
const _sfc_main = {
  // 3. 注册 Mixin
  mixins: [common_settingsMixin.settingsMixin],
  data() {
    return {
      list: []
    };
  },
  onShow() {
    this.loadHistory();
  },
  methods: {
    loadHistory() {
      const history = common_vendor.index.getStorageSync("history") || [];
      this.list = history;
    },
    goToDetail(newsItem) {
      common_vendor.index.navigateTo({
        url: `/pages/newsDetail/newsDetail?id=${newsItem.id}&title=${newsItem.title}`
      });
    },
    goHome() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.list.length === 0
  }, $data.list.length === 0 ? {
    b: common_vendor.o((...args) => $options.goHome && $options.goHome(...args))
  } : {
    c: common_vendor.f($data.list, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.source),
        c: common_vendor.t(item.date),
        d: item.id,
        e: common_vendor.o(($event) => $options.goToDetail(item), item.id)
      };
    })
  }, {
    d: common_vendor.n(_ctx.appTheme),
    e: common_vendor.n(_ctx.appFontSize)
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/history/history.js.map
