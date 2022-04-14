import { useState, useEffect, useCallback } from "react"
import { useQuery } from "react-query"
import { MovieDetails } from "../types/MovieDetails"

function useMovieDetails(movieId: number) {
	const [movieDetails, setMovieDetails] = useState<MovieDetails>()

	const fetchMovieDetails = useCallback(
		async (movieId: number): Promise<MovieDetails> => {
			const apiKey = process.env.REACT_APP_API_KEY
			const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
			return await fetch(apiUrl)
				.then((response) => response.json())
				.then((data) => {
					return data
				})
		},
		[movieId],
	)

	const { isLoading, error, data } = useQuery(["movieDetails", movieId], () =>
		fetchMovieDetails(movieId),
	)

	useEffect(() => {
		if (data) {
			setMovieDetails(data)
		}
	}, [movieId, data])

	return { movieDetails, isLoading, error }
}

export default useMovieDetails
