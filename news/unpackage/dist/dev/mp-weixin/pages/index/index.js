"use strict";
const common_vendor = require("../../common/vendor.js");
const common_newsService = require("../../common/newsService.js");
const common_settingsMixin = require("../../common/settingsMixin.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  // 4. 注册 Mixin
  mixins: [common_settingsMixin.settingsMixin],
  data() {
    return {
      newsList: [],
      loading: true
    };
  },
  onLoad() {
    this.fetchNewsData();
  },
  methods: {
    async fetchNewsData() {
      this.loading = true;
      try {
        this.newsList = await common_newsService.getNewsList();
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:60", "获取新闻列表失败", error);
      } finally {
        this.loading = false;
      }
    },
    goToDetail(newsItem) {
      common_vendor.index.navigateTo({
        url: `/pages/newsDetail/newsDetail?id=${newsItem.id}&title=${newsItem.title}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.loading
  }, $data.loading ? {
    b: common_assets._imports_0
  } : $data.newsList.length > 0 ? {
    d: common_vendor.f($data.newsList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.summary),
        c: common_vendor.t(item.source),
        d: common_vendor.t(item.date),
        e: item.id,
        f: common_vendor.o(($event) => $options.goToDetail(item), item.id)
      };
    })
  } : {}, {
    c: $data.newsList.length > 0,
    e: common_vendor.n(_ctx.appTheme),
    f: common_vendor.n(_ctx.appFontSize)
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
