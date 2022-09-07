import styled from "styled-components";
import { setIsPowered } from "../../utils/Firebase";
import { BoolButton } from "./BoolButton";
const Container = styled.div``;

export const Power = ({ id, name, isPowered }) => {
  console.log("START POWER", isPowered);
  const sendToFirebase = () => {
    console.log("PUSH ON POWER", isPowered);
    let e = isPowered;
    if (isPowered == 1) {
      e = 0;
    } else if (isPowered == 0) {
      e = 1;
    }
    setIsPowered(e, name);
  };
  return (
    <Container onClick={() => sendToFirebase()}>
      <BoolButton
        isActive={isPowered}
        infos={isPowered == 1 ? "POWER OFF" : "POWER ON"}
        callback={""}
      ></BoolButton>
    </Container>
  );
};
