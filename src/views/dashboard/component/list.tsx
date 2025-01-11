import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FaTrash, FaEdit } from "react-icons/fa";
import { FormValues } from "./createForm";
import { useNavigate } from "react-router-dom";
export interface ExtendedFormValues extends FormValues {
	formId: string;
}
type PropsType = {
	data: ExtendedFormValues[];
};
function ListHealthCareInformation(props: PropsType) {
	const { data } = props;
	const navigation = useNavigate();
	const [dataTable, setDataTable] = useState(data);
	const handleDelete = (id: string) => {
		const oldData = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data") || "") : [];
		const dataDeleted = oldData?.filter((item: ExtendedFormValues) => item.formId !== id);
		setDataTable([...dataDeleted]);
		localStorage.setItem("data", JSON.stringify([...dataDeleted]));
	};
	const handleEdit = (id: string) => {
		navigation(`/edit/${id}`);
	};
	useEffect(() => {
		setDataTable(data);
	}, [data]);
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th className="!bg-[#bcd0c7]">#</th>
					<th className="!bg-[#bcd0c7]">Form ID</th>
					<th className="!bg-[#bcd0c7]">Full Name</th>
					<th className="!bg-[#bcd0c7]">Object</th>
					<th className="!bg-[#bcd0c7]">Date Of Birth</th>
					<th className="!bg-[#bcd0c7]">Gender</th>
					<th className="!bg-[#bcd0c7]">Contact Province</th>
				</tr>
			</thead>
			<tbody>
				{dataTable?.map((item, index) => {
					return (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>
								<div className="flex flex-row items-center gap-2">
									<FaEdit className="text-blue-500 cursor-pointer" onClick={() => handleEdit(item.formId)} />
									<FaTrash onClick={() => handleDelete(item.formId)} className="text-red-500 cursor-pointer" />
									<span>{item.formId}</span>
								</div>
							</td>
							<td>{item.fullName}</td>
							<td>{item.object}</td>
							<td>{item.dateOfBirth}</td>
							<td>{item.gender}</td>
							<td>{item.mobile}</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
}

export default ListHealthCareInformation;
