import { useEffect } from "react";
import styled from "styled-components";
import { setColorWemos } from "../firebase";
const OuterContainer = styled.div`
  padding-left: 5vw;
  padding-right: 5vw;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: stretch;
`;
const InnerColor = styled.div`
  height: 20vw;

  cursor: pointer;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
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

  ${(props) =>
    props.num <= 3
      ? `width:25%;
          `
      : `
      width:33.333%;
      `};
`;

const SelectedColContainer = styled.div`
  height: 40px;
  width: 40px;
  background-color: black;
  border-radius: 20px;
`;

export const Colors = ({ selectedColor, name }) => {
  console.log(selectedColor);
  const colArr = ["red", "blue", "green", "yellow", "pink", "white", "cyan"];

  const sendToFirebase = (color) => {
    if (name == "wemosadmin") {
      for (let i = 0; i < 20; i++) {
        const nameDB = "wemos" + i;
        setColorWemos(color, nameDB);
      }
    } else {
      setColorWemos(color, name);
    }
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
            {selectedColor == color ? (
              <SelectedColContainer></SelectedColContainer>
            ) : (
              ""
            )}
          </InnerColor>
        ))}
      </Container>
    </OuterContainer>
  );
};
