"use strict";
const MOCK_DATA = [
  {
    id: 301,
    title: "《习近平关于加强党的作风建设论述摘编》民族文字版出版发行",
    summary: "中共中央党史和文献研究院编辑的《习近平关于加强党的作风建设论述摘编》5种民族文字版出版发行。",
    source: "新华社",
    date: "2025-11-19",
    // (模拟日期)
    content: "新华社北京11月19日电 中共中央党史和文献研究院编辑的《习近平关于加强党的作风建设论述摘编》蒙古文、藏文、维吾尔文、哈萨克文、朝鲜文等5种民族文字版，已由中国民族语文翻译局翻译、民族出版社出版，即日起在全国发行。"
  },
  {
    id: 302,
    title: "uni-app x 是什么？",
    summary: "uni-app x，是下一代uni-app，是一个跨平台应用开发引擎。它包括uts语言、uvue渲染引擎等。",
    source: "DCloud",
    date: "2025-11-23",
    // (模拟日期)
    content: "uni-app x，是下一代uni-app，是一个跨平台应用开发引擎。\n\nuni-app x 是一个庞大的工程，它包括uts语言、uvue渲染引擎、uni的组件和API、以及扩展机制。\n\nuts是一门类ts的、跨平台的、新语言。uts在Android平台编译为kotlin、在iOS平台编译为swift、在鸿蒙next平台上编译为ArkTS、在Web和小程序平台编译为js。"
  },
  {
    id: 201,
    title: "全国政协常委会举行会议 围绕“构建新安全格局”协商议政",
    summary: "会议强调，要深刻认识构建新安全格局的重大意义，全面贯彻落实总体国家安全观...",
    source: "新华网",
    date: "2025-11-22",
    content: "新华社北京11月22日电 全国政协常委会第二十次会议22日在京举行，主题为“构建新安全格局”。会议指出，安全是发展的前提，必须坚持底线思维和极限思维，准备经受风高浪急甚至惊涛骇浪的重大考验。\n\n与会者深入讨论了如何在经济、社会、科技等多个领域协同推进安全体系建设，确保国家主权、安全、发展利益得到坚决维护。"
  },
  {
    id: 202,
    title: "中共中央政治局召开会议 审议《关于深化新时代学校思想政治理论课改革创新的若干意见》",
    summary: "会议指出，办好思想政治理论课，事关培养什么人、怎样培养人、为谁培养人的根本问题...",
    source: "人民网",
    date: "2025-11-21",
    content: "人民网北京11月21日电 中共中央政治局今日召开会议，审议了《关于深化新时代学校思想政治理论课改革创新的若干意见》。\n\n会议强调，思想政治理论课是落实立德树人根本任务的关键课程。要坚持用新时代中国特色社会主义思想铸魂育人，引导学生树立坚定的理想信念。会议要求加强教师队伍建设，创新教学方法，增强思政课的思想性、理论性和亲和力、针对性。"
  },
  {
    id: 203,
    title: "《求是》杂志发表重要文章：推进文化自信自强，铸就社会主义文化新辉煌",
    summary: "文章强调，文化自信是一个国家、一个民族发展中最基本、最深沉、最持久的力量...",
    source: "求是网",
    date: "2025-11-20",
    content: "《求是》杂志2025年第23期发表重要署名文章。\n\n文章指出，没有高度的文化自信，没有文化的繁荣兴盛，就没有中华民族伟大复兴。必须坚持中国特色社会主义文化发展道路，激发全民族文化创新创造活力，增强实现中华民族伟大复兴的精神力量。"
  },
  {
    id: 204,
    title: "科技部、教育部等印发《关于加强新时代高技能人才队伍建设的意见》",
    summary: "《意见》旨在培养更多高素质技术技能人才、能工巧匠、大国工匠，为全面建设社会主义现代化国家提供有力人才支撑。",
    source: "中国政府网",
    date: "2025-11-19",
    content: "近日，科技部、教育部、人力资源和社会保障部联合印发《关于加强新时代高技能人才队伍建设的意见》。\n\n《意见》提出，要完善技能人才培养体系，深化产教融合、校企合作，推动职业教育与产业需求精准对接。同时，要提高技能人才的社会地位和待遇，畅通职业发展通道，营造“劳动光荣、技能宝贵、创造伟大”的社会风尚。"
  }
];
function getNewsList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = MOCK_DATA.map((item) => ({
        id: item.id,
        title: item.title,
        summary: item.summary,
        source: item.source,
        date: item.date
      }));
      resolve(list);
    }, 800);
  });
}
function getNewsById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newsId = parseInt(id);
      const news = MOCK_DATA.find((item) => item.id === newsId);
      resolve(news);
    }, 300);
  });
}
exports.getNewsById = getNewsById;
exports.getNewsList = getNewsList;
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/newsService.js.map
