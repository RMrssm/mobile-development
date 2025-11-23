<template>
	<!-- 1. 绑定根 class，应用主题和字体 -->
	<view class="container" :class="[appTheme, appFontSize]">
		
		<view class="setting-group">
			<view class="setting-item">
				<view class="left">
					<text class="title">黑夜模式</text>
					<text class="desc">（22:00 - 06:00 自动开启）</text>
				</view>
				<view class="right">
					<!-- 切换主题 -->
					<switch :checked="theme === 'theme-dark'" @change="onThemeChange" color="#3489F6" />
				</view>
			</view>
		</view>
		
		<view class="setting-group">
			<view class="setting-item">
				<view class="left">
					<text class="title">字体大小</text>
				</view>
			</view>
			<view class="font-size-selector">
				<text class="label" :class="{'active': fontSize === 'small'}" @click="onFontChange('small')">小</text>
				<view class="slider-wrapper">
					<!-- 滑块控制字号 -->
					<slider 
						:value="fontSizeIndex" 
						@changing="onSliderChange" 
						min="0" 
						max="2" 
						step="1"
						activeColor="#3489F6"
						backgroundColor="#e0e0e0"
						block-size="20"
					/>
				</view>
				<text class="label" :class="{'active': fontSize === 'large'}" @click="onFontChange('large')">大 (老人模式)</text>
			</view>
		</view>

		<view class="setting-group">
			<view class="setting-item">
				<view class="left">
					<text class="title">清除缓存</text>
				</view>
				<view class="right">
					<text class="cache-size">{{cacheSize}} MB</text>
					<text class="arrow">&gt;</text>
				</view>
			</view>
			<view class="setting-item">
				<view class="left">
					<text class="title">意见反馈</text>
				</view>
				<view class="right">
					<text class="arrow">&gt;</text>
				</view>
			</view>
		</view>
		
		<view class="brand-footer">—— 由 金建楠 App 提供 ——</view>

	</view>
</template>

<script>
// 2. 引入 Mixin
import { settingsMixin } from '../../common/settingsMixin.js';

export default {
	// 3. 注册 Mixin
	mixins: [settingsMixin],
	data() {
		return {
			theme: 'light',
			fontSize: 'medium', // 'small', 'medium', 'large'
			cacheSize: '1.2' // 模拟缓存大小
		};
	},
	computed: {
		// 计算 slider 的当前索引: small(0), medium(1), large(2)
		fontSizeIndex() {
			if (this.fontSize === 'small') return 0;
			if (this.fontSize === 'large') return 2;
			return 1;
		}
	},
	onLoad() {
		// 页面加载时，从本地存储初始化 data
		const settings = uni.getStorageSync('appSettings') || {
			theme: 'light',
			fontSize: 'medium'
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
			uni.setStorageSync('appSettings', settings);
			// 立即更新当前页面的 Mixin 数据，使其生效
			this.loadSettings();
		},
		
		/**
		 * 切换黑夜模式
		 */
		onThemeChange(e) {
			// e.detail.value 是 switch 的当前状态 (true/false)
			this.theme = e.detail.value ? 'theme-dark' : 'light';
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
				this.fontSize = 'small';
			} else if (index === 1) {
				this.fontSize = 'medium';
			} else {
				this.fontSize = 'large';
			}
			this.saveSettings();
		}
	}
};
</script>

<style>
/* 使用 CSS 变量 */
.container {
	background-color: var(--bg-color);
	min-height: 100vh;
	padding: 20rpx 0;
}
.setting-group {
	background-color: var(--card-bg-color);
	margin: 20rpx 30rpx;
	border-radius: 16rpx;
	box-shadow: 0 4rpx 15rpx var(--shadow-color);
	overflow: hidden;
}
.setting-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 30rpx;
	border-bottom: 1rpx solid var(--border-color);
}
.setting-item:last-child {
	border-bottom: none;
}
.left {
	display: flex;
	flex-direction: column;
}
.title {
	font-size: var(--font-size-base);
	color: var(--text-color-primary);
	font-weight: 500;
}
.desc {
	font-size: 24rpx;
	color: var(--text-color-secondary);
	margin-top: 5rpx;
}
.right {
	display: flex;
	align-items: center;
}
.arrow {
	font-size: 30rpx;
	color: var(--text-color-placeholder);
	margin-left: 10rpx;
}
.cache-size {
	font-size: 28rpx;
	color: var(--text-color-secondary);
}

/* 字体设置 */
.font-size-selector {
	display: flex;
	align-items: center;
	padding: 30rpx;
}
.label {
	font-size: 28rpx;
	color: var(--text-color-secondary);
	transition: all 0.2s;
}
.label.active {
	font-size: 30rpx;
	color: var(--brand-color);
	font-weight: bold;
}
.slider-wrapper {
	flex: 1;
	margin: 0 30rpx;
}
.brand-footer {
	text-align: center;
	padding: 80rpx 0 40rpx;
	color: var(--text-color-placeholder);
	font-size: 24rpx;
}
</style>