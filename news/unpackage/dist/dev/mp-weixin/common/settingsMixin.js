"use strict";
const common_vendor = require("./vendor.js");
const settingsMixin = {
  data() {
    return {
      appTheme: "light",
      // 'light' 或 'theme-dark'
      appFontSize: "font-size-medium"
      // 'font-size-small', 'font-size-medium', 'font-size-large'
    };
  },
  onShow() {
    this.loadSettings();
  },
  methods: {
    loadSettings() {
      const settings = common_vendor.index.getStorageSync("appSettings") || {
        theme: "light",
        fontSize: "medium"
      };
      this.appTheme = settings.theme;
      this.appFontSize = "font-size-" + settings.fontSize;
      const rootElement = document.documentElement;
      if (rootElement) {
        rootElement.classList.remove("theme-dark");
        rootElement.classList.remove("light");
        if (this.appTheme === "theme-dark") {
          rootElement.classList.add("theme-dark");
        } else {
          rootElement.classList.add("light");
        }
      }
    }
  }
};
exports.settingsMixin = settingsMixin;
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/settingsMixin.js.map
