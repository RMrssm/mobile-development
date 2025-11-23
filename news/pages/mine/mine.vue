<template>
	<!-- 1. 绑定根 class，应用主题和字体 -->
	<view class="container" :class="[appTheme, appFontSize]">
		
		<!-- 2. "高级感" 渐变背景 Logo 卡片 -->
		<view class="profile-card-gradient">
			<view class="logo-name">
				<text class="first-name">金</text>
				<text class="full-name">建楠</text>
				<view class="tag">App 开发者</view>
			</view>
			<text class="motto">专注时政要闻，提升学习效率。</text>
		</view>

		<view class="section-title">我的学习资料</view>
		<view class="menu-list">
			<view class="menu-item" @click="navigateTo('collections')">
				<text class="icon">&#xe606;</text>
				<text class="text">我的收藏</text>
				<text class="arrow">&gt;</text>
			</view>
			<view class="menu-item" @click="navigateTo('history')">
				<text class="icon">&#xe630;</text>
				<text class="text">阅读历史</text>
				<text class="arrow">&gt;</text>
			</view>
			<!-- 3. 更新点击事件，跳转到设置页 -->
			<view class="menu-item" @click="navigateTo('settings')">
				<text class="icon">&#xe62d;</text>
				<text class="text">设置与反馈</text>
				<text class="arrow">&gt;</text>
			</view>
		</view>
	</view>
</template>

<script>
// 4. 引入 Mixin
import { settingsMixin } from '../../common/settingsMixin.js';

export default {
	// 5. 注册 Mixin
	mixins: [settingsMixin],
	data() {
		return {};
	},
	methods: {
		// 6. 更新跳转方法
		navigateTo(page) {
			let url = '';
			if (page === 'collections') {
				url = '/pages/collections/collections';
			} else if (page === 'history') {
				url = '/pages/history/history';
			} else if (page === 'settings') {
				url = '/pages/settings/settings';
			} else {
				uni.showToast({ title: '功能开发中', icon: 'none' });
				return;
			}
			
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style>
/* 引入阿里巴巴矢量图标库作为图标 */
@font-face {
  font-family: 'iconfont';
  src: url('https://at.alicdn.com/t/c/font_3750800_l0e9141r28m.ttf') format('truetype');
}

/* 7. 使用 CSS 变量 */
.container {
	background-color: var(--bg-color);
	min-height: 100vh;
	padding-bottom: 50rpx;
}
/* 渐变高级感卡片 */
.profile-card-gradient {
	background: linear-gradient(135deg, #4a90e2 0%, #3489F6 100%);
	padding: 80rpx 50rpx;
	margin: 20rpx 30rpx 30rpx;
	border-radius: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: flex-start; /* 左对齐 */
	box-shadow: 0 10rpx 20rpx rgba(52, 137, 246, 0.3);
}
.logo-name {
	font-family: 'Helvetica Neue', Arial, sans-serif;
	color: #fff;
	font-size: 60rpx;
	font-weight: 800;
	display: flex;
	align-items: baseline;
	margin-bottom: 20rpx;
}
.first-name {
	font-size: 80rpx;
	margin-right: 10rpx;
}
.tag {
	font-size: 24rpx;
	font-weight: 500;
	padding: 4rpx 12rpx;
	background-color: rgba(255, 255, 255, 0.2);
	color: #fff;
	border-radius: 20rpx;
	margin-left: 15rpx;
	align-self: center;
}
.motto {
	color: rgba(255, 255, 255, 0.9);
	font-size: 28rpx;
	margin-top: 10rpx;
	font-weight: 300;
}
.section-title {
	font-size: 30rpx;
	color: var(--text-color-secondary);
	padding: 20rpx 40rpx 10rpx;
	font-weight: 500;
}
.menu-list {
	background-color: var(--card-bg-color);
	margin: 0 30rpx;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 15rpx var(--shadow-color);
}
.menu-item {
	display: flex;
	align-items: center;
	padding: 30rpx 40rpx;
	border-bottom: 1rpx solid var(--border-color);
	position: relative;
	transition: background-color 0.2s;
}
.menu-item:active {
	background-color: rgba(0,0,0,0.05);
}
.menu-item:last-child {
	border-bottom: none;
}
.icon {
	font-family: iconfont;
	font-size: 40rpx;
	color: var(--brand-color);
	width: 60rpx;
	text-align: center;
}
.text {
	flex: 1;
	font-size: var(--font-size-base); /* 使用变量 */
	color: var(--text-color-primary);
	font-weight: 500;
	margin-left: 20rpx;
}
.arrow {
	font-size: 30rpx;
	color: var(--text-color-placeholder);
}
</style>