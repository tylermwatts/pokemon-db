import { createContext, useCallback, useContext, useState } from 'react'

export interface ILoadingContext {
	handleSetLoading: (loading: boolean) => void
	isLoading: boolean
}

export const LoadingContext = createContext<ILoadingContext>(
	undefined as unknown as ILoadingContext
)
export const useLoadingContext = (): ILoadingContext =>
	useContext(LoadingContext)

const LoadingContextProvider: React.FC = ({ children }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleSetLoading = useCallback((loading: boolean) => {
		setIsLoading(loading)
	}, [])

	return (
		<LoadingContext.Provider
			value={{
				handleSetLoading,
				isLoading,
			}}
		>
			{children}
		</LoadingContext.Provider>
	)
}

export default LoadingContextProvider
