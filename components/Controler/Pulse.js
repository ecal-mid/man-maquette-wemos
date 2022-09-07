import styled from "styled-components";
import { setIsPulsing } from "../firebase";
import { BoolButton } from "./BoolButton";

const Container = styled.div``;

export const Pulse = ({ isPulsing, name, id }) => {
  const sendToFirebase = () => {
    console.log("PUSH ON PULSE", isPulsing);
    let e = isPulsing;
    if (isPulsing == 1) {
      e = 0;
    } else if (isPulsing == 0) {
      e = 1;
    }
    setIsPulsing(e, name);
  };
  return (
    <Container onClick={() => sendToFirebase()}>
      <BoolButton
        isActive={isPulsing}
        infos={isPulsing == 1 ? "PULSE OFF" : "PULSE ON"}
        callback={""}
      ></BoolButton>
    </Container>
  );
};
