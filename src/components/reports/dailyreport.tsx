import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import moment from "moment";
import { HiOutlineChevronDown } from "react-icons/hi";
import useGetReport from "../../data/reports/useGetReport";

type Props = {
	title: string;
	table: string;
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
	if (active) {
		return (
			<div className="card p-2">
				<p>Date: {moment(label).format("DD.MM.YYYY")}</p>
				<p>Count: {payload?.[0].value}</p>
			</div>
		);
	}

	return null;
};

function DailyReport({ title, table }: Props) {
	const [reportPeriod, setReportPeriod] = useState<number>(21);
	const [isOpen, setIsOpen] = useState(false);
	const { isLoading, reportsData } = useGetReport(table, reportPeriod);

	return (
		<div className="card px-4 pt-4 h-fit">
			<div className="relative flex justify-between items-center mb-10">
				<div className="text-xl">{title}</div>

				<div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
					<div className="flex items-center space-x-1">
						<p className="text-sm capitalize">
							{reportPeriod ? reportPeriod : 21} {reportPeriod && reportPeriod > 0 ? "days" : "day"}
						</p>

						<HiOutlineChevronDown className={`h-5 w-5 duration-150 ${isOpen && "rotate-180"}`} />
					</div>

					<div
						className={`absolute top-full right-0 card w-fit rounded-t-none p-0 duration-150 overflow-hidden z-50 ${
							isOpen ? "" : "translate-y-2.5 opacity-0 pointer-events-none"
						}`}
					>
						{[7, 14, 21, 31].map((e) => (
							<div
								className="text-sm capitalize hover:bg-faded cursor-pointer whitespace-nowrap px-4 py-2"
								onClick={() => setReportPeriod(e)}
								key={e}
							>
								{e} {e > 0 ? "days" : "day"}
							</div>
						))}
					</div>
				</div>
			</div>

			{!isLoading ? (
				<div className="relative block h-52">
					{reportsData && reportsData.length > 0 ? (
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart
								width={500}
								height={400}
								data={reportsData}
								margin={{
									top: 10,
									right: 0,
									left: -40,
									bottom: 0,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="day" />
								<YAxis dataKey="count" />
								<Tooltip content={<CustomTooltip />} />
								<Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
							</AreaChart>
						</ResponsiveContainer>
					) : (
						<div className="pill bg-negative text-white w-fit mx-auto px-4">
							No {title.toLocaleLowerCase()} in the past {reportPeriod} days.
						</div>
					)}
				</div>
			) : (
				<div className="loading-animation mx-auto" />
			)}
		</div>
	);
}

export default DailyReport;
