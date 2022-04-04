import { useState, useEffect } from "react"
import { Movie } from "../types/Movie"

function useFetchMovies(pageNumber: number) {
	const [movies, setMovies] = useState<Movie[]>([])

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=55903b004b65252bf433fb4218601d2c&language=en-US&sort_by=popularity.desc&page=${pageNumber}`,
		)
			.then((response) => response.json())
			.then((data) => {
				setMovies((movies) => {
					return [...movies, ...data.results]
				})
			})
	}, [pageNumber])

	return { movies }
}

export default useFetchMovies
