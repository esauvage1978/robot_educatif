export const QUIZ_PAGE_EN = {
	title: 'Which educational robot fits this age?',
	description:
		'Three questions — age, screen or no screen, budget — then a robot to start with, links to our buying guides, and an Amazon button for today’s price.',
	intro:
		'Pick an age, say whether you want coding **without a screen** (buttons and cards) or **with a tablet or computer** (Scratch, mBlock, Python), and set a rough budget. The quiz suggests one robot, a couple of alternatives, and links to our [2026 buying guides](/en/best-programmable-robot-for-kids/). Prices below are euro ballparks, not a US or UK shelf price.',
};

export const QUIZ_QUESTIONS_EN = {
	age: {
		label: 'Child’s age',
		options: [
			{ id: '4-6', label: '4 to 6' },
			{ id: '7-9', label: '7 to 9' },
			{ id: '10-13', label: '10 to 13' },
			{ id: '14+', label: '14 and up' },
		],
	},
	screen: {
		label: 'Screen or no screen?',
		options: [
			{ id: 'no-screen', label: 'No screen (buttons, cards, or blocks on the robot)' },
			{ id: 'tablet', label: 'With a tablet or computer (Scratch, mBlock…)' },
			{ id: 'either', label: 'Either is fine' },
		],
	},
	budget: {
		label: 'Rough budget',
		options: [
			{ id: 'lt100', label: 'Under €100' },
			{ id: '100-200', label: '€100 to €200' },
			{ id: '200-500', label: '€200 to €500' },
			{ id: '500+', label: 'Over €500' },
		],
	},
};

/** Same recommendation ids as the French quiz. href points at the English guide when one exists. */
export const QUIZ_RESULTS_EN = {
	'tale-bot': {
		productId: null,
		name: 'Tale-Bot Pro (Matatalab)',
		ages: '4–8',
		langs: 'Buttons / story cards',
		href: '/en/matatalab-tale-bot-educational-robot/',
		asin: 'B09LYTM5BC',
		summary: 'A strong fit for preschool and the first year of school: stories and cards, no screen required.',
	},
	'code-and-go': {
		productId: 'code-and-go-souris',
		name: 'Code & Go (robot mouse)',
		ages: 'From age 4',
		langs: 'Direction buttons',
		href: '/en/best-robot-for-a-4-year-old/',
		summary: 'A first step in logic and movement, with no software.',
	},
	botley: {
		productId: 'botley-2',
		name: 'Botley 2.0',
		ages: '5–9',
		langs: 'Remote / cards',
		href: '/robot-educatif-sans-ecran-guide/',
		summary: 'Screen-free coding robot, with obstacles and a line to follow.',
	},
	'codey-rocky': {
		productId: 'codey-rocky',
		name: 'Makeblock Codey Rocky',
		ages: '6–12',
		langs: 'Scratch / Python',
		href: '/en/codey-rocky-makeblock/',
		summary: 'Playful, with built-in sensors, and a gentle bridge into Scratch.',
	},
	mbot: {
		productId: 'mbot',
		name: 'Makeblock mBot',
		ages: '8–12',
		langs: 'Scratch / Arduino',
		href: '/en/mbot-my-first-educational-robot/',
		summary: 'The classroom classic: quick to build, and plenty of mBlock projects.',
	},
	mbot2: {
		productId: 'mbot2',
		name: 'Makeblock mBot2',
		ages: '10–14',
		langs: 'Scratch / Python',
		href: '/en/mbot2-makeblock-what-it-teaches/',
		summary: 'CyberPi, Wi-Fi and mBuild sensors: a solid step into middle school and Python.',
	},
	cyberpi: {
		productId: 'cyberpi',
		name: 'Makeblock CyberPi',
		ages: '10+',
		langs: 'Scratch / Python',
		href: '/en/makeblock-cyberpi-overview/',
		summary: 'A flexible board if the child already has a chassis or a fixed project.',
	},
	'elegoo-car': {
		productId: 'elegoo-robot-car',
		name: 'ELEGOO robot-car kit',
		ages: '13+',
		langs: 'Arduino C',
		href: '/en/arduino-robot-kit-for-kids/',
		summary: 'A longer build, C on Arduino, and a good fit for high school.',
	},
	rpi5: {
		productId: 'raspberry-pi-5-4gb',
		name: 'Raspberry Pi 5 (4 GB)',
		ages: '12+',
		langs: 'Python / Linux',
		href: '/en/raspberry-pi-or-robot-kit-for-teens/',
		summary: 'For a teen who can work alone: smart home, light AI, small server projects.',
	},
};
