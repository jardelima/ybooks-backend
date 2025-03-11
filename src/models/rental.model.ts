export interface RentalModel {
    userId: string;
    copyId: string;
    rentalDate: Date;
    returnDate: Date | null;
    isActive: boolean;
}
