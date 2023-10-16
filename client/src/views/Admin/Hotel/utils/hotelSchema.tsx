import * as Yup from "yup";

export const hotelSchema = Yup.object().shape({
    name: Yup.string().required("Hotel Name is required"),
    rating: Yup.string().required('Rating is required')
});