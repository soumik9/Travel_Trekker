import * as Yup from "yup";

export const faqSchema = Yup.object().shape({
    question: Yup.string().required("Question is required"),
    answer: Yup.string().required("Answer is required"),
});

export const faqDefaultValues = {
    question: '',
    answer: '',
}