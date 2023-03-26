import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type Props = {
	status: number;
	current_month_total: number;
	previous_month_total: number;
};

function calculatePercentageDifference(current_month_total: number, previous_month_total: number) {
	const difference = current_month_total - previous_month_total;
	const percentageDifference = (difference / previous_month_total) * 100;
	if (previous_month_total === 0) return current_month_total;
	else return percentageDifference;
}

function Earnings() {
	const [isLoading, setIsLoading] = useState(true);
	const [comparisonData, setComparisonData] = useState<Props>();
	let percentageDifference =
		calculatePercentageDifference(
			Number(comparisonData?.current_month_total),
			Number(comparisonData?.previous_month_total)
		) || 0;

	const getComparisonWithPrevMonth = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_DB_API}/reports/compareEarningsWithPreviousMonth.php`
			);

			if (response.data.status === 200) {
				setIsLoading(false);
				setComparisonData(response.data);
			} else {
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getComparisonWithPrevMonth();
	}, []);

	return (
		<div className="small-card">
			<h6>Earnings</h6>
			<div className="divider mb-2 mt-1" />

			{!isLoading ? (
				<div className="flex items-center justify-between">
					<h4>${comparisonData?.current_month_total}</h4>

					{comparisonData && comparisonData ? (
						<div className={`pill ${percentageDifference > 0 ? "positive" : "negative"}`}>
							<span>
								{percentageDifference > 0
									? `+${percentageDifference.toFixed(2)}`
									: percentageDifference.toFixed(2)}
								%
							</span>
						</div>
					) : (
						<div className="pill bg-faded text-white">0%</div>
					)}
				</div>
			) : (
				<div className="loading-animation mx-auto" />
			)}

			<p className="text-xs text-right text-faded">compared to last month</p>
		</div>
	);
}

export default Earnings;
