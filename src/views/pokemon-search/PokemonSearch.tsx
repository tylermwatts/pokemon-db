import { useState } from 'react'
import Search from '../../components/search/Search'
import { useLoadingContext } from './../../context/LoadingContext'
import { usePokemonContext } from './../../context/PokemonContext'
import PokemonCard from './pokemon-card/PokemonCard'

const PokemonSearch: React.VFC = () => {
	const [searchValue, setSearchValue] = useState<string>('')
	const { pokemon, fetchPokemon } = usePokemonContext()
	const { isLoading } = useLoadingContext()

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget
		setSearchValue(value)
	}
	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (searchValue) {
			fetchPokemon(searchValue).then(() => setSearchValue(''))
		}
	}

	return (
		<div>
			<Search
				value={searchValue}
				onChange={handleOnChange}
				onSearch={handleSearch}
			/>
			{isLoading ? <div>Loading...</div> : pokemon && <PokemonCard />}
		</div>
	)
}

export default PokemonSearch
