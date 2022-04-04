import { useState, useEffect } from "react"
import { Movie } from "../types/Movie"

function useSearchMovies(searchText: string) {
	const [searchMovies, setSearchMovies] = useState<Movie[]>([])

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/search/movie?api_key=55903b004b65252bf433fb4218601d2c&query=${searchText}`,
		)
			.then((response) => response.json())
			.then((data) => {
				setSearchMovies((movies) => {
					return [...data.results]
				})
			})
			.catch((error) => {
				setSearchMovies(() => {
					return [
						{
							title: "Not Found",
							id: -1,
							poster_path: "",
							release_date: "",
							vote_average: "",
						},
					]
				})
			})
	}, [searchText])

	return { searchMovies }
}

export default useSearchMovies
