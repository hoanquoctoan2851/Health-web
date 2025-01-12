import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

interface PaginationProps {
	totalItems: number;
	itemsPerPageOptions: number[];
	onPageChange: (page: number, size: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPageOptions, onPageChange }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		onPageChange(page, itemsPerPage);
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			handlePageChange(currentPage + 1);
		}
	};

	const handlePrev = () => {
		if (currentPage > 1) {
			handlePageChange(currentPage - 1);
		}
	};

	const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const size = Number(event.target.value);
		setItemsPerPage(size);
		setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi kích thước trang
		onPageChange(1, size);
	};

	return (
		<div className="d-flex justify-content-between align-items-center gap-4">
			<Pagination>
				<Pagination.Prev onClick={handlePrev} disabled={currentPage === 1} >Previous</Pagination.Prev>
				{[...Array(totalPages)].map((_, index) => (
					<Pagination.Item key={index + 1} active={index + 1 === currentPage}
													 onClick={() => handlePageChange(index + 1)}>
						{index + 1}
					</Pagination.Item>
				))}
				<Pagination.Next onClick={handleNext} disabled={currentPage === totalPages}>Next</Pagination.Next>
			</Pagination>
			<div>
				<label htmlFor="itemsPerPageSelect" className="me-2">
					<select
						id="itemsPerPageSelect"
						value={itemsPerPage}
						onChange={handleItemsPerPageChange}
						className="form-select d-inline-block w-auto"
					>
						{itemsPerPageOptions.map(size => (
							<option key={size} value={size}>
								{size}
							</option>
						))}
					</select>
					<span className="ml-2">Items/Page:</span>
				</label>
			</div>
		</div>
	);
};

export default CustomPagination;
