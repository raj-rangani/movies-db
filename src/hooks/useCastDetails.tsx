import { useState, useEffect, useCallback } from "react"
import { useQuery } from "react-query"
import { Cast } from "../types/Cast"

function useCastDetails(movieId: number) {
	const [castDetails, setCastDetails] = useState<Cast[]>([])

	const fetchCastDetails = useCallback(async (movieId: number): Promise<Cast[]> => {
		const apiKey = process.env.REACT_APP_API_KEY
		const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
		console.log(apiUrl)
		return await fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				return data.cast
			})
	}, [])

	const { isLoading, error, data } = useQuery(["movieCastDetails", movieId], () =>
		fetchCastDetails(movieId),
	)

	useEffect(() => {
		if (data) {
			setCastDetails(data)
		}
	}, [isLoading, movieId, data])

	return { castDetails, isLoading, error }
}

export default useCastDetails
