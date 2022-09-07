import styled from "styled-components";
import { setIntensity } from "../../utils/Firebase";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100vw;
  flex-wrap: wrap;
  border-right: 1px solid black;
`;

const InnerContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  ${(props) => props.selectedIntensity ? (`background-color: black; color: white;`): ``}
  p {
    margin: 0;
    font-size: 3rem;
  }
`;

export const Intensity = ({ selectedIntensity, name, id }) => {
  const intensArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const sendToFirebase = (e) => {
    let num = e * 25;
    setIntensity(num, name);
  };
  return (
    <Container>
      {intensArray.map((int) => (
        <InnerContainer
          key={int}
          onClick={() => sendToFirebase(int)}
          selectedIntensity={selectedIntensity / 25 == int ? true : false}
        >
          <p>{int}</p>
        </InnerContainer>
      ))}
    </Container>
  );
};
