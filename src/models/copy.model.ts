import { Book } from "./book.model";

export interface Copy extends Book {
    code_copy: string;
}
