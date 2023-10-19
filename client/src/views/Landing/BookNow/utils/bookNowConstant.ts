import * as Yup from "yup";

export const bookingSchema = Yup.object().shape({
    bookingStartDate: Yup.string().required("Start date is required"),
    bookingEndDate: Yup.string().required("End Date is required"),
    address: Yup.string().required("Address is required"),
});

export const bookingDefaultValues = {
    bookingStartDate: '',
    bookingEndDate: '',
    address: '',
}