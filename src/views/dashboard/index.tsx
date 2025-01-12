/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "react-bootstrap";
import ListHealthCareInformation, { ExtendedFormValues } from "./component/list";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import CustomPagination from "@/components/Pagination";
const PAGE_SIZE = 5;
function Dashboard() {
	const navigation = useNavigate();
	const handleCreate = () => {
		navigation("/create");
	};
	const [page, setPage] = useState<number>(1);
	const [data, setData] = useState<ExtendedFormValues[]>();
	const [valueSearch, setValueSearch] = useState("");
	const [value] = useDebounce(valueSearch, 500);
	const handleChangeSearch = (value: string) => {
		setValueSearch(value);
	};
	useEffect(() => {
		if (value) {
			setData(preState => {
				const searchFilter = preState?.filter(item => item.fullName.includes(value) || item.mobile.includes(value));
				return searchFilter;
			});
		} else {
			const data = localStorage.getItem("data");
			if (data) {
				const dataParse = JSON.parse(data);
				setData(dataParse);
			}
		}
	}, [value]);
	useEffect(() => {
		const data = localStorage.getItem("data");
		if (data) {
			const dataParse = JSON.parse(data);
			setData(dataParse);
		}
	}, []);
	return (
		<div className="flex flex-col items-center justify-center w-full pt-8">
			<div className="w-full max-w-[1280px]">
				<div className="w-full">
					<div className="flex justify-center w-full">
						<span className="text-[36px] font-semibold">Vietnam Health Declaration for foreign entry</span>
					</div>
					<div className="flex flex-row items-center justify-between w-full mt-6">
						<Form.Control
							type="text"
							id="inputPassword5"
							placeholder="Search"
							className="max-w-[400px]"
							aria-describedby="passwordHelpBlock"
							onChange={e => handleChangeSearch(e.target.value)}
						/>
						<Button variant="success" onClick={() => handleCreate()}>
							New Form
						</Button>
					</div>
				</div>
				<div className="flex flex-col items-center justify-center mt-8">
					<ListHealthCareInformation
						data={data?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) || []}
					></ListHealthCareInformation>
					<CustomPagination totalItems={data?.length || 0} itemsPerPageOptions={[5,10,15,20,25]} onPageChange={(page) => setPage(page)}></CustomPagination>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
