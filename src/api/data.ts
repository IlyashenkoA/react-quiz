import { QUESTIONS, QuestionData } from '../types/data';

export const config = {
	title: 'Sport Quiz',
	subtitle: 'What do you know about the sport?',
	description:
		'Often you can hear many people impersonating themselves as "sports gurus". You may have ever impersonated one. Take this test to see what your sports knowledge is.',
	timer: {
		defaultHours: 0,
		defaultMinutes: 30,
		defaultSeconds: 0,
	},
};

export const data: QuestionData[] = [
	{
		id: 1,
		question: `Kuru kontinentu simbolizē katrs no olimpiskā karoga gredzeniem?`,
		label: ['Zils', 'Melns', 'Sarkans', 'Dzeltens', 'Zaļš'],
		img: 'https://i.ibb.co/N2VssKj/Screenshot-2021-05-27-at-15-31-17.png',
		answer: ['Eiropa', 'Āfrika', 'Amerika', 'Āzija', 'Austrālija'],
		type: QUESTIONS.TEXT,
	},
	{
		id: 2,
		question: `Kuri no šiem sporta veidiem nav iekļauts/iekļauti olimpiskajās
        spēlēs?`,
		label: [
			'Krikets',
			'Sinhronā peldēšana',
			'Boulings',
			'BMX riteņbraukšana',
			'Kerlings',
		],
		answer: ['Krikets', 'Boulings'],
		type: QUESTIONS.CHECKBOX,
	},
	{
		id: 3,
		question: `Kura valsts vasaras olimpiskajās spēlēs ir konkurējusi visvairāk
        reizes, neuzvarot zelta medaļu?`,
		answer: ['Filipīnas'],
		type: QUESTIONS.TEXT,
	},
	{
		id: 4,
		question: `Cik spēlētāji no vienas komandas vienlaikus var atrasties uz
        uzlaukuma spēles laikā?`,
		label: ['2', '4', '6', '8', '10'],
		answer: ['6'],
		type: QUESTIONS.RADIO,
	},
	{
		id: 5,
		question: `Kur norisināsies 2024.gada olimpiskās spēles?`,
		label: ['Parīzē', 'Tokijā', 'Sidnejā', 'Stokholmā'],
		answer: ['Parīzē'],
		type: QUESTIONS.RADIO,
	},
	{
		id: 6,
		question: `Kurā/kuros gadā/gados Latvijā notika iihf hokeja čempionāts?`,
		label: ['2006.gadā', '2021.gadā', '2010.gadā', '1999.gadā', '2002.gadā'],
		answer: ['2006.gadā', '2021.gadā'],
		type: QUESTIONS.CHECKBOX,
	},
	{
		id: 7,
		question: `Kura valsts izcīnija pirmo zeltu eiropas čempionātā basketbolā?`,
		answer: ['Latvija'],
		type: QUESTIONS.TEXT,
	},
	{
		id: 8,
		question: `Savelc atbilstošo federāciju ar sporta veidu, ko tā pārstāv:`,
		drop: [
			{ id: 2, label: 'ITF' },
			{ id: 1, label: 'FIBA' },
			{ id: 4, label: 'IIHF' },
			{ id: 3, label: 'FIVB' },
		],
		drag: [
			{ id: 2, label: 'Teniss' },
			{ id: 3, label: 'Volejbols' },
			{ id: 1, label: 'Basketbols' },
			{ id: 4, label: 'Hokejs' },
		],
		type: QUESTIONS.DRAG_AND_DROP,
	},
	{
		id: 9,
		question: `Kura valsts ir izcīnījusi visvairāk zelta medaļas
        starptautiskajā hokeja čempionātā?`,
		label: ['Kanāda', 'ASV', 'Ķīna'],
		answer: ['Kanāda'],
		type: QUESTIONS.RADIO,
	},
	{
		id: 10,
		question: `Ievelc katra sportista bildi pie attiecīgā sportista vārda!`,
		drop: [
			{ id: 1, label: 'Kristaps Porziņģis' },
			{ id: 2, label: 'Rodions Kurucs' },
			{ id: 3, label: 'Dāvis Bertāns' },
			{ id: 4, label: 'Andris Biedriņš' },
		],
		drag: [
			{
				id: 1,
				label:
					'https://www.si.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY5OTQ3OTA4MDIyNDc4MjAx/kristaps-porzingis-mavericks-new.jpg',
			},
			{
				id: 2,
				label:
					'https://www.si.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY4MDA2OTUyMTc4MjMwNTQ1/rodions-kurucs-assault-netsjpg.jpg',
			},
			{ id: 3, label: 'https://pic.la.lv/2019/10/Webp.net-resizeimage-34.jpg' },
			{
				id: 4,
				label:
					'https://cdn.vox-cdn.com/thumbor/-yLJqhlXCGWGieWJjQUrYRUDOwI=/0x110:2876x2027/1400x1400/filters:focal(0x110:2876x2027):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/15966309/20130130_kkt_sh5_223.0.jpg',
			},
		],
		type: QUESTIONS.DRAG_AND_DROP,
	},
	{
		id: 11,
		question: `Cik medaļas Latvija ir izcīnījusi olimpiskajās spēlēs?`,
		label: ['Zelta', 'Sudraba', 'Bronzas'],
		answer: ['4', '14', '10'],
		type: QUESTIONS.TEXT,
	},
	{
		id: 12,
		question: `Kurš bija pirmais latviešu spēlētājs nba?`,
		answer: ['Gundars Vētra'],
		type: QUESTIONS.TEXT,
	},
	{
		id: 13,
		question: `Patiesi vai nepatiesi? 2016.gada Vasaras olimpiskajās spēlēs
        Latvija neieguva nevienu godalgoto medaļu`,
		label: ['Patiesi', 'Aplams'],
		answer: ['Patiesi'],
		type: QUESTIONS.RADIO,
	},
	{
		id: 14,
		question: `Kopš kura gada Latvijas hokeja izlase ir elites divīzijā?`,
		answer: ['Kopš 1997.gada'],
		type: QUESTIONS.TEXT,
	},
];
