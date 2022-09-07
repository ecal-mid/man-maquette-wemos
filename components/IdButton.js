import Link from "next/link";
import styled from "styled-components";
const Container = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  cursor: pointer;
  p {
    padding-left: 0.5rem;
    font-size: 15vw;
    margin: 0;
    text-transform: uppercase;
  }
  justify-content: start;
  align-items: center;
`;
export const IdButton = ({ target }) => {
  return (
    <Link href={"/" + target.id}>
      <Container>
        <p>{target.name}</p>
      </Container>
    </Link>
  );
};
