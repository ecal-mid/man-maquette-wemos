import styled from "styled-components";
import { setIsPowered } from "../../utils/Firebase";
import { BoolButton } from "./BoolButton";
const Container = styled.div``;

const InnerContainer = styled.div`
  cursor: pointer;
`;
export const Power = ({ id, name, isPowered }) => {
  console.log("START POWER", isPowered);
  const sendToFirebase = (numAdmin) => {
    console.log("PUSH ON POWER", isPowered);
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
        <InnerContainer onClick={() => sendToFirebase()}>
          <BoolButton
            isActive={isPowered}
            infos={isPowered == 1 ? "POWER OFF" : "POWER ON"}
            callback={""}
          ></BoolButton>
        </InnerContainer>
      )}
    </Container>
  );
};
