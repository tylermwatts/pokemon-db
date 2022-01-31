import { StatName } from '../types'

export const convertDecimeters = (decimeters: number) => {
	const convertedToInches = decimeters * 3.937
	if (convertedToInches > 12) {
		let inches = convertedToInches
		let feet = 0
		for (let i = 0; inches > 12; i++) {
			feet += 1
			inches -= 12
		}
		return { feet, inches: inches.toFixed(2) }
	} else {
		return { inches: convertedToInches.toFixed(2) }
	}
}

export const convertHectograms = (hectograms: number) => {
	const convertedToPounds = hectograms / 4.536
	return convertedToPounds.toFixed(2)
}

const statNames: Record<StatName, string> = {
	hp: 'HP',
	attack: 'Attack',
	defense: 'Defense',
	'special-attack': 'Sp. Attack',
	'special-defense': 'Sp. Defense',
	speed: 'Speed',
}

export const getFormattedStatName = (stat: StatName) => {
	return statNames[stat]
}

export const getTitleCaseString = (str: string) => {
	const unkebabbedWords = str.split('-')
	let titleCased = ''
	for (let i = 0; i < unkebabbedWords.length; i++) {
		const word = unkebabbedWords[i]
		const capitalized =
			word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
		titleCased += i > 0 ? ` ${capitalized}` : capitalized
	}

	return titleCased
}
