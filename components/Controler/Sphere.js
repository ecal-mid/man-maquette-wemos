import {
	CameraControls,
	DragControls,
	GradientTexture,
	GradientType,
	PerspectiveCamera,
	PresentationControls,
	TransformControls,
} from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import {
	TextureLoader,
	WebGLRenderTarget,
	LinearFilter,
	RGBAFormat,
} from "three";

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const ThreeFunction = () => {
	console.log("ThreeFunction");
	const { gl, scene, camera } = useThree();
	const renderTarget = useRef(
		new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
			minFilter: LinearFilter,
			magFilter: LinearFilter,
			format: RGBAFormat,
		})
	);

	function readValue() {
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
		console.log(`Central pixel color: rgba(${r}, ${g}, ${b}, ${a / 255})`); // Log the central pixel color
		requestAnimationFrame(readValue);
	}

	useEffect(() => {
		readValue();
	}, [gl, scene, camera]);

	return null;
};

export const Sphere = ({ id, name, data }) => {
	console.log(id, name, data);

	const canvasRef = useRef();
	const colorMap = useLoader(TextureLoader, "/1024x1024.png");

	const transform = useRef();

	return (
		<Container>
			<Canvas ref={canvasRef} gl={{ preserveDrawingBuffer: true }}>
				<ThreeFunction />
				<color attach="background" args={["#fff"]} />

				{/* <CameraControls /> */}
				<ambientLight intensity={1} />
				<directionalLight position={[10, 10, 5]} intensity={1} />
				<PresentationControls
					enabled={true} // the controls can be disabled by setting this to false
					global={true} // Spin globally or by dragging the model
					cursor={true} // Whether to toggle cursor style on drag
					snap={false} // Snap-back to center (can also be a spring config)
					speed={10} // Speed factor
					zoom={3} // Zoom factor when half the polar-max is reached
					rotation={[0, 0, 0]} // Default rotation
					polar={[-Infinity, Infinity]} // Vertical limits
					azimuth={[-Infinity, Infinity]} // Horizontal limits
					config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
				>
					<mesh>
						<sphereGeometry args={[2, 100, 100]} />
						<meshBasicMaterial map={colorMap}>
							{/* <GradientTexture
							stops={[0, 0.25, 0.5, 1]} // As many stops as you want
							colors={["white", "blue", "rgb(0,255,0)", "red"]} // Colors need to match the number of stops
							size={1024} // Size is optional, default = 1024
							width={1024} // Width of the canvas producing the texture, default = 16
							type={GradientType.Radial} // The type of the gradient, default = GradientType.Linear
							innerCircleRadius={0} // Optional, the radius of the inner circle of the gradient, default = 0
							outerCircleRadius={"auto"} // Optional, the radius of the outer circle of the gradient, default = auto
						/> */}
						</meshBasicMaterial>
					</mesh>
				</PresentationControls>
			</Canvas>
		</Container>
	);
};
