import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IdButton } from "./IdButton";
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  column-gap: 0.5rem;
  row-gap: 0.5rem;
`;

export const ChooseWemos = ({ numOfWemos }) => {
  const [wemosArray, setWemosArray] = useState(null);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < numOfWemos; i++) {
      arr.push({ name: "wemos" + i, id: i });
    }
    console.log(arr);
    setWemosArray(arr);
  }, []);
  return (
    <Container>
      {wemosArray != null
        ? wemosArray.map((wemos) => (
            <IdButton key={wemos.name} target={wemos} />
          ))
        : ""}
    </Container>
  );
};
