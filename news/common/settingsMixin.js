// common/settingsMixin.js
// 这个 Mixin 会被所有页面引入，用于自动管理主题和字体大小
export const settingsMixin = {
	data() {
		return {
			appTheme: 'light', // 'light' 或 'theme-dark'
			appFontSize: 'font-size-medium' // 'font-size-small', 'font-size-medium', 'font-size-large'
		};
	},
	onShow() {
		// 每次页面显示时，都从本地存储读取最新的设置
		this.loadSettings();
	},
	methods: {
		loadSettings() {
			// 从本地存储获取设置，如果没有，则使用默认值
			const settings = uni.getStorageSync('appSettings') || {
				theme: 'light',
				fontSize: 'medium'
			};
			
			this.appTheme = settings.theme;
			this.appFontSize = 'font-size-' + settings.fontSize;
			
			// === 修复主题切换的关键步骤：将主题类应用到全局文档根元素 (<html>) ===
			// 在 uni-app 环境中，document.documentElement 对应 HTML 根元素
			const rootElement = document.documentElement; 
			if (rootElement) {
				// 1. 移除旧主题类
				rootElement.classList.remove('theme-dark');
				rootElement.classList.remove('light');
				
				// 2. 应用新主题类
				if (this.appTheme === 'theme-dark') {
					rootElement.classList.add('theme-dark');
				} else {
					rootElement.classList.add('light'); 
				}
			}
			// ==========================================================
		}
	}
};