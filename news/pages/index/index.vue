<template>
	<!-- 1. 绑定根 class，应用主题和字体 -->
	<view class="container" :class="[appTheme, appFontSize]">
		
		<!-- 2. "高级感" 品牌头部 -->
		<view class="brand-header">
			<text class="brand-text">金建楠 · 学习要闻</text>
			<text class="brand-subtitle">每日精选 · 深度学习</text>
		</view>

		<view v-if="loading" class="loading-state">
			<!-- 模拟加载图标 -->
			<image src="/static/loading.gif" class="loading-icon"></image>
			<text class="loading-text">正在获取今日要闻...</text>
		</view>
		
		<view v-else-if="newsList.length > 0">
			<!-- 遍历新闻列表 -->
			<view v-for="item in newsList" :key="item.id" class="news-card" @click="goToDetail(item)">
				<view class="news-content">
					<view class="news-title">{{ item.title }}</view>
					<view class="news-summary">{{ item.summary }}</view>
					<view class="news-footer">
						<text class="source">{{ item.source }}</text>
						<text class="date">{{ item.date }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view v-else class="empty-state">
			<text class="empty-text">未能加载新闻，请稍后重试。</text>
		</view>
	</view>
</template>

<script>
import { getNewsList } from '../../common/newsService.js';
// 3. 引入 Mixin
import { settingsMixin } from '../../common/settingsMixin.js';

export default {
	// 4. 注册 Mixin
	mixins: [settingsMixin],
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
				this.newsList = await getNewsList();
			} catch (error) {
				console.error("获取新闻列表失败", error);
			} finally {
				this.loading = false;
			}
		},
		goToDetail(newsItem) {
			uni.navigateTo({
				url: `/pages/newsDetail/newsDetail?id=${newsItem.id}&title=${newsItem.title}`
			});
		}
	}
};
</script>

<style>
/* 5. 使用 CSS 变量 */
.container {
	background-color: var(--bg-color);
	min-height: 100vh;
	padding: 0 30rpx; /* 增加左右边距 */
}

/* "高级感" 品牌头部 */
.brand-header {
	padding: 40rpx 0 30rpx;
}
.brand-text {
	font-size: 48rpx;
	color: var(--text-color-primary);
	font-weight: 700;
	display: block;
}
.brand-subtitle {
	font-size: 28rpx;
	color: var(--text-color-secondary);
	font-weight: 300;
	margin-top: 5rpx;
}

/* 列表卡片样式 */
.news-card {
	background-color: var(--card-bg-color);
	padding: 30rpx;
	margin-bottom: 25rpx;
	border-radius: 16rpx;
	box-shadow: 0 4rpx 15rpx var(--shadow-color);
	transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.news-card:active {
	transform: translateY(2rpx);
	box-shadow: 0 2rpx 8rpx var(--shadow-color);
}
.news-title {
	font-size: var(--font-size-title); /* 使用变量 */
	color: var(--text-color-primary);
	line-height: 1.5;
	margin-bottom: 10rpx;
	font-weight: 600;
}
.news-summary {
	font-size: var(--font-size-base); /* 使用变量 */
	color: var(--text-color-secondary);
	font-weight: 300; /* 更纤细的摘要 */
	line-height: var(--line-height-base);
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	margin-bottom: 20rpx;
}
.news-footer {
	display: flex;
	justify-content: space-between;
	font-size: 26rpx;
	color: var(--text-color-placeholder);
	padding-top: 15rpx;
	border-top: 1rpx solid var(--border-color);
}

/* 加载和空状态样式 */
.loading-state, .empty-state {
	text-align: center;
	padding: 150rpx 0;
	color: var(--text-color-secondary);
	font-size: 28rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.loading-icon {
	width: 60rpx;
	height: 60rpx;
	margin-bottom: 20rpx;
}
.loading-text {
	color: var(--text-color-secondary);
}
</style>