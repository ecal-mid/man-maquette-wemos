import {
	Canvas,
	extend,
	useFrame,
	useLoader,
	useThree,
} from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import fragmentShader from "./shader/fragment.glsl";
import vertexShader from "./shader/vertex.glsl";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { a, useSpring, useSpringValue } from "@react-spring/three";
import { map } from "../utils";
const ImageRevealMaterial = shaderMaterial(
	{
		uTexture: new THREE.Texture(),
		uTime: 0,
		uProgress: 0,
		uEnabled: 12,
	},
	vertexShader,
	fragmentShader,
	(self) => {
		self.transparent = true;
	}
);

extend({ ImageRevealMaterial });

export const SphereMesh = ({ id, name, data, _callback }) => {
	const scaleSize = {
		max: map(window.innerWidth, 380, 2000, 0.5, 1.0),
		min: map(window.innerHeight, 380, 2000, 0.1, 0.5),
	};

	const materialRef = useRef();
	const [lightIsOnState, setLightIsOnState] = useState(0);

	const [{ x }] = useSpring(
		{
			x: lightIsOnState,
			config: { mass: 10, tension: 500, friction: 100, precision: 0.0001 },
		},
		[lightIsOnState]
	);

	const [{ l }] = useSpring(
		{
			l: lightIsOnState,
			config: { mass: 2, tension: 500, friction: 50, precision: 0.0001 },
		},
		[lightIsOnState]
	);

	useFrame(({ clock }) => {
		if (materialRef.current) {
			materialRef.current.uTime = clock.elapsedTime;
			materialRef.current.uProgress = light.get();
		}
	});
	const textureMaterial = useTexture("/2048x20489.png", (loadedTexture) => {
		if (materialRef.current) {
			materialRef.current.uTexture = loadedTexture;
		}
	});

	const scale = x.to([0, 1], [scaleSize.min, scaleSize.max]);
	const light = l.to([0, 1], [1.2, -0.3]);

	function onClickHandler() {
		setLightIsOnState((lightIsOnState) => Number(!lightIsOnState));
		console.log("clicked");
	}

	return (
		<>
			<a.group position-x={light}></a.group>
			<a.mesh
				scale={scale}
				onClick={() => {
					onClickHandler();
				}}
			>
				<sphereGeometry attach="geometry" args={[2, 100, 100]} />
				<imageRevealMaterial attach="material" ref={materialRef} />
			</a.mesh>
		</>
	);
};
