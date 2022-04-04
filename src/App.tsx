import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import HomePage from "./pages/HomePage"
import MovieDetailsPage from "./pages/MovieDetailsPage"

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/movie/:id" element={<MovieDetailsPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
