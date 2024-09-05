import { useState, useEffect } from "react";
import styled from "styled-components";
const Container = styled.div`
	display: flex;
	justify-content: center;
	cursor: pointer;
	width: fit-content;
	border-radius: 50%;
	height: 2rem;
	width: 2rem;
	mix-blend-mode: difference;
	pointer-events: all;
	transition: all 0.5s ease;
	${(props) =>
		props.isActive
			? `border: 0.3rem solid black ;`
			: `border: 1rem solid black ;`};
`;

const Text = styled.p`
	font-size: 2rem;
	margin: 0;
	text-transform: uppercase;
`;

const OuterContainer = styled.div`
	width: 100vw;
	pointer-events: none;
	border-top: none;
	display: flex;
	justify-content: center;
	padding: 1rem;
`;
export const BoolButton = ({ infos, callback, isActive }) => {
	return (
		<OuterContainer>
			<Container
				onClick={() => {
					callback();
				}}
				isActive={isActive == 1 ? true : false}
			>
				{/* <Text>{infos}</Text> */}
			</Container>
		</OuterContainer>
	);
};

/* CSS */
