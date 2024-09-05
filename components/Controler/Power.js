import styled from "styled-components";
import { setIsPowered } from "../firebase";
import { BoolButton } from "./BoolButton";
const Container = styled.div``;

const InnerContainer = styled.div`
	pointer-events: none;
	cursor: pointer;
	position: absolute;
	z-index: 1;
`;
export const Power = ({ id, name, isPowered }) => {
	const sendToFirebase = (numAdmin) => {
		let e = isPowered;
		if (isPowered == 1) {
			e = 0;
		} else if (isPowered == 0) {
			e = 1;
		}
		if (name == "wemosadmin") {
			for (let i = 0; i < 20; i++) {
				const nameDB = "wemos" + i;
				setIsPowered(numAdmin, nameDB);
			}
		} else {
			setIsPowered(e, name);
		}
	};
	return (
		<Container>
			{name == "wemosadmin" ? (
				<>
					<InnerContainer onClick={() => sendToFirebase(1)}>
						<BoolButton
							isActive={isPowered}
							infos={isPowered == 1 ? "POWER ON" : "POWER ON"}
							callback={""}
						></BoolButton>
					</InnerContainer>
					<InnerContainer onClick={() => sendToFirebase(0)}>
						<BoolButton
							isActive={isPowered}
							infos={isPowered == 1 ? "POWER OFF" : "POWER OFF"}
							callback={""}
						></BoolButton>
					</InnerContainer>
				</>
			) : (
				<InnerContainer>
					<BoolButton
						isActive={isPowered}
						infos={isPowered == 1 ? "POWER OFF" : "POWER ON"}
						callback={() => sendToFirebase()}
					></BoolButton>
				</InnerContainer>
			)}
		</Container>
	);
};
