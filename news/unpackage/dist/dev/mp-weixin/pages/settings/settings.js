"use strict";
const common_vendor = require("../../common/vendor.js");
const common_settingsMixin = require("../../common/settingsMixin.js");
const _sfc_main = {
  // 3. 注册 Mixin
  mixins: [common_settingsMixin.settingsMixin],
  data() {
    return {
      theme: "light",
      fontSize: "medium",
      // 'small', 'medium', 'large'
      cacheSize: "1.2"
      // 模拟缓存大小
    };
  },
  computed: {
    // 计算 slider 的当前索引: small(0), medium(1), large(2)
    fontSizeIndex() {
      if (this.fontSize === "small")
        return 0;
      if (this.fontSize === "large")
        return 2;
      return 1;
    }
  },
  onLoad() {
    const settings = common_vendor.index.getStorageSync("appSettings") || {
      theme: "light",
      fontSize: "medium"
    };
    this.theme = settings.theme;
    this.fontSize = settings.fontSize;
  },
  methods: {
    /**
     * 保存设置到本地存储并更新全局状态
     */
    saveSettings() {
      const settings = {
        theme: this.theme,
        fontSize: this.fontSize
      };
      common_vendor.index.setStorageSync("appSettings", settings);
      this.loadSettings();
    },
    /**
     * 切换黑夜模式
     */
    onThemeChange(e) {
      this.theme = e.detail.value ? "theme-dark" : "light";
      this.saveSettings();
    },
    /**
     * 点击标签切换字号
     */
    onFontChange(size) {
      this.fontSize = size;
      this.saveSettings();
    },
    /**
     * 拖动滑块切换字号
     */
    onSliderChange(e) {
      const index = e.detail.value;
      if (index === 0) {
        this.fontSize = "small";
      } else if (index === 1) {
        this.fontSize = "medium";
      } else {
        this.fontSize = "large";
      }
      this.saveSettings();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.theme === "theme-dark",
    b: common_vendor.o((...args) => $options.onThemeChange && $options.onThemeChange(...args)),
    c: $data.fontSize === "small" ? 1 : "",
    d: common_vendor.o(($event) => $options.onFontChange("small")),
    e: $options.fontSizeIndex,
    f: common_vendor.o((...args) => $options.onSliderChange && $options.onSliderChange(...args)),
    g: $data.fontSize === "large" ? 1 : "",
    h: common_vendor.o(($event) => $options.onFontChange("large")),
    i: common_vendor.t($data.cacheSize),
    j: common_vendor.n(_ctx.appTheme),
    k: common_vendor.n(_ctx.appFontSize)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/settings/settings.js.map
