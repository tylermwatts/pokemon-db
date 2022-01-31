import { useRef } from 'react'
import Button from '../button/Button'
import styles from './Search.module.css'

interface SearchProps {
	btnText?: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	onSearch: (e: React.FormEvent<HTMLFormElement>) => void
	value: string
}

const Search: React.VFC<SearchProps> = ({
	btnText = 'Search',
	onChange,
	onSearch,
	value,
}) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		onSearch(e)
		inputRef.current?.blur()
	}

	return (
		<form
			id='pokemon-search-form'
			onSubmit={handleSubmit}
			className={styles.container}
		>
			<label htmlFor='pokemon-search' className={styles.label}>
				Search for a Pokemon by name
			</label>
			<div className={styles.inputContainer}>
				<input
					ref={inputRef}
					className={styles.input}
					value={value}
					onChange={onChange}
					type='text'
					name='pokemon-search'
				/>
				<Button form='pokemon-search-form' variant='inline-right' type='submit'>
					{btnText}
				</Button>
			</div>
		</form>
	)
}

export default Search
