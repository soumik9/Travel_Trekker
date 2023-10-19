import { Schema, model } from "mongoose";

const newsSchema = new Schema<any>({
    title: {
        type: String,
        required: [true, 'Name field is required']
    },
    image: {
        type: String,
        required: [true, 'Image field is required']
    },
    desc: {
        type: String,
        required: [true, 'Description field is required']
    }
}, { timestamps: true });

const News = model<any>("News", newsSchema);
export default News;