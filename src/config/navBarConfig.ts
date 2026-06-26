import {
	type NavBarConfig,
	type NavBarLink,
	type NavBarSearchConfig,
	NavBarSearchMethod,
} from "../types/navBarConfig";

export const LinkPresets: Record<string, NavBarLink> = {};

export const navBarSearchConfig: NavBarSearchConfig = {
	method: NavBarSearchMethod.PageFind,
};

export const navBarConfig: NavBarConfig = {
	links: [
	{
		name: "链接",
		url: "#",
		icon: "material-symbols:link",
		children: [
			{
				name: "我的图床",
				url: "https://tu.2644536256.date",
				external: true,
				icon: "material-symbols:image"
			}
		]
	}
],
};
