// 日记数据配置
// 用于管理日记页面的数据

export interface DiaryItem {
	id: number;
	content: string;
	date: string;
	images?: string[];
	video?: string;
	location?: string;
	locationUrl?: string;
	mood?: string;
	tags?: string[];
	avatar?: string;
	// 图片展示配置
	imageDisplay?: {
		type: "carousel" | "grid"; // 显示类型：轮播图或网格布局
		autoPlay?: boolean; // 是否自动播放（仅carousel模式），默认 true
		interval?: number; // 自动播放间隔（毫秒），默认 4000ms
		showIndicator?: boolean; // 是否显示位置指示器（仅carousel模式），默认 true
		showControls?: boolean; // 是否显示控制按钮（仅carousel模式），默认 true
	};
}

// 示例日记数据
const diaryData: DiaryItem[] = [
	{
		id: 1,
		content: "记录一下曾经的",
		date: "2026-05-01T10:30:00Z",
		location: "浙江宁波",
		locationUrl: "https://j.map.baidu.com/cf/2M",
		images: [
			"https://tu.2644536256.date/file/blog/diary/1781875087049_c88e4b813edb8b8ac02d9161d01e251d27255678.jpg",
			"https://tu.2644536256.date/file/blog/diary/1781875084918_1e1d323a9051a92bd8d9c07d6a8e971b27255678.png",
			"https://tu.2644536256.date/file/blog/diary/1781875089692_1d16efb60df5481927b2e40454b77beb27255678.jpg",
			"https://tu.2644536256.date/file/blog/diary/1781875084368_43fb2ac8ff30a3e8aa32ab6d3f74103927255678.png",
			"https://tu.2644536256.date/file/blog/diary/1781875087049_073c7376517c21adabe97c9ef9a1643027255678.jpg",
		],
		tags: ["3d", "blender", "渲染图"],
		mood: "😊",
		imageDisplay: {
			type: "grid", // 'carousel' 轮播模式 | 'grid' 网格布局模式
			autoPlay: true,
			interval: 4000,
			showIndicator: true,
			showControls: true,
		},
	},
	{
		id: 2,
		content: "AI奶绿-离开我的依赖",
		date: "2026-04-01T10:30:00Z",
		// location: "Bilibili示例视频",
		locationUrl: "https://j.map.baidu.com/cf/2M",
		images: [],
		video: "https://www.bilibili.com/video/BV1Je9EBnE3k/?spm_id_from=333.1387.homepage.video_card.click&vd_source=63eab82443ddaca55814b068db1cc89d",
		tags: ["Bilibili"],
		mood: "😊",
	},
	{
		id: 3,
		content: "AI奶绿-落雨醉霓裳，也是文静喵",
		date: "2026-04-01T10:30:00Z",
		// location: "Bilibili示例视频",
		locationUrl: "https://j.map.baidu.com/cf/2M",
		images: [],
		video: "https://www.bilibili.com/video/BV1x2XLBQEd6/?spm_id_from=333.1387.homepage.video_card.click&vd_source=63eab82443ddaca55814b068db1cc89d",
		tags: ["Bilibili"],
		mood: "😊",
	},
	{
		id: 4,
		content: "AI奶绿-我们俩",
		date: "2026-04-01T10:30:00Z",
		// location: "Bilibili示例视频",
		locationUrl: "https://j.map.baidu.com/cf/2M",
		images: [],
		video: "https://www.bilibili.com/video/BV11YXTBtEn9/?spm_id_from=333.1387.homepage.video_card.click&vd_source=63eab82443ddaca55814b068db1cc89d",
		tags: ["Bilibili"],
		mood: "😊",
	},
];

// 获取日记列表（按时间倒序）
export const getDiaryList = (limit?: number) => {
	const sortedData = [...diaryData].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	if (limit && limit > 0) {
		return sortedData.slice(0, limit);
	}

	return sortedData;
};

// 获取所有标签
export const getAllTags = () => {
	const tags = new Set<string>();
	diaryData.forEach((item) => {
		if (item.tags) {
			item.tags.forEach((tag) => {
				tags.add(tag);
			});
		}
	});
	return Array.from(tags).sort();
};
