import {
	Avatar,
	AvatarGroup,
	Badge,
	Box,
	Image,
	SimpleGrid,
	Text,
} from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import CastCard from "../components/CastCard"
import Loader from "../components/Loader"
import SimilarMovieCard from "../components/SimilarMovieCard"
import useFetchCasts from "../hooks/useFetchCasts"
import useMovieDetails from "../hooks/useMovieDetails"
import useSimilarMovies from "../hooks/useSimilarMovies"

const MovieDetailsPage: FC = () => {
	type castCardSize = { base: number; sm: number; md: number; lg: number; xl: number }
	const { id } = useParams()
	const { movieDetails, isLoading } = useMovieDetails(Number(id))
	const { similarMovieDetails } = useSimilarMovies(Number(id))
	const { castDetails } = useFetchCasts(Number(id))
	const [showMore, setShowMore] = useState<castCardSize>({
		base: 520,
		sm: 600,
		md: 620,
		lg: 600,
		xl: 640,
	})
	const [show, setShow] = useState<number>(0)

	useEffect(() => {
		if (isLoading) {
			setShow(0)
		}
		if (show !== 0) {
			if (castDetails.length / 6 > show + 1) {
				setShowMore((more) => {
					return {
						...more,
						xl: 640 + show * 280,
					}
				})
			}
			if (castDetails.length / 5 > show + 1) {
				setShowMore((more) => {
					return {
						...more,
						lg: 620 + show * 260,
					}
				})
			}
			if (castDetails.length / 4 > show + 1) {
				setShowMore((more) => {
					return {
						...more,
						md: 620 + show * 280,
					}
				})
			}
			if (castDetails.length / 3 > show + 1) {
				setShowMore((more) => {
					return {
						...more,
						sm: 600 + show * 270,
					}
				})
			}
			if (castDetails.length / 2 > show + 1) {
				setShowMore((more) => {
					return {
						...more,
						base: 520 + show * 215,
					}
				})
			}
		}
	}, [show, showMore, setShowMore, setShow, isLoading, castDetails])

	if (isLoading)
		return (
			<Box
				marginTop={"1rem"}
				w="100%"
				display={"flex"}
				flexDirection={"column"}
				justifyContent={"center"}
				alignItems={"center"}
			>
				<Loader />
				<Text>Loading ...</Text>
			</Box>
		)
	if (!movieDetails) return null

	return (
		<>
			<Box
				color={"#ffffff"}
				w="100%"
				background={
					"Linear-gradient(180deg, rgba(10, 10, 10, 0.1), rgba(0, 0, 0, 1) 85%), url('https://image.tmdb.org/t/p/original/" +
					movieDetails?.backdrop_path +
					"')"
				}
				backgroundSize={"cover"}
				backgroundBlendMode={"multiply"}
				backgroundPosition={"center"}
			>
				<Box
					width={"100%"}
					display={"flex"}
					justifyContent={"end"}
					paddingTop={{ base: "20%", sm: "8%", md: "8%", lg: "8%", xl: "8%" }}
					paddingBottom={{ base: "3%", sm: "3%", md: "3%", lg: "3%", xl: "3%" }}
					paddingStart={{ base: "8%", sm: "7%", md: "6%", lg: "6%", xl: "4%" }}
					paddingEnd={{ base: "5%", sm: "5%", md: "5%", lg: "5%", xl: "5%" }}
				>
					<Box
						w={{ base: "25%", xl: "18%" }}
						padding={"2px"}
						backgroundColor={"gray.100"}
						borderRadius={12}
						overflow={"hidden"}
					>
						<Image
							borderRadius={11}
							src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
							alt={movieDetails?.title}
						/>
					</Box>
					<Box
						flex={1}
						paddingStart={"4%"}
						display={"flex"}
						flexDirection={"column"}
						justifyContent={"end"}
						paddingBottom={"1%"}
					>
						<Text
							fontSize={{
								base: "lg",
								sm: "lg",
								md: "xl",
								lg: "2xl",
								xl: "2xl",
							}}
							fontWeight={"normal"}
						>
							{movieDetails?.original_title}
						</Text>

						<Text
							fontSize={{
								base: "sm",
								sm: "sm",
								md: "large",
								lg: "xl",
								xl: "xl",
							}}
							color={"gray.300"}
							fontWeight={"normal"}
						>
							{movieDetails?.tagline}
						</Text>
					</Box>
				</Box>
			</Box>
			<Box
				marginTop={-1}
				paddingTop={{ base: "8%", sm: "1%", md: "1%", lg: "0", xl: "0" }}
				paddingBottom={{ base: "0%", sm: "1%", md: "1%", lg: "0", xl: "0" }}
				paddingStart={{ base: "8%", sm: "7%", md: "6%", lg: "5.5%", xl: "4%" }}
				paddingEnd={{ base: "8%", sm: "7%", md: "4%", lg: "4%", xl: "4%" }}
				background={"#000000"}
			>
				{movieDetails?.genres.map((genres) => (
					<Badge
						key={genres.id}
						colorScheme={"gray"}
						borderRadius={8}
						padding={{ base: 2, xl: 3 }}
						paddingY={{ base: 1, xl: 2 }}
						marginRight={3}
						marginBottom={3}
						variant={"outline"}
					>
						{genres.name}
					</Badge>
				))}
			</Box>
			<Box
				marginTop={-1}
				paddingTop={{ base: "5%", sm: "1%", md: "1%", lg: "1%", xl: "1%" }}
				paddingBottom={{ base: "8%", sm: "2%", md: "1%", lg: "1%", xl: "1%" }}
				paddingStart={{ base: "8%", sm: "7%", md: "6%", lg: "6%", xl: "4%" }}
				paddingEnd={{ base: "8%", sm: "7%", md: "6%", lg: "6%", xl: "0" }}
				background={"#000000"}
				color={"#FFFFFF"}
			>
				<Text
					fontSize={{ sm: "lg", md: "xl", lg: "xl", xl: "large" }}
					paddingBottom={1}
					paddingStart={1}
				>
					{movieDetails?.release_date}
				</Text>
				<Text
					color={"gray.500"}
					fontSize={{ sm: "lg", md: "xl", lg: "xl", xl: "large" }}
				>
					{movieDetails?.overview}
				</Text>
			</Box>
			<Box
				marginTop={-1}
				paddingTop={{ base: "1%", sm: "1%", md: "1%", lg: "0", xl: "0" }}
				paddingBottom={{ base: "0%", sm: "1%", md: "1%", lg: "0", xl: "0" }}
				paddingStart={{ base: "8%", sm: "7%", md: "6%", lg: "5.5%", xl: "4%" }}
				paddingEnd={{ base: "8%", sm: "7%", md: "4%", lg: "4%", xl: "4%" }}
				background={"#000000"}
				height={showMore}
				transition={"0.7s ease-in-out"}
				overflow={"hidden"}
			>
				<Box
					marginTop={3}
					display={"flex"}
					justifyContent={"center"}
					flexDirection={"row"}
					paddingBottom={2}
				>
					<Text
						flex={1}
						fontSize={{
							base: "2xl",
							sm: "xl",
							md: "xl",
							lg: "xl",
							xl: "3xl",
						}}
						color={"#FFFFFF"}
					>
						Movie Cast
					</Text>
					<AvatarGroup size={"sm"} max={4} fontSize={"10px"}>
						{castDetails.map((cast) => (
							<Avatar
								key={cast.id}
								name={cast.original_name}
								src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
								variant={"circle"}
							/>
						))}
					</AvatarGroup>
				</Box>
				<SimpleGrid
					alignContent={"center"}
					columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
					gridGap={{ base: "3.5", sm: "5", md: "8", lg: "8", xl: "8" }}
					paddingTop={5}
					paddingEnd={0}
					css={{
						"&::-webkit-scrollbar": {
							width: "0px",
						},
					}}
				>
					{castDetails.map((cast) => (
						<CastCard key={cast.id} cast={cast} />
					))}
				</SimpleGrid>
			</Box>
			<Box
				marginTop={-1}
				paddingTop={8}
				display={"flex"}
				justifyContent={"center"}
				background={"#000000"}
			>
				<Badge
					cursor={"pointer"}
					zIndex={0}
					colorScheme={"gray"}
					borderRadius={8}
					padding={{ base: 3, xl: 4 }}
					paddingY={{ base: 2, xl: 3 }}
					marginRight={3}
					marginBottom={5}
					variant={"outline"}
					onClick={() => {
						setShow(show + 1)
					}}
				>
					View More
				</Badge>
			</Box>
			<Box
				marginTop={-3}
				paddingTop={{ base: "0%", sm: "1%", md: "1%", lg: "0", xl: "0" }}
				paddingBottom={{ base: "0%", sm: "1%", md: "1%", lg: "0", xl: "0" }}
				paddingStart={{ base: "8%", sm: "7%", md: "6%", lg: "5.5%", xl: "4%" }}
				paddingEnd={{ base: "8%", sm: "7%", md: "4%", lg: "4%", xl: "4%" }}
				background={"#000000"}
			>
				<Box
					marginTop={3}
					display={"flex"}
					justifyContent={"center"}
					flexDirection={"row"}
					paddingBottom={2}
				>
					<Text
						flex={1}
						fontSize={{
							base: "2xl",
							sm: "xl",
							md: "xl",
							lg: "xl",
							xl: "3xl",
						}}
						color={"#FFFFFF"}
					>
						Similar Movies
					</Text>
				</Box>
				<SimpleGrid
					alignContent={"center"}
					columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 4 }}
					gridGap={{ base: "6", sm: "6", md: "4", lg: "8", xl: "8" }}
					paddingTop={3}
					paddingBottom={5}
					css={{
						"&::-webkit-scrollbar": {
							width: "0px",
						},
					}}
				>
					{similarMovieDetails.map((movie) => (
						<Link
							key={movie.id}
							to={`/movie/${movie.id}`}
							style={{ textDecoration: "none" }}
						>
							<SimilarMovieCard key={movie.id} movie={movie} />
						</Link>
					))}
				</SimpleGrid>
			</Box>
		</>
	)
}
export default MovieDetailsPage
