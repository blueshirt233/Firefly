import type { BackgroundWallpaperConfig } from "@/types/backgroundWallpaper";

export const backgroundWallpaper: BackgroundWallpaperConfig = {
	mode: "fullscreen",
	switchable: true,
	src: {
		desktop: [
			"https://tu.2644536256.date/file/奶绿/1778925769980_4e3b9be34839507cad1a902d46d504464264059.png",
			"https://tu.2644536256.date/file/奶绿/1778925760093_d007df30fb9728f5bda646b9d927018d109143705.png",
			"https://tu.2644536256.date/file/奶绿/1778925764577_c68d1c0d033a6b48d1e81b35c44b0e2d109143705.png",
			"https://tu.2644536256.date/file/奶绿/1778925757380_4c7571e4ff46b9435e0685a538508aa9109143705.png",
			"https://tu.2644536256.date/file/奶绿/1780220983628_1780220562139.png"
		],
		mobile: [
			"https://tu.2644536256.date/file/奶绿/1778922200942_Image_1778725922702.png",
			"https://tu.2644536256.date/file/奶绿/1778922209730_35cd75f8d095a10ea2ad595617e120ec.jpeg",
			"https://tu.2644536256.date/file/奶绿/1778922214110_a90e6a5787157fb735dd9b3e125c53e9.jpeg",
			"https://tu.2644536256.date/file/奶绿/1779111252768_727A046735315991BFA83E89D2E88D88.jpg",
			"https://tu.2644536256.date/file/奶绿/1780824752185_E1FA24937B13963934A9ADE5EA1ADC1B.jpg"
		]
	},
	common: {
		dimOpacity: 0.2,
		homeText: {
			enable: true,
			switchable: true,
			title: "好想喝点奶绿のBlog",
			titleSize: "3.8rem",
			subtitle: [
				"海浪会来，生活总会继续"
			],
			subtitleSize: "1.5rem",
			typewriter: {
				enable: true,
				speed: 100,
				deleteSpeed: 50,
				pauseTime: 2000
			}
		},
		navbar: {
			transparentMode: "semi",
			enableBlur: true,
			blur: 5
		},
		waves: {
			enable: {
				desktop: true,
				mobile: true
			},
			switchable: true
		},
		gradient: {
			enable: {
				desktop: true,
				mobile: true
			},
			height: "15vh",
			switchable: true
		}
	},
	banner: {
		position: "0% 20%",
		carousel: {
			enable: true,
			interval: 5000,
			switchable: true
		}
	},
	overlay: {
		switchable: {
			opacity: true,
			blur: true,
			cardOpacity: true
		},
		zIndex: -1,
		opacity: 0.8,
		blur: 10,
		cardOpacity: 0.5
	},
	fullscreen: {
		position: "center",
		carousel: {
			enable: true,
			interval: 5000,
			switchable: true
		}
	}
};
