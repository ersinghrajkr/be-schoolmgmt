import { UserType } from '../enums';

export interface UserRequestPayload {
    id: null;
    registrationNo: string | null;
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    password: string;
    userType: UserType;
    // userRole: UserType;

}