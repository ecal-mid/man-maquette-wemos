import Link from "next/link";
import styled from "styled-components";
const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  h1 {
    margin: 0;
    font-size: 15vw;
    line-height: 100%;
    letter-spacing: -3px;
    text-align: center;
  }
  svg {
    margin-left: 1rem;
    margin-right: 1rem;
    transform: scale(1);
  }
`;

const InnerContainerTitle = styled.div`
  border: 1px solid black;
  flex-grow: 10;
`;
const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid black;
`;

export const Header = ({ name }) => {
  return (
    <Container>
      {typeof name != "undefined" ? (
        <>
          <Link href="/">
            <InnerContainer>
              <svg
                width="40"
                height="47"
                viewBox="0 0 40 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.16009e-07 23.5L39.75 0.550328L39.75 46.4497L3.16009e-07 23.5Z"
                  fill="black"
                />
              </svg>
            </InnerContainer>
          </Link>
          <InnerContainerTitle>
            <h1>WEMOS {name}</h1>
          </InnerContainerTitle>
        </>
      ) : (
        <h1>WEMOS CONTROL PLATFORM</h1>
      )}
    </Container>
  );
};
