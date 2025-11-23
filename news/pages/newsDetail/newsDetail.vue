<template>
	<!-- 1. 绑定根 class，应用主题和字体 -->
	<view class="container" :class="[appTheme, appFontSize]">
		<!-- 核心内容区：可滚动 -->
		<view v-if="news" class="detail-wrapper">
			<view class="detail-header">
				<!-- 2. "高级感" 标题 -->
				<text class="detail-title">{{ news.title }}</text>
				<view class="detail-meta">
					<view class="meta-item">来源：<text class="highlight">{{ news.source }}</text></view>
					<view class="meta-item">时间：<text class="highlight">{{ news.date }}</text></view>
				</view>
			</view>
			
			<!-- 3. 正文使用 CSS 变量控制字体 -->
			<view class="detail-content">{{ news.content }}</view>
			
			<!-- === 收藏按钮区域：放在内容流中 === -->
			<view class="collection-area">
				<button 
					class="collect-btn" 
					:class="{ 'is-collected': isCollected }" 
					@click="toggleCollection"
				>
					{{ isCollected ? '✓ 已收藏' : '+ 加入收藏' }}
				</button>
			</view>
			<!-- ==================================== -->
			
			<view class="brand-footer">—— 由 金建楠 App 提供 ——</view>
		</view>
		
		<view v-else class="loading-state">
			正在加载新闻详情...
		</view>
	</view>
</template>

<script>
import { getNewsById } from '../../common/newsService.js';
import { settingsMixin } from '../../common/settingsMixin.js';

export default {
	// 混入设置（用于主题和字体大小）
	mixins: [settingsMixin],
	data() {
		return {
			news: null,
			newsId: null,
			isCollected: false
		};
	},
	onLoad(options) {
		if (!options.id) {
			uni.showToast({ title: '新闻ID无效', icon: 'error' });
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
				this.news = await getNewsById(this.newsId);
				if (this.news) {
					this.addReadingHistory();
				} else {
					uni.showToast({ title: '未找到该新闻', icon: 'none' });
				}
			} catch (error) {
				console.error("加载详情失败", error);
			}
		},
		// 检查收藏状态
		checkCollectionStatus() {
			const collections = uni.getStorageSync('collections') || [];
			// 检查当前新闻ID是否在收藏列表中
			this.isCollected = collections.some(item => item.id === this.newsId);
		},
		// 切换收藏状态
		toggleCollection() {
			if (!this.news) return;
			let collections = uni.getStorageSync('collections') || [];
			
			if (this.isCollected) {
				// 取消收藏
				collections = collections.filter(item => item.id !== this.newsId);
				this.isCollected = false;
				uni.showToast({ title: '已取消收藏', icon: 'none' });
			} else {
				// 加入收藏
				// 确保收藏项包含完整信息（如 source, date）
				const { id, title, summary, source, date } = this.news; 
				const itemToSave = { id, title, summary, source, date };
				
				// 避免重复添加
				if (!collections.some(item => item.id === this.newsId)) {
					collections.unshift(itemToSave);
				}
				this.isCollected = true;
				uni.showToast({ title: '收藏成功', icon: 'success' });
			}
			uni.setStorageSync('collections', collections);
		},
		// 添加到阅读历史记录
		addReadingHistory() {
			if (!this.news) return;
			let history = uni.getStorageSync('history') || [];
			
			// 仅保存必要的列表信息
			const { id, title, summary, source, date } = this.news;
			const itemToSave = { id, title, summary, source, date };
			
			// 如果已存在，先移除，再添加到最前面
			history = history.filter(item => item.id !== this.newsId);
			history.unshift(itemToSave);
			
			// 限制历史记录数量
			if (history.length > 50) {
				history = history.slice(0, 50);
			}
			uni.setStorageSync('history', history);
		}
	}
};
</script>

<style>
/* 使用 CSS 变量 */
.container {
	background-color: var(--card-bg-color); 
	min-height: 100vh;
}
.detail-wrapper {
	padding: 40rpx 30rpx;
	/* 按钮回归内容流，减少底部填充 */
	padding-bottom: 40rpx; 
}
.detail-title {
	font-size: 52rpx; 
	font-weight: 700;
	color: var(--text-color-primary);
	line-height: 1.4;
	margin-bottom: 30rpx;
}
.detail-meta {
	display: flex;
	justify-content: space-between;
	padding: 20rpx 0;
	border-bottom: 1rpx solid var(--border-color);
	margin-bottom: 40rpx;
	font-size: 26rpx;
	color: var(--text-color-secondary);
}
.highlight {
	color: var(--brand-color);
	font-weight: 500;
	margin-left: 5rpx;
}
.detail-content {
	font-size: var(--font-size-base); 
	color: var(--text-color-primary);
	line-height: var(--line-height-base); 
	white-space: pre-wrap;
	text-align: justify;
}

/* 按钮居中容器 */
.collection-area {
	padding: 40rpx 0;
	text-align: center;
}

/* === 收藏按钮样式：普通定位，统一黑字区分背景/边框 === */
.collect-btn {
	/* 默认状态 (+ 加入收藏): 品牌蓝边框，黑字白底 (确保在白背景上突出) */
	background-color: transparent; 
	color: var(--text-color-primary); /* 统一黑色文字 */
	border: 2rpx solid var(--brand-color); /* 品牌蓝边框，在白底上突出 */
	
	font-size: var(--font-size-base);
	padding: 0 50rpx;
	border-radius: 50rpx;
	line-height: 2.8;
	transition: all 0.3s;
	min-width: 300rpx; 
	text-align: center;
	font-weight: bold; 
}
.collect-btn:active {
	opacity: 0.8;
}
.collect-btn.is-collected {
	/* 已收藏 (✓ 已收藏): 浅灰底，黑字，浅色边框 (柔和显示已完成操作) */
	background-color: var(--bg-color); /* 使用页面背景色作为浅色填充 */
	color: var(--text-color-primary); /* 统一黑色文字 */
	border: 2rpx solid var(--border-color); /* 浅色边框 */
	font-weight: normal; 
}
/* ==================================== */

.brand-footer {
	text-align: center;
	padding: 40rpx 0;
	color: var(--text-color-placeholder);
	font-size: 24rpx;
}
.loading-state {
	padding: 100rpx 0;
	text-align: center;
	color: var(--text-color-secondary);
	font-size: 28rpx;
}
</style>