function getStatusColor(status: string) {
	switch (status) {
		case "pending":
			return "yellow";

		case "cancelled":
			return "red";
		case "in progress":
			return "lime";
		case "completed":
			return "green";

		default:
			return "yellow";
	}
}

export default getStatusColor;
