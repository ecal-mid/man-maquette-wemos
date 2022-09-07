import { useState, useEffect } from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: center;
  ${(props) => (props.isActive ? `background-color: black; color: white` : ``)}
`;

const Text = styled.p`
  font-size: 15vw;
  margin: 0;
  text-transform: uppercase;
`;

const OuterContainer = styled.div`
  width: 100vw;
  border: 1px solid black;
  border-top: none;
`;
export const BoolButton = ({ infos, callback, isActive }) => {
  return (
    <OuterContainer>
      <Container isActive={isActive == 1 ? true : false}>
        <Text>{infos}</Text>
      </Container>
    </OuterContainer>
  );
};

/* CSS */
