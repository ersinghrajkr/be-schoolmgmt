import { UserType } from "../enums";

// Password is not sent in a response
export interface UserResponse {
    id: string | null;
    registrationNo: string | null;
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    userType: UserType;
    // userRole: UserType;

}