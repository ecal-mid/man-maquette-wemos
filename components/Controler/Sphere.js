import {
	CameraControls,
	PerspectiveCamera,
	shaderMaterial,
	useTexture,
} from "@react-three/drei";
import { Canvas, extend, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as THREE from "three";
import fragmentShader from "./shader/fragment.glsl";
import vertexShader from "./shader/vertex.glsl";
import {
	TextureLoader,
	WebGLRenderTarget,
	LinearFilter,
	RGBAFormat,
} from "three";
import { setColorWemos } from "../firebase";
import { set } from "firebase/database";
import { SphereMesh } from "./SphereMesh";

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100svh;
	overflow: hidden;
`;

let Picker = styled.div`
	width: 100px;
	height: 100px;
	background-color: ${(props) => props.color};
`;
let color = {
	current: "rgba(255,255,255)",
	last: "rgba(255,255,255)",
	backgroundColor: "rgba(255,255,255)",
};

let pointerIsDownState = false;
const GetColorOfCanvas = ({ name }) => {
	let time = { current: 0, last: 0 };
	const { gl, scene, camera } = useThree();
	const renderTarget = useRef(
		new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
			minFilter: LinearFilter,
			magFilter: LinearFilter,
			format: RGBAFormat,
		})
	);

	function readValue() {
		console.log("readValue");
		time.current = Date.now();
		const centerX = Math.floor(window.innerWidth / 2);
		const centerY = Math.floor(window.innerHeight / 2);
		const pixelBuffer = new Uint8Array(4); // Only need 4 values for one pixel (RGBA)
		gl.setRenderTarget(renderTarget.current);
		gl.render(scene, camera);
		gl.readRenderTargetPixels(
			renderTarget.current,
			centerX,
			centerY,
			1,
			1,
			pixelBuffer
		);
		gl.setRenderTarget(null);
		const [r, g, b, a] = pixelBuffer;
		color.current = `#${r.toString(16).padStart(2, "0")}${g
			.toString(16)
			.padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
		color.backgroundColor = `#${Math.max(r, 20)
			.toString(16)
			.padStart(2, "0")}${Math.max(g, 20)
			.toString(16)
			.padStart(2, "0")}${Math.max(b, 20).toString(16).padStart(2, "0")}`;
		if (color.current !== color.last && time.current - time.last > 0) {
			if (color.current == "#ffffff") {
				setColorWemos("#ffffffff", name);
			} else {
				if (color.current != "#000000") setColorWemos(color.current, name);
			}
			time.last = time.current;
			color.last = color.current;
		}
		requestAnimationFrame(readValue);
	}

	useEffect(() => {
		readValue();
	}, [gl, scene, camera]);

	return null;
};

export const Sphere = ({ id, name, data }) => {
	const canvasRef = useRef();
	const colorMap = useLoader(TextureLoader, "/2048x20489.png");

	return (
		<Container>
			<Canvas
				ref={canvasRef}
				gl={{ preserveDrawingBuffer: true }}
				onPointerDown={(event) => {
					pointerIsDownState = true;
				}}
				onPointerUp={(event) => {
					pointerIsDownState = false;
				}}
			>
				<GetColorOfCanvas name={name} />
				<color attach="background" args={[color.backgroundColor]} />

				<PerspectiveCamera position={[0, 0, 10]} />
				<CameraControls
					truckSpeed={0.002}
					azimuthRotateSpeed={2}
					maxDistance={5}
					minDistance={5}
				/>
				<ambientLight intensity={1} />
				<directionalLight position={[10, 10, 5]} intensity={1} />
				<SphereMesh></SphereMesh>
			</Canvas>
		</Container>
	);
};
