import { useEffect } from "react";
import styled from "styled-components";
import { setColorWemos } from "../../utils/Firebase";
const OuterContainer = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
const InnerColor = styled.div`
  height: 80px;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  background-color: ${(props) => (props.color ? props.color : "blue")};
  border-right: ${(props) =>
    props.num == 3 || props.num == 7 ? "1px solid black" : "none"};
  ${(props) =>
    props.num == props.lengthArr - 1 || props.num > 3
      ? `
      border-bottom: none;
      `
      : ``};
  ${(props) =>
    props.num % 2 == 0 && props.num == props.lengthArr - 1
      ? `//grid-column: span 2;
      border-right: 1px solid black;
      `
      : ``};
`;

export const Colors = ({ selectedColor, name }) => {
  console.log(selectedColor);
  const colArr = [
    "red",
    "blue",
    "green",
    "yellow",
    "pink",
    "white",
    "cyan",
    "orange",
  ];

  const sendToFirebase = (color) => {
    setColorWemos(color, name);
  };

  useEffect(() => {}, []);
  return (
    <OuterContainer>
      <Container>
        {colArr.map((color, i) => (
          <InnerColor
            num={i}
            lengthArr={colArr.length}
            onClick={() => sendToFirebase(color)}
            key={color}
            color={color}
          >
            {selectedColor == color ? <p>Selected</p> : ""}
          </InnerColor>
        ))}
      </Container>
    </OuterContainer>
  );
};
