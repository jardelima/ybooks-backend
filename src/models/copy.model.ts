import { BookModel } from "./book.model";

export interface CopyModel extends BookModel {
    code_copy: string;
}
