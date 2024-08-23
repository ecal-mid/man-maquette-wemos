import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getColor, setColorWemos } from "../firebase";
import iro from "@jaames/iro";
import { set } from "firebase/database";
import { HuePicker, SketchPicker, SliderPicker } from "react-color";
import { HexColorPicker } from "react-colorful";
const OuterContainer = styled.div`
	border-left: 1px solid black;
	border-right: 1px solid black;
	border-bottom: 1px solid black;
`;
const Container = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: stretch;
`;

const WheelColor = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding-top: 0;
`;
const InnerColor = styled.div`
	height: 20vw;

	cursor: pointer;
	border-left: 1px solid black;
	border-bottom: 1px solid black;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => (props.color ? props.color : "blue")};
	border-right: ${(props) =>
		props.num == 3 || props.num == 7 ? "1px solid black" : "none"};
	${(props) =>
		props.num == props.lengthArr - 1 || props.num > 3
			? `
      border-bottom: none;
      `
			: ``};
	${(props) =>
		props.num % 2 == 0 && props.num == props.lengthArr - 1
			? `//grid-column: span 2;
      border-right: 1px solid black;
      `
			: ``};

	${(props) =>
		props.num <= 3
			? `width:25%;
          `
			: `
      width:33.333%;
      `};
`;

const SelectedColContainer = styled.div`
	height: 40px;
	width: 40px;
	background-color: black;
	border-radius: 20px;
`;

export const Colors = ({ selectedColor, name }) => {
	console.log(selectedColor);

	const [isExpanded, setIsExpanded] = useState(false);
	const colorPickerRef = useRef(null);
	const [color, setColor] = useState("#aabbcc");

	const sendToFirebase = (color) => {
		if (name == "wemosadmin") {
			for (let i = 0; i < 20; i++) {
				const nameDB = "wemos" + i;
				setColorWemos(color, nameDB);
			}
		} else {
			setColorWemos(color, name);
		}
	};

	const getInitialColorValue = async () => {
		getColor(name).then((data) => {
			console.log(data);
			// colorPickerRef.current.color.hexString = data.color;
		});
	};

	useEffect(() => {
		if (!colorPickerRef.current) {
			getInitialColorValue();

			// colorPickerRef.current = new iro.ColorPicker("#picker", {
			// 	width: window.innerWidth,

			// 	layout: [
			// 		{
			// 			component: iro.ui.Wheel,
			// 			options: {},
			// 		},
			// 	],
			// });
			// colorPickerRef.current.on("color:change", function (color) {
			// 	// log the current color as a HEX string
			// 	const RGBVALS = color.hexString;
			// 	sendToFirebase(RGBVALS);
			// });
		}
	}, []);
	window.onresize = () => {
		// 	if (colorPickerRef.current) {
		// 		console.log(window.innerWidth, colorPickerRef.current);
		// 		colorPickerRef.current.resize(window.innerWidth);
		// 	}
	};
	return (
		<OuterContainer>
			<Container class="custom-layout">
				<HexColorPicker color={color} onChange={setColor} />
				{/* <WheelColor id="picker"></WheelColor> */}
				{/* {colArr.map((color, i) => (
					<InnerColor
						num={i}
						lengthArr={colArr.length}
						onClick={() => sendToFirebase(color)}
						key={color}
						color={color}
					>
						{selectedColor == color ? (
							<SelectedColContainer></SelectedColContainer>
						) : (
							""
						)}
					</InnerColor>
				))} */}
			</Container>
		</OuterContainer>
	);
};
