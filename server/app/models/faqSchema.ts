import { Schema, model } from "mongoose";
import { IFaq } from "../interfaces/FaqInterface";

const faqSchema = new Schema<IFaq>({
    question: {
        type: String,
        required: [true, 'Name field is required']
    },
    answer: {
        type: String,
        required: [true, 'Name field is required']
    },
}, { timestamps: true });

const FAQ = model<IFaq>("Faq", faqSchema);
export default FAQ;