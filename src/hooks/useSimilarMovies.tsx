import { useState, useEffect } from "react"
import { SimilarMovies } from "../types/SimilarMovies"

function useSimilarMovies(movieId: number) {
	const [similarMovieDetails, setSimilarMovieDetails] = useState<SimilarMovies[]>([])

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=55903b004b65252bf433fb4218601d2c`,
		)
			.then((response) => response.json())
			.then((data) => {
				setSimilarMovieDetails(() => {
					return [...data.results]
				})
			})
	}, [movieId])

	return { similarMovieDetails }
}

export default useSimilarMovies
