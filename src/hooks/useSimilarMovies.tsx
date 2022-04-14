import { useState, useEffect, useCallback } from "react"
import { useQuery } from "react-query"
import { SimilarMovies } from "../types/SimilarMovies"

function useSimilarMovies(movieId: number) {
	const [similarMovieDetails, setSimilarMovieDetails] = useState<SimilarMovies[]>([])

	const fetchSimilarMovies = useCallback(
		async (movieId: number): Promise<SimilarMovies[]> => {
			const apiKey = process.env.REACT_APP_API_KEY
			const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`
			return await fetch(apiUrl)
				.then((response) => response.json())
				.then((data) => {
					return data.results
				})
		},
		[movieId],
	)

	const { isLoading, error, data } = useQuery(["movies", movieId], () =>
		fetchSimilarMovies(movieId),
	)

	useEffect(() => {
		if (data) {
			setSimilarMovieDetails(data)
		}
	}, [movieId, data])

	return { similarMovieDetails, isLoading, error }
}

export default useSimilarMovies
