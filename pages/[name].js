import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Controler } from "../components/Controler";
import { Header } from "../components/Header";
import app, {
	firebaseConfig,
	getWemosInitialValues,
} from "../components/firebase";
import { getDatabase, ref } from "firebase/database";
import Head from "next/head";

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
		<>
			<Head>
				<title>Wemos {route.query.name}</title>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />{" "}
			</Head>
			<Container>
				{/* <Header name={route.query.name}></Header> */}
				{nameWemos != null && nameWemos != "wemosundefined" ? (
					<Controler id={route.query.name} name={nameWemos}></Controler>
				) : (
					""
				)}
			</Container>
		</>
	);
};

export default NamePage;
