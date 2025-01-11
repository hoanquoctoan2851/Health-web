import "bootstrap/dist/css/bootstrap.min.css";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import { ExtendedFormValues } from "./list";
import { LIST_COUNTRY, LIST_GENDER, LIST_OBJECT } from "@/utils/contanst";
import { useNavigate, useParams } from "react-router-dom";
interface TravelInfo {
	departureDate: string;
	immigrationDate: string;
	departure: string;
	destination: string;
}

export interface FormValues {
	fullName: string;
	object: string;
	dateOfBirth: string;
	gender: string;
	nationality: string;
	nationID: string;
	travel: TravelInfo[];
	province: string;
	district: string;
	address: string;
	email: string;
	mobile: string;
	symptoms: string[];
	vaccine: string;
}

const initialValues: FormValues = {
	fullName: "",
	object: "",
	dateOfBirth: "",
	gender: "",
	nationality: "",
	nationID: "",
	travel: [],
	province: "",
	district: "",
	address: "",
	email: "",
	mobile: "",
	symptoms: [],
	vaccine: "None"
};

const validationSchema = Yup.object({
	province: Yup.string().required("Province is required"),
	district: Yup.string().required("District is required"),
	address: Yup.string().required("Address is required"),
	email: Yup.string().email("Invalid email format").required("Email is required"),
	mobile: Yup.string()
		.matches(/^[0-9]+$/, "Mobile number must be numeric")
		.min(10, "Mobile number must be at least 10 digits")
		.required("Mobile is required"),
	fullName: Yup.string().required("Name is required"),
	object: Yup.string().required("Object is required"),
	dateOfBirth: Yup.string().required("Date of birth is required"),
	gender: Yup.string().required("Gender is required"),
	nationality: Yup.string().required("Nationality is required"),
	nationID: Yup.string().required("Nation ID is required"),
	travel: Yup.array().of(
		Yup.object().shape({
			departureDate: Yup.string().required("Departure date is required"),
			immigrationDate: Yup.string().required("Immigration date is required"),
			departure: Yup.string().required("Departure is required"),
			destination: Yup.string().required("Destination is required")
		})
	)
});
function generateRandomString() {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < 5; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters[randomIndex];
	}
	return result;
}
const PersonalInformationForm: React.FC = () => {
	const [defaultValue, setDefaultValue] = useState(initialValues);
	const navigation = useNavigate();
	const handleSubmit = (values: FormValues) => {
		const formIdFromParams = id;

		const oldData = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data") || "") : [];

		const updatedData = oldData.map((item: ExtendedFormValues) => (item.formId === formIdFromParams ? { ...values } : item));

		if (!updatedData.some((item: ExtendedFormValues) => item.formId === formIdFromParams)) {
			updatedData.push({
				...values,
				formId: generateRandomString()
			});
		}

		localStorage.setItem("data", JSON.stringify(updatedData));
		navigation("/");
	};
	const { id } = useParams();
	useEffect(() => {
		if (id) {
			const oldData = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data") || "") : [];
			const detail = oldData?.find((item: ExtendedFormValues) => item.formId === id);
			setDefaultValue(detail);
		}
	}, [id]);

	return (
		<div className="mb-12">
			<p className="mb-4 text-2xl font-bold">Personal Information</p>
			<Formik
				key={JSON.stringify(defaultValue)}
				initialValues={defaultValue}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ values, handleSubmit, resetForm }) => (
					<Form onSubmit={handleSubmit}>
						{/* Personal Information */}
						<Row className="mb-3">
							<Col>
								<label>Full name*</label>
								<Field name="fullName" type="text" placeholder="Full name..." className="form-control" />
								<ErrorMessage name="fullName" component="div" className="text-danger" />
							</Col>
						</Row>
						<Row className="mb-3">
							<Col>
								<label>Object*</label>
								<Field name="object" as="select" className="form-control">
									{LIST_OBJECT.map(option => (
										<option value={option.value}>{option.label}</option>
									))}
								</Field>
								<ErrorMessage name="object" component="div" className="text-danger" />
							</Col>
						</Row>
						<Row className="mb-3">
							<Col>
								<label>Date of birth*</label>
								<Field name="dateOfBirth" type="date" className="form-control" />
								<ErrorMessage name="dateOfBirth" component="div" className="text-danger" />
							</Col>
							<Col>
								<label>Gender*</label>
								<Field name="gender" as="select" className="form-control">
									{LIST_GENDER.map(option => (
										<option value={option.value}>{option.label}</option>
									))}
								</Field>
								<ErrorMessage name="gender" component="div" className="text-danger" />
							</Col>
						</Row>
						<Row className="mb-3">
							<Col>
								<label>Nationality*</label>
								<Field name="nationality" as="select" className="form-control">
									{LIST_COUNTRY.map(option => (
										<option value={option.code} key={option.code}>
											{option.name}
										</option>
									))}
								</Field>
								<ErrorMessage name="nationality" component="div" className="text-danger" />
							</Col>
							<Col>
								<label>Nation ID or Passport ID*</label>
								<Field name="nationID" type="text" className="form-control" placeholder="Nation ID or Passport ID ..." />
								<ErrorMessage name="nationID" component="div" className="text-danger" />
							</Col>
						</Row>
						<p className="mb-4 text-2xl font-bold">Travel:</p>
						<div>
							<FieldArray name="travel">
								{({ push, remove }) => (
									<>
										{values.travel.length ? (
											values.travel.map((_, index) => (
												<div key={index} className="p-3 mb-3 border">
													<p>Travel {index + 1}</p>
													<Row className="mb-3">
														<Col>
															<label>Departure Date</label>
															<Field name={`travel[${index}].departureDate`} type="date" className="form-control" />
															<ErrorMessage name={`travel[${index}].departureDate`} component="div" className="text-danger" />
														</Col>
														<Col>
															<label>Immigration Date</label>
															<Field name={`travel[${index}].immigrationDate`} type="date" className="form-control" />
															<ErrorMessage name={`travel[${index}].immigrationDate`} component="div" className="text-danger" />
														</Col>
													</Row>
													<Row className="mb-3">
														<Col>
															<label>Departure*</label>
															<Field name={`travel[${index}].departure`} as="select" className="form-control">
																{LIST_COUNTRY.map(option => (
																	<option value={option.code} key={option.code}>
																		{option.name}
																	</option>
																))}
															</Field>
															<ErrorMessage name={`travel[${index}].departure`} component="div" className="text-danger" />
														</Col>
														<Col>
															<label>Destination*</label>
															<Field name={`travel[${index}].destination`} as="select" className="form-control">
																{LIST_COUNTRY.map(option => (
																	<option value={option.code} key={option.code}>
																		{option.name}
																	</option>
																))}
															</Field>
															<ErrorMessage name={`travel[${index}].destination`} component="div" className="text-danger" />
														</Col>
													</Row>
													<div className="flex items-center gap-6 mt-6">
														<Button variant="danger" onClick={() => remove(index)}>
															Delete
														</Button>
														{index === values.travel?.length - 1 ? (
															<Button
																variant="warning"
																onClick={() =>
																	push({
																		departureDate: "",
																		immigrationDate: "",
																		departure: "",
																		destination: ""
																	})
																}
															>
																Add more
															</Button>
														) : null}
													</div>
												</div>
											))
										) : (
											<div className="flex flex-row items-center gap-6">
												<span className="text-lg font-semibold">Do you travel in the last 14 days ?</span>
												<Button
													variant="warning"
													onClick={() =>
														push({
															departureDate: "",
															immigrationDate: "",
															departure: "",
															destination: ""
														})
													}
												>
													Add more
												</Button>
											</div>
										)}
									</>
								)}
							</FieldArray>
						</div>
						<Row className="mb-3">
							<Col>
								<label>Province*</label>
								<Field as="select" name="province" className="form-control">
									<option value="">-----Choose-----</option>
									<option value="province1">Province 1</option>
									<option value="province2">Province 2</option>
								</Field>
								<ErrorMessage name="province" component="div" className="text-danger" />
							</Col>
							<Col>
								<label>District*</label>
								<Field as="select" name="district" className="form-control">
									<option value="">-----Choose-----</option>
									<option value="district1">District 1</option>
									<option value="district2">District 2</option>
								</Field>
								<ErrorMessage name="district" component="div" className="text-danger" />
							</Col>
						</Row>
						<Row className="mb-3">
							<Col>
								<label>Address*</label>
								<Field name="address" type="text" className="form-control" />
								<ErrorMessage name="address" component="div" className="text-danger" />
							</Col>
							<Col>
								<label>Email*</label>
								<Field name="email" type="email" className="form-control" />
								<ErrorMessage name="email" component="div" className="text-danger" />
							</Col>
							<Col>
								<label>Mobile*</label>
								<Field name="mobile" type="text" className="form-control" />
								<ErrorMessage name="mobile" component="div" className="text-danger" />
							</Col>
						</Row>

						{/* Symptoms Section */}
						<h3>Symptoms:</h3>
						<div className="mb-3">
							<label>
								<Field type="checkbox" name="symptoms" value="Fiber" />
								Fiber
							</label>
							<label className="ms-3">
								<Field type="checkbox" name="symptoms" value="Fever" />
								Fever
							</label>
							<label className="ms-3">
								<Field type="checkbox" name="symptoms" value="Sore throat" />
								Sore throat
							</label>
							<label className="ms-3">
								<Field type="checkbox" name="symptoms" value="Difficulty of breathing" />
								Difficulty of breathing
							</label>
						</div>

						{/* Vaccine Section */}
						<h3>Vaccines:</h3>
						<div className="mb-3">
							<label>
								<Field type="radio" name="vaccine" value="None" />
								None
							</label>
							<label className="ms-3">
								<Field type="radio" name="vaccine" value="Astra Zeneca" />
								Astra Zeneca
							</label>
							<label className="ms-3">
								<Field type="radio" name="vaccine" value="Pfizer" />
								Pfizer
							</label>
							<label className="ms-3">
								<Field type="radio" name="vaccine" value="Moderna" />
								Moderna
							</label>
							<label className="ms-3">
								<Field type="radio" name="vaccine" value="Sinopharm" />
								Sinopharm
							</label>
						</div>
						<div className="flex flex-row items-center gap-3">
							<Button type="submit" variant="success" className="mt-3">
								Submit
							</Button>
							<Button variant="danger" className="mt-3" onClick={() => navigation("/")}>
								Cancel
							</Button>
							<Button
								variant="secondary"
								className="mt-3"
								onClick={() => {
									resetForm();
								}}
							>
								Reset
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default PersonalInformationForm;
