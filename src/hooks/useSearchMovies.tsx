import { useState, useEffect, useCallback } from "react"
import { useQuery } from "react-query"
import { Movie } from "../types/Movie"

function useSearchMovies(searchText: string) {
	const [searchMovies, setSearchMovies] = useState<Movie[]>([])

	const fetchSearchMovies = useCallback(
		async (searchText: string): Promise<Movie[]> => {
			const apiKey = process.env.REACT_APP_API_KEY
			const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchText}`
			return await fetch(apiUrl)
				.then((response) => response.json())
				.then((data) => {
					return data.results
				})
		},
		[searchText],
	)

	const { isLoading, error, data } = useQuery(["movies", searchText], () =>
		fetchSearchMovies(searchText),
	)

	useEffect(() => {
		if (data) {
			setSearchMovies(data)
			if (data.length === 0) {
				setSearchMovies([
					{
						title: "Not Found",
						id: -1,
						poster_path: "",
						release_date: "",
						vote_average: "",
					},
				])
			}
		}

		if (error) {
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
		}
	}, [searchText, data])

	return { searchMovies, isLoading, error }
}

export default useSearchMovies
