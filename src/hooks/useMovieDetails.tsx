import { useState, useEffect } from "react"
import { MovieDetails } from "../types/MovieDetails"

function useMovieDetails(movieId: number) {
	const [movieDetails, setMovieDetails] = useState<MovieDetails>()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		fetch(
			`https://api.themoviedb.org/3/movie/${movieId}?api_key=55903b004b65252bf433fb4218601d2c`,
		)
			.then((response) => response.json())
			.then((data) => {
				setMovieDetails((movieDetails) => {
					return { ...data }
				})
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [movieId])

	return { movieDetails, isLoading }
}

export default useMovieDetails
