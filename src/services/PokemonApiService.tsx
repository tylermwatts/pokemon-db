import { Ability, Pokemon, PokemonClient } from 'pokenode-ts'
import { createContext, useCallback, useContext, useMemo } from 'react'

export interface PokemonApiService {
	getAbilityByName: (abilityName: string) => Promise<Ability>
	getPokemonByName: (name: string) => Promise<Pokemon>
}

export const PokemonApiServiceContext = createContext<PokemonApiService>(
	undefined as unknown as PokemonApiService
)

export const usePokemonApiService = (): PokemonApiService =>
	useContext(PokemonApiServiceContext)

export const PokemonApiServiceContextProvider: React.FC = ({ children }) => {
	const pokemonApi = useMemo(() => new PokemonClient(), [])

	const getPokemonByName = useCallback(
		(name: string) => {
			return pokemonApi.getPokemonByName(name)
		},
		[pokemonApi]
	)

	const getAbilityByName = useCallback(
		(abilityName: string) => {
			return pokemonApi.getAbilityByName(abilityName)
		},
		[pokemonApi]
	)

	return (
		<PokemonApiServiceContext.Provider
			value={{ getAbilityByName, getPokemonByName }}
		>
			{children}
		</PokemonApiServiceContext.Provider>
	)
}
