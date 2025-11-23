<template>
	<!-- 1. 绑定根 class，应用主题和字体 -->
	<view class="container" :class="[appTheme, appFontSize]">
		<view v-if="list.length === 0" class="empty-state">
			<text class="empty-text">您还没有阅读历史</text>
			<button class="go-home-btn" @click="goHome">去逛逛</button>
		</view>
		
		<view v-else class="list-container">
			<!-- 遍历历史列表 -->
			<view v-for="item in list" :key="item.id" class="news-card" @click="goToDetail(item)">
				<view class="news-content">
					<view class="news-title">{{ item.title }}</view>
					<view class="news-footer">
						<text class="source">{{ item.source }}</text>
						<text class="date">{{ item.date }}</text>
					</view>
				</view>
			</view>
		</view>
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
			list: []
		};
	},
	onShow() {
		this.loadHistory();
	},
	methods: {
		loadHistory() {
			const history = uni.getStorageSync('history') || [];
			this.list = history;
		},
		goToDetail(newsItem) {
			uni.navigateTo({
				url: `/pages/newsDetail/newsDetail?id=${newsItem.id}&title=${newsItem.title}`
			});
		},
		goHome() {
			uni.switchTab({
				url: '/pages/index/index'
			});
		}
	}
};
</script>

<style>
/* 4. 使用 CSS 变量 (样式与 collections.vue 一致) */
.container {
	background-color: var(--bg-color);
	min-height: 100vh;
	padding: 20rpx 30rpx;
}
.news-card {
	background-color: var(--card-bg-color);
	padding: 30rpx;
	margin-bottom: 25rpx;
	border-radius: 16rpx;
	box-shadow: 0 4rpx 15rpx var(--shadow-color);
}
.news-title {
	font-size: var(--font-size-title);
	color: var(--text-color-primary);
	line-height: 1.5;
	margin-bottom: 15rpx;
	font-weight: 600;
}
.news-footer {
	display: flex;
	justify-content: space-between;
	font-size: 26rpx;
	color: var(--text-color-placeholder);
	padding-top: 15rpx;
	border-top: 1rpx solid var(--border-color);
}
.empty-state {
	text-align: center;
	padding-top: 200rpx;
	color: var(--text-color-secondary);
	font-size: var(--font-size-base);
	display: flex;
	flex-direction: column;
	align-items: center;
}
.empty-text {
	margin-bottom: 40rpx;
}
.go-home-btn {
	background-color: var(--brand-color);
	color: #fff;
	font-size: 30rpx;
	padding: 0 80rpx;
	border-radius: 50rpx;
	line-height: 2.8;
}
</style>