import Link from "next/link";
import styled from "styled-components";
const Container = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: center;
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
