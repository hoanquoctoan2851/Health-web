import FormCreateScheduleInformation from "./component/createForm";
function Dashboard() {
	return (
		<div className="flex flex-col items-center justify-center w-full pt-8">
			<div className="w-full max-w-[1280px]">
				<div className="w-full">
					<div className="flex justify-center w-full">
						<span className="text-[36px] font-semibold text-[#198754]">MEDICAL DECLARATION FORM FOR FOREIGN ENTRY</span>
					</div>
				</div>
				<div className="mt-8">
					<FormCreateScheduleInformation></FormCreateScheduleInformation>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
