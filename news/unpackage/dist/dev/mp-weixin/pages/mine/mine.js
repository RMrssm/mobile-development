"use strict";
const common_vendor = require("../../common/vendor.js");
const common_settingsMixin = require("../../common/settingsMixin.js");
const _sfc_main = {
  // 5. 注册 Mixin
  mixins: [common_settingsMixin.settingsMixin],
  data() {
    return {};
  },
  methods: {
    // 6. 更新跳转方法
    navigateTo(page) {
      let url = "";
      if (page === "collections") {
        url = "/pages/collections/collections";
      } else if (page === "history") {
        url = "/pages/history/history";
      } else if (page === "settings") {
        url = "/pages/settings/settings";
      } else {
        common_vendor.index.showToast({ title: "功能开发中", icon: "none" });
        return;
      }
      common_vendor.index.navigateTo({
        url
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.navigateTo("collections")),
    b: common_vendor.o(($event) => $options.navigateTo("history")),
    c: common_vendor.o(($event) => $options.navigateTo("settings")),
    d: common_vendor.n(_ctx.appTheme),
    e: common_vendor.n(_ctx.appFontSize)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
