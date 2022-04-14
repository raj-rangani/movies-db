import { useState, useCallback, useEffect } from "react"
import { useQuery } from "react-query"
import { Movie } from "../types/Movie"

function useFetchMovies(pageNumber: number) {
	const [movies, setMovies] = useState<Movie[]>([])

	const fetchMovies = useCallback(
		async (page: number): Promise<Movie[]> => {
			const apiKey = process.env.REACT_APP_API_KEY
			const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${page}`
			return await fetch(apiUrl)
				.then((response) => response.json())
				.then((data) => {
					return data.results
				})
		},
		[pageNumber],
	)

	const { isLoading, error, data } = useQuery(["movies", pageNumber], () =>
		fetchMovies(pageNumber),
	)

	useEffect(() => {
		if (data) {
			setMovies((movie) => {
				return [...movie, ...data]
			})
		}
	}, [isLoading, pageNumber])

	return { isLoading, error, movies }
}

export default useFetchMovies
