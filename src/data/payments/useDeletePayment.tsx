import axios from "axios";
import { toast } from "react-toastify";

function useDeletePayment(id: number) {
	const deletePayment = async () => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/payments/removePayment.php`,
				{
					id,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200) {
				toast.info("Payment deleted.");

				setTimeout(() => {
					window.location.reload();
				}, 2000);
			} else {
				console.log(response.data.message);
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return deletePayment;
}

export default useDeletePayment;
