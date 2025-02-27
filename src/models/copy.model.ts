import { BookModel } from "./book.model";

export interface CopyModel extends BookModel {
    status: boolean;
}
