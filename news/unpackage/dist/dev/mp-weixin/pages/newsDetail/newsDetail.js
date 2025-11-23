"use strict";
const common_vendor = require("../../common/vendor.js");
const common_newsService = require("../../common/newsService.js");
const common_settingsMixin = require("../../common/settingsMixin.js");
const _sfc_main = {
  // 混入设置（用于主题和字体大小）
  mixins: [common_settingsMixin.settingsMixin],
  data() {
    return {
      news: null,
      newsId: null,
      isCollected: false
    };
  },
  onLoad(options) {
    if (!options.id) {
      common_vendor.index.showToast({ title: "新闻ID无效", icon: "error" });
      return;
    }
    this.newsId = parseInt(options.id);
    this.loadNewsDetail();
    this.checkCollectionStatus();
  },
  methods: {
    // 加载新闻详情数据
    async loadNewsDetail() {
      try {
        this.news = await common_newsService.getNewsById(this.newsId);
        if (this.news) {
          this.addReadingHistory();
        } else {
          common_vendor.index.showToast({ title: "未找到该新闻", icon: "none" });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/newsDetail/newsDetail.vue:73", "加载详情失败", error);
      }
    },
    // 检查收藏状态
    checkCollectionStatus() {
      const collections = common_vendor.index.getStorageSync("collections") || [];
      this.isCollected = collections.some((item) => item.id === this.newsId);
    },
    // 切换收藏状态
    toggleCollection() {
      if (!this.news)
        return;
      let collections = common_vendor.index.getStorageSync("collections") || [];
      if (this.isCollected) {
        collections = collections.filter((item) => item.id !== this.newsId);
        this.isCollected = false;
        common_vendor.index.showToast({ title: "已取消收藏", icon: "none" });
      } else {
        const { id, title, summary, source, date } = this.news;
        const itemToSave = { id, title, summary, source, date };
        if (!collections.some((item) => item.id === this.newsId)) {
          collections.unshift(itemToSave);
        }
        this.isCollected = true;
        common_vendor.index.showToast({ title: "收藏成功", icon: "success" });
      }
      common_vendor.index.setStorageSync("collections", collections);
    },
    // 添加到阅读历史记录
    addReadingHistory() {
      if (!this.news)
        return;
      let history = common_vendor.index.getStorageSync("history") || [];
      const { id, title, summary, source, date } = this.news;
      const itemToSave = { id, title, summary, source, date };
      history = history.filter((item) => item.id !== this.newsId);
      history.unshift(itemToSave);
      if (history.length > 50) {
        history = history.slice(0, 50);
      }
      common_vendor.index.setStorageSync("history", history);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.news
  }, $data.news ? {
    b: common_vendor.t($data.news.title),
    c: common_vendor.t($data.news.source),
    d: common_vendor.t($data.news.date),
    e: common_vendor.t($data.news.content),
    f: common_vendor.t($data.isCollected ? "✓ 已收藏" : "+ 加入收藏"),
    g: $data.isCollected ? 1 : "",
    h: common_vendor.o((...args) => $options.toggleCollection && $options.toggleCollection(...args))
  } : {}, {
    i: common_vendor.n(_ctx.appTheme),
    j: common_vendor.n(_ctx.appFontSize)
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/newsDetail/newsDetail.js.map
