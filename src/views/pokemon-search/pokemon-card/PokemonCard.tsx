import { useMemo } from 'react'
import { StatName } from '../../../types'
import {
	convertDecimeters,
	convertHectograms,
	getFormattedStatName,
} from '../../../utils'
import { usePokemonContext } from './../../../context/PokemonContext'
import styles from './PokemonCard.module.css'

const PokemonCard: React.VFC<{}> = () => {
	const { pokemon, pokemonAbilities } = usePokemonContext()
	const { height, name, sprites, stats, weight } = pokemon!
	const spriteUrl = useMemo(
		() => sprites.other['official-artwork'].front_default,
		[sprites]
	)

	const getConvertedPokemonHeight = () => {
		const { feet, inches } = convertDecimeters(height)
		if (feet) {
			return `${feet} ft. ${inches} in.`
		} else {
			return `${inches} in.`
		}
	}

	const getConvertedPokemonWeight = () => {
		return `${convertHectograms(weight)} lbs.`
	}

	return (
		<div>
			<h2 className={styles.name}>{name}</h2>
			{spriteUrl && (
				<img className={styles.sprite} alt='pokemon-sprite' src={spriteUrl} />
			)}
			<table className={styles.table}>
				<thead>
					<tr>
						<th className={styles.header}>Stat</th>
						<th className={styles.header}>Base Value</th>
					</tr>
				</thead>
				<tbody>
					<tr className={styles.row}>
						<td>Height</td>
						<td>{getConvertedPokemonHeight()}</td>
					</tr>
					<tr className={styles.row}>
						<td>Weight</td>
						<td>{getConvertedPokemonWeight()}</td>
					</tr>
					{stats.map((st) => {
						const { name } = st.stat as { name: StatName }
						return (
							<tr key={`stat-${name}`} className={styles.row}>
								<td>{getFormattedStatName(name)}</td>
								<td>{st.base_stat}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<table className={styles.table}>
				<thead>
					<tr>
						<th className={styles.header}>Ability</th>
						<th className={styles.header}>Is Hidden Ability?</th>
						<th className={styles.header}>Description</th>
					</tr>
				</thead>
				<tbody>
					{pokemonAbilities &&
						pokemonAbilities.length > 0 &&
						pokemonAbilities.map((ab) => {
							const { isHidden, name, description } = ab
							return (
								<tr key={`ability-${name}`} className={styles.row}>
									<td>{name}</td>
									<td>{isHidden}</td>
									{description && <td>{description}</td>}
								</tr>
							)
						})}
				</tbody>
			</table>
		</div>
	)
}

export default PokemonCard
