import { Box, Stack, Text } from "@chakra-ui/react"
import { FC } from "react"
import { Cast } from "../types/Cast"

const CastCard: FC<{ cast: Cast }> = ({ cast }) => {
	const imageUrl = cast.profile_path
		? `https://image.tmdb.org/t/p/w200/${cast.profile_path}`
		: "http://www.gravatar.com/avatar/?d=identicon&s=400"

	return (
		<>
			<Box
				background={"gray.800"}
				backgroundSize={"cover"}
				justifySelf={"center"}
				width={"100%"}
				height={{
					base: "200px",
					sm: "250px",
					md: "250px",
					lg: "240px",
					xl: "250px",
				}}
				padding={1}
				borderRadius={"10"}
				overflow={"hidden"}
			>
				<Stack height={"100%"}>
					<Box
						borderRadius={8}
						overflow="hidden"
						background={
							"Linear-gradient(180deg, rgba(10, 10, 10, 0.1), rgba(0, 0, 0, 1) 200%), url(" +
							imageUrl +
							")"
						}
						backgroundSize={"cover"}
						height={"100%"}
						padding={1.5}
						display={"flex"}
						flexDirection="column"
					>
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
								{cast.original_name}
							</Text>
							<Text
								fontSize={12}
								whiteSpace={"nowrap"}
								overflow={"hidden"}
								textOverflow={"ellipsis"}
								fontWeight={"medium"}
								marginTop={"-1"}
							>
								{cast.character}
							</Text>
						</Box>
					</Box>
				</Stack>
			</Box>
		</>
	)
}
export default CastCard
