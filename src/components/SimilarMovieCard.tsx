import { Box, Stack, Text, Badge } from "@chakra-ui/react"
import { FC } from "react"
import { SimilarMovies } from "../types/SimilarMovies"

const SimilarMovieCard: FC<{ movie: SimilarMovies }> = ({ movie }) => {
	return (
		<>
			<Box
				background={
					"url('https://image.tmdb.org/t/p/w500/" + movie.backdrop_path + "')"
				}
				backgroundSize={"cover"}
				justifySelf={"center"}
				width={"100%"}
				height={{
					base: "175px",
					sm: "240px",
					md: "240px",
					lg: "240px",
					xl: "175px",
				}}
				borderRadius={"10"}
				overflow={"hidden"}
			>
				<Box zIndex={-1} position={"absolute"} height={"100%"}></Box>
				<Stack height={"100%"} padding={1} backdropFilter={"blur(50px)"}>
					<Box
						borderRadius={8}
						overflow="hidden"
						background={
							"url('https://image.tmdb.org/t/p/w500/" +
							movie.backdrop_path +
							"')"
						}
						backgroundSize={"cover"}
						height={"100%"}
						padding={1.5}
						display={"flex"}
						flexDirection="column"
					>
						<Box float={"right"}>
							<Badge
								borderRadius="5"
								colorScheme="green"
								float={"right"}
								display={"flex"}
								alignItems={"center"}
								justifyContent={"center"}
								paddingBottom={0.5}
								paddingRight={2}
							>
								<Text textAlign={"center"} fontSize={"sm"}>
									★
								</Text>
								<Text
									marginStart={0.5}
									textAlign={"center"}
									fontSize={"12"}
								>
									{movie.vote_average}
								</Text>
							</Badge>
						</Box>

						<Box
							marginTop={"auto"}
							color={"#FFF"}
							backdropFilter={"blur(10px)"}
							borderRadius={5}
							background={
								"linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0))"
							}
							boxShadow={"3px 3px 10px rgba(30,30,30,0.5)"}
							padding={2}
							paddingTop={1}
							paddingBottom={1}
						>
							<Text
								fontSize={"0.8rem"}
								fontWeight={"bold"}
								whiteSpace={"nowrap"}
								overflow={"hidden"}
								textOverflow={"ellipsis"}
							>
								{movie.title}
							</Text>
							<Text fontSize={12} fontWeight={"medium"} marginTop={"-1"}>
								{movie.release_date}
							</Text>
						</Box>
					</Box>
				</Stack>
			</Box>
		</>
	)
}
export default SimilarMovieCard
