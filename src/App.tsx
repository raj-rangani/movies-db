import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import HomePage from "./pages/HomePage"
import MovieDetailsPage from "./pages/MovieDetailsPage"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"

const App = () => {
	const queryClient = new QueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/movie/:id" element={<MovieDetailsPage />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	)
}

export default App
