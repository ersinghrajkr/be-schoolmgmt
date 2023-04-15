import { UserEntity } from "../entities/user.entity";
import { UserRequestPayload } from "../request/user.request";
import { UserResponse } from "../response/user.response";


export default class UserMapper {
    public static requestToEntityMapper(requestPayload: UserRequestPayload) {
        let userEntity = new UserEntity();
        // userEntity.id = requestPayload.id;
        userEntity.registrationNo = requestPayload.registrationNo;
        userEntity.firstName = requestPayload.firstName;
        userEntity.middleName = requestPayload.firstName;
        userEntity.lastName = requestPayload.lastName;
        userEntity.dateOfBirth = requestPayload.dateOfBirth;
        userEntity.email = requestPayload.email;
        userEntity.password = requestPayload.password;
        // role: requestPayload.userRole,
        userEntity.type = requestPayload.userType;
        return userEntity;
    }

    public static entityToResponseMapper(entity: UserEntity): UserResponse {
        let userResponse: UserResponse = {
            id: entity.id,
            registrationNo: entity.registrationNo,
            firstName: entity.firstName,
            middleName: entity.firstName,
            lastName: entity.lastName,
            dateOfBirth: entity.dateOfBirth,
            email: entity.email,
            // Password is not mapped
            // userRole: entity.role,
            userType: entity.type,

        }
        return userResponse;
    }
}