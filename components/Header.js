import Link from "next/link";
import styled from "styled-components";
const Container = styled.div`
	display: grid;
	z-index: 1;
	position: absolute;
	padding: 1rem;
	padding-top: 1.5rem;
	bottom: 0;
	grid-template-columns: 1fr;
	width: 100%;
	h1 {
		cursor: pointer;
		margin: 0;
		font-size: 0.8rem;
		line-height: 100%;
		text-align: left;
	}
	svg {
		margin-left: 1rem;
		margin-right: 1rem;
		transform: scale(1);
	}
`;

const InnerContainerTitle = styled.div`
	display: flex;
	justify-content: center;
`;
const InnerContainer = styled.div`
	display: flex;
	align-items: center;
	border-right: none;
`;

export const Header = ({ name }) => {
	return (
		<Container>
			{typeof name != "undefined" ? (
				<>
					<InnerContainerTitle>
						<Link href="/">
							{name == "admin" ? (
								<h1>LIGHT&apos;S BOUQUET CONTROLLER</h1>
							) : (
								<h1>WEMOS {name}</h1>
							)}
						</Link>
					</InnerContainerTitle>
				</>
			) : (
				""
				// <h1>CHOOSE </h1>
			)}
		</Container>
	);
};
