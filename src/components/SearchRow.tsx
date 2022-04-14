import { Box, HStack, Text, useColorMode } from "@chakra-ui/react"
import { FC } from "react"
import { Movie } from "../types/Movie"

const SearchRow: FC<{ movie: Movie; css: {} }> = ({ movie, css }) => {
	const { colorMode } = useColorMode()
	return (
		<>
			<Box
				_hover={{ background: colorMode === "dark" ? "#2e3c57" : "#d5d5d5" }}
				style={css}
			>
				<HStack>
					<Text
						marginX={2}
						padding={0.2}
						whiteSpace={"nowrap"}
						overflow={"hidden"}
						textOverflow={"ellipsis"}
					>
						{movie.title}
					</Text>
				</HStack>
			</Box>
		</>
	)
}
export default SearchRow
