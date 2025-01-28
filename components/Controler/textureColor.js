export const textureColor = (texture) => {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	canvas.width = "1024px";
	canvas.height = "1024px";
	const width = canvas.width;
	const height = canvas.height;
	canvas.style.position = "absolute";
	canvas.style.top = "0px";
	canvas.style.left = "0px";
	canvas.style.zIndex = "1000";
	canvas.style.width = "100px";
	canvas.style.height = "100px";
	document.body.prepend(canvas);

	const init = () => {
		ctx.drawImage(texture.image, 0, 0);
		ctx.fillStyle = "rgb(255, 0, 0)";
		ctx.fillRect(0, 0, width, height);
		loop();
	};

	const loop = () => {
		ctx.drawImage(texture.image, 0, 0);
		ctx.fillStyle = "rgb(255, 0, 0)";
		ctx.fillRect(0, 0, width, height);
		return canvas;
	};
	init();

	return { init, loop };
};
