/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "react-bootstrap";
import ListHealthCareInformation, { ExtendedFormValues } from "./component/list";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
const PAGE_SIZE = 5;
function Dashboard() {
	const navigation = useNavigate();
	const handleCreate = () => {
		navigation("/create");
	};
	const [itemsPagination, setItemsPagination] = useState<any>([]);
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
	useEffect(() => {
		const totalPages = Math.ceil((data?.length || 0) / PAGE_SIZE);
		const items = [];
		for (let number = 1; number <= totalPages; number++) {
			items.push(
				<Pagination.Item key={number} active={number === page} onClick={() => setPage(number)}>
					{number}
				</Pagination.Item>
			);
		}
		setItemsPagination(items);
	}, [data, page]);
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
					<Pagination size="sm">{itemsPagination}</Pagination>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
