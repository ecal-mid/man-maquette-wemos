// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import App from "next/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
	apiKey: "AIzaSyAzg02dlE_kUnUay4ehOYZal_4CZ2umuVs",
	authDomain: "wemosmaquette.firebaseapp.com",
	databaseURL:
		"https://wemosmaquette-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "wemosmaquette",
	storageBucket: "wemosmaquette.appspot.com",
	messagingSenderId: "650554989595",
	appId: "1:650554989595:web:220d997656be635e19acbe",
};

const app = initializeApp(firebaseConfig);
// firebase.analytics();
export default app;

// Initialize Firebase

export const initFirebase = () => {
	initializeApp(firebaseConfig);

	//setInitVal();
};

export const getWemosInitialValues = async () => {
	const db = getDatabase(app);
	const isMovingRef = ref(db, "wemos1");
	onValue(isMovingRef, (e) => {
		return e.val();
		// console.log(PARAMS.direction);
	});

	// console.log(PARAMS.direction);
};
export const setIsPowered = (val, name) => {
	const db = getDatabase(app);
	console.log(val);
	update(ref(db, name), {
		power: val,
	});
};

export const setIsPulsing = (val, name) => {
	const db = getDatabase(app);
	update(ref(db, name), {
		pulse: val,
		intensity: 25,
	});
};

export const setIntensity = (val, name) => {
	const db = getDatabase(app);
	update(ref(db, name), {
		intensity: val,
		pulse: 0,
	});
};

export const setColorWemos = (val, name) => {
	const db = getDatabase(app);
	update(ref(db, name), {
		color: val,
	});
};

export const getColor = async (name) => {
	return new Promise((resolve, reject) => {
		const db = getDatabase(app);
		const colorRef = ref(db, name);
		onValue(colorRef, (e) => {
			const data = e.val();
			resolve(data);
		});
	});
};

const setInitVal = () => {
	const db = getDatabase();
	for (let i = 0; i < 20; i++) {
		set(ref(db, "wemos" + i), {
			color: "#ffffff",
			power: 0,
			intensity: 255,
			pulse: 0,
		});
	}
};
