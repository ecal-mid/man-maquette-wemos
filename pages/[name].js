import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Controler } from "../components/Controler";
import { Header } from "../components/Header";
import app, { firebaseConfig, getWemosInitialValues } from "../components/firebase";
import { getDatabase, ref } from "firebase/database";

const Container = styled.div`
  // padding: 2rem;
`;

const database = getDatabase(app);

const NamePage = () => {
  const route = useRouter();
  const [nameWemos, setNameWemos] = useState(null);

  useEffect(() => {
    setNameWemos("wemos" + route.query.name);
  }, [route]);

  return (
    <Container>
      <Header name={route.query.name}></Header>
      {nameWemos != null && nameWemos != "wemosundefined" ? (
        <Controler id={route.query.name} name={nameWemos}></Controler>
      ) : (
        ""
      )}
    </Container>
  );
};

export default NamePage;
