import { Search2Icon, SunIcon, MoonIcon } from "@chakra-ui/icons"
import {
	useColorMode,
	Box,
	InputGroup,
	InputLeftElement,
	Input,
	InputRightElement,
	SimpleGrid,
	Text,
	useOutsideClick,
} from "@chakra-ui/react"
import { FC, useRef, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { Link } from "react-router-dom"
import Loader from "../components/Loader"
import MovieCard from "../components/MovieCard"
import SearchRow from "../components/SearchRow"
import useFetchMovies from "../hooks/useFetchMovies"
import useSearchMovies from "../hooks/useSearchMovies"

const Homepage: FC = () => {
	const [page, setPage] = useState<number>(1)
	const [searchText, setSearchText] = useState<string>("a")
	const [hideSearchResult, setHideSearchResult] = useState<boolean>(true)
	const { colorMode, toggleColorMode } = useColorMode()
	const { searchMovies } = useSearchMovies(searchText)
	const { movies } = useFetchMovies(page)
	const searchContainer = useRef<any>()
	useOutsideClick({
		ref: searchContainer,
		handler: () => setHideSearchResult(true),
	})

	function handleScrollEnd() {
		setPage(() => page + 1)
	}

	function handleSearchText(searchText: string) {
		if (searchText.length > 0) {
			setSearchText(searchText)
			setHideSearchResult(false)
		} else {
			setHideSearchResult(true)
		}
	}

	console.log(searchMovies)
	return (
		<>
			<Box
				background={colorMode === "dark" ? "#1A202CDD" : "#FFFFFFDD"}
				padding={2}
				position={["sticky", "-webkit-sticky"]}
				marginTop={"5"}
				w={"100%"}
				zIndex={1}
				display={"flex"}
				alignItems={"center"}
				justifyContent={"center"}
				flexDirection={"column"}
				top={0}
				backdropFilter="blur(10px)"
			>
				<Text margin={"1"} fontSize={"18"} fontWeight={"bold"}>
					Movie Database
				</Text>
				<InputGroup w={{ base: "86%", lg: "45%" }} marginTop={2}>
					<InputLeftElement
						className="InputLeft"
						pointerEvents="none"
						children={<Search2Icon className="SearchIcon" color="gray.700" />}
					/>
					<Input
						ref={searchContainer}
						textColor={colorMode === "dark" ? "gray.300" : "gray.700"}
						className="Input"
						variant="outline"
						placeholder={`Search Movies`}
						paddingBottom={{ base: "0", lg: "1" }}
						focusBorderColor={colorMode === "dark" ? "#EEEEEE" : "#111111"}
						onChange={(e) => {
							handleSearchText(
								e.currentTarget.value === " "
									? "+"
									: e.currentTarget.value,
							)
						}}
						onFocus={(event) => {
							if (event.currentTarget.value != "") {
								setHideSearchResult(false)
							}
						}}
					/>
					<InputRightElement
						margin={0}
						children={
							<Box
								onClick={toggleColorMode}
								_hover={{
									background:
										colorMode === "dark" ? "#2e3c57" : "#d5d5d5",
								}}
								cursor={"pointer"}
								marginRight={1}
								borderRadius={5}
								padding={1.5}
								background={colorMode === "dark" ? "#222d42" : "#e5e5e5"}
								display={"flex"}
								justifyContent="center"
								alignItems={"center"}
							>
								{colorMode === "dark" ? (
									<SunIcon className="SunIcon" color="white" />
								) : (
									<MoonIcon className="MoonIcon" color="gray" />
								)}
							</Box>
						}
					/>
				</InputGroup>

				<Box
					ref={searchContainer}
					paddingTop={1}
					paddingBottom={1}
					hidden={hideSearchResult}
					borderRadius={8}
					zIndex={5}
					overflow={"hidden"}
					maxHeight={"300px"}
					marginTop={4}
					top={20}
					w={{ base: "86%", lg: "45%" }}
					background={colorMode === "dark" ? "#222d42" : "#e5e5e5"}
					position={"absolute"}
				>
					{searchMovies.map((movie, index) => (
						<Link
							key={movie.id}
							to={`/movie/${movie.id}`}
							style={{ textDecoration: "none" }}
						>
							<SearchRow key={index} movie={movie} />
						</Link>
					))}
				</Box>
			</Box>
			<Box padding={{ base: "1.5rem", lg: "2rem" }}>
				<InfiniteScroll
					dataLength={movies.length}
					next={handleScrollEnd}
					hasMore={true}
					loader={
						<Box
							marginTop={"1rem"}
							w="100%"
							display={"flex"}
							flexDirection={"column"}
							justifyContent={"center"}
							alignItems={"center"}
						>
							<Loader />
							<Text>Loading Movies</Text>
						</Box>
					}
				>
					<SimpleGrid
						alignContent={"center"}
						columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
						gridGap={"4"}
					>
						{movies?.map((movie) => (
							<Link
								key={movie.id}
								to={`/movie/${movie.id}`}
								style={{ textDecoration: "none" }}
							>
								<MovieCard key={movie.id} movie={movie} />
							</Link>
						))}
					</SimpleGrid>
				</InfiniteScroll>
			</Box>
		</>
	)
}

export default Homepage
