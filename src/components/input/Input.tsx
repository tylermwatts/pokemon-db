export interface InputProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	type: HTMLInputElement['type']
}

const Input: React.VFC<InputProps> = ({ onChange, type }) => {
	return <input onChange={onChange} type={type} />
}

export default Input
