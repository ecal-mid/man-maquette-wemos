import { useEffect, useState } from "react";
import styled from "styled-components";
import app from "../firebase";
import { Power } from "./Power";
const Container = styled.div``;
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { Colors } from "./Colors";
import { useList } from "react-firebase-hooks/database";
import { Intensity } from "./Intensity";
import { Pulse } from "./Pulse";
import { BoolButton } from "./BoolButton";
import { Sphere } from "./Sphere";

const database = getDatabase(app);

export const Controler = ({ id, name, data }) => {
	const [wemosVal, setWemosVal] = useState(null);
	const [seeColorModule, setSeeColorModule] = useState(false);
	const [snapshots, loading, error] = useList(ref(database, name));

	useEffect(() => {
		const obj = {};
		for (let i in snapshots) {
			if (typeof snapshots[i].key != "undefined") {
				obj[snapshots[i].key] = snapshots[i]._node.value_;
			}
		}
		setWemosVal(obj);
	}, [snapshots]);
	return (
		<Container>
			{wemosVal != null ? (
				<>
					{/* <Power id={id} name={name} isPowered={wemosVal.power}></Power>
					{wemosVal.power != 0 && wemosVal != null ? (
						<>
							<Colors name={name} selectedColor={wemosVal.color} />
							<Intensity
								id={id}
								name={name}
								selectedIntensity={wemosVal.intensity}
							></Intensity>
							<Pulse id={id} name={name} isPulsing={wemosVal.pulse}></Pulse>
						</>
					) : (
						""
					)} */}
				</>
			) : (
				""
			)}
			<Sphere id={id} name={name} data={data}></Sphere>
		</Container>
	);
};
