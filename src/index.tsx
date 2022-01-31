import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import LoadingContextProvider from './context/LoadingContext'
import PokemonContext from './context/PokemonContext'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { PokemonApiServiceContextProvider } from './services/PokemonApiService'

ReactDOM.render(
	<React.StrictMode>
		<PokemonApiServiceContextProvider>
			<LoadingContextProvider>
				<PokemonContext>
					<App />
				</PokemonContext>
			</LoadingContextProvider>
		</PokemonApiServiceContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
