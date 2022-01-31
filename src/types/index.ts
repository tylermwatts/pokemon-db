export type StatName =
	| 'hp'
	| 'attack'
	| 'defense'
	| 'special-attack'
	| 'special-defense'
	| 'speed'

export type FormattedPokemonAbility = {
	name: string
	isHidden: 'Yes' | 'No'
	description: string
}
