import { Company } from "./Company"
import { Genre } from "./Genre"

export type MovieDetails = {
	id: number
	title: string
	poster_path: string
	backdrop_path: string
	release_date: string
	vote_average: string
	genres: Genre[]
	original_title: string
	overview: string
	production_companies: Company[]
	status: string
	tagline: string
	belongs_to_collection: {
		id: number
		name: string
		poster_path: string
		backdrop_path: string
	}
}
