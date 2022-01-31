import { Pokemon } from 'pokenode-ts'
import { createContext, useCallback, useContext, useState } from 'react'
import { FormattedPokemonAbility } from '../types'
import { getTitleCaseString } from '../utils'
import { usePokemonApiService } from './../services/PokemonApiService'
import { useLoadingContext } from './LoadingContext'

export interface IPokemonContext {
	fetchPokemon: (name: string) => Promise<void>
	handleSetAbilities: (abilities: Array<FormattedPokemonAbility>) => void
	handleSetPokemon: (pokemon: Pokemon) => void
	pokemon: Pokemon | undefined
	pokemonAbilities: Array<FormattedPokemonAbility> | undefined
}

export const PokemonContext = createContext<IPokemonContext>(
	undefined as unknown as IPokemonContext
)
export const usePokemonContext = (): IPokemonContext =>
	useContext(PokemonContext)

const PokemonContextProvider: React.FC = ({ children }) => {
	const { handleSetLoading } = useLoadingContext()
	const { getAbilityByName, getPokemonByName } = usePokemonApiService()
	const [pokemon, setPokemon] = useState<Pokemon>()
	const [pokemonAbilities, setPokemonAbilities] = useState<
		Array<FormattedPokemonAbility>
	>([])

	const handleSetPokemon = useCallback((pokemon: Pokemon) => {
		setPokemon(pokemon)
	}, [])

	const handleSetAbilities = useCallback(
		(abilities: Array<FormattedPokemonAbility>) => {
			setPokemonAbilities(abilities)
		},
		[]
	)

	const fetchPokemon = useCallback(
		(name: string) => {
			handleSetLoading(true)
			return getPokemonByName(name)
				.then(async (pokemon) => {
					const formattedAbilities = await Promise.all(
						pokemon.abilities.map(async (ab) => {
							const { ability, is_hidden } = ab
							const { name } = ability
							const description =
								(await (
									await getAbilityByName(name)
								).effect_entries.find((ee) => ee.language.name === 'en')
									?.short_effect) || ''
							return {
								name: getTitleCaseString(name),
								isHidden: is_hidden
									? ('Yes' as FormattedPokemonAbility['isHidden'])
									: ('No' as FormattedPokemonAbility['isHidden']),
								description,
							}
						})
					)
					handleSetPokemon(pokemon)
					handleSetAbilities(formattedAbilities)
				})
				.catch((err) => {
					console.error(err)
					window.alert('Not found')
				})
				.finally(() => handleSetLoading(false))
		},
		[
			getAbilityByName,
			getPokemonByName,
			handleSetAbilities,
			handleSetLoading,
			handleSetPokemon,
		]
	)

	return (
		<PokemonContext.Provider
			value={{
				fetchPokemon,
				handleSetAbilities,
				handleSetPokemon,
				pokemon,
				pokemonAbilities,
			}}
		>
			{children}
		</PokemonContext.Provider>
	)
}

export default PokemonContextProvider
