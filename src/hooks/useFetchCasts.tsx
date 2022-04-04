import { useState, useEffect } from "react"
import { Cast } from "../types/Cast"

function useMovieDetails(movieId: number) {
	const [castDetails, setCastDetails] = useState<Cast[]>([])

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=55903b004b65252bf433fb4218601d2c`,
		)
			.then((response) => response.json())
			.then((data) => {
				setCastDetails(() => {
					return [...data.cast]
				})
			})
	}, [movieId])

	return { castDetails }
}

export default useMovieDetails
