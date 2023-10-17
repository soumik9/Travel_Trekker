import * as Yup from "yup";

export const roomSchema = Yup.object().shape({
    roomNumber: Yup.string().required("Hotel Room number is required"),
    price: Yup.string().required('Price is required')
});