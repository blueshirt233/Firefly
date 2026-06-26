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
	imageDisplay?: {
		type: "carousel" | "grid";
		autoPlay?: boolean;
		interval?: number;
		showIndicator?: boolean;
		showControls?: boolean;
	};
}

const diaryData: DiaryItem[] = [
	{
		id: 1,
		content: "记录一下曾经的",
		date: "2026-05-01T10:30:00Z",
		images: [
			"https://tu.2644536256.date/file/blog/diary/1781875087049_c88e4b813edb8b8ac02d9161d01e251d27255678.jpg",
			"https://tu.2644536256.date/file/blog/diary/1781875084918_1e1d323a9051a92bd8d9c07d6a8e971b27255678.png",
			"https://tu.2644536256.date/file/blog/diary/1781875089692_1d16efb60df5481927b2e40454b77beb27255678.jpg",
			"https://tu.2644536256.date/file/blog/diary/1781875084368_43fb2ac8ff30a3e8aa32ab6d3f74103927255678.png",
			"https://tu.2644536256.date/file/blog/diary/1781875087049_073c7376517c21adabe97c9ef9a1643027255678.jpg"
		],
		location: "浙江宁波",
		locationUrl: "https://j.map.baidu.com/cf/2M",
		mood: "😊",
		tags: ["3d", "blender", "渲染图"],
		imageDisplay: {
			type: "grid",
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
		video: "https://www.bilibili.com/video/BV1Je9EBnE3k/?spm_id_from=333.1387.homepage.video_card.click&vd_source=63eab82443ddaca55814b068db1cc89d",
		locationUrl: "https://j.map.baidu.com/cf/2M",
		mood: "😊",
		tags: ["Bilibili"],
	},
	{
		id: 3,
		content: "AI奶绿-落雨醉霓裳，也是文静喵",
		date: "2026-04-01T10:30:00Z",
		video: "https://www.bilibili.com/video/BV1x2XLBQEd6/?spm_id_from=333.1387.homepage.video_card.click&vd_source=63eab82443ddaca55814b068db1cc89d",
		locationUrl: "https://j.map.baidu.com/cf/2M",
		mood: "😊",
		tags: ["Bilibili"],
	},
	{
		id: 4,
		content: "AI奶绿-我们俩",
		date: "2026-04-01T10:30:00Z",
		video: "https://www.bilibili.com/video/BV11YXTBtEn9/?spm_id_from=333.1387.homepage.video_card.click&vd_source=63eab82443ddaca55814b068db1cc89d",
		locationUrl: "https://j.map.baidu.com/cf/2M",
		mood: "😊",
		tags: ["Bilibili"],
	},
	{
		id: 1782439217731,
		content: "今天用ai创建了本地后台系统",
		date: "2026-06-26 02:00",
		mood: "😊",
		imageDisplay: {
			type: "carousel",
			autoPlay: false,
			interval: 3000,
			showIndicator: true,
			showControls: true,
		},
	}
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
