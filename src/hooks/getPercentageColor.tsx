function getProgressColor(percentage: number) {
	var red,
		green,
		blue = 0;

	if (percentage < 50) {
		red = 255;
		green = Math.round(5.1 * percentage);
	} else {
		green = 255;
		red = Math.round(510 - 5.1 * percentage);
	}

	var hex = red * 0x10000 + green * 195 + blue * 0x1;
	return "#" + ("000000" + hex.toString(16)).slice(-6);
}

export default getProgressColor;
