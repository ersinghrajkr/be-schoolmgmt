import UserMapper from "../mappers/user.mapper";
import UserRepository from "../repositories/user.repository";
import { UserRequestPayload } from "../request/user.request";
import { UserResponse } from "../response/user.response";
import AuthServices from "./auth.service";
import { UserEntity } from "../entities/user.entity";



export default class UserService {
    // client side parameters request Payload
    public static async addUser(requestPayload: UserRequestPayload) {
        try {
            const newUserPayload = UserMapper.requestToEntityMapper(requestPayload);
            // const isExistingUser = await UserRepository.findUserByEmail(newUserPayload.email);
            // if (isExistingUser) {
            //     throw new Error("User with provided email already exist");
            // }
            const addedUser: UserEntity | null = await UserRepository.addUser(newUserPayload);
            if (addedUser) {
                const newUserToken = AuthServices.generateToken(addedUser.id, addedUser.type);
                return newUserToken;
            }
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    }

    // isExistingUser User
    // public static async isExistingUser(email: string) {
    //     // Check if user with email already exists
    //     const existingUser = await UserRepository.findUserByEmail(email);
    //     if (existingUser) {
    //         throw new Error("User with provided email already exists");
    //     }
    // }


    // delete User
    public static async deleteUser(id: string) {
        const deleteUserResponse = await UserRepository.deleteUserById(id);
        return deleteUserResponse;
    }
    // find 
    public static async findAllUser() {
        let usersResponse: UserResponse[] = (await UserRepository.findAllUsers()).map((user) => {
            return UserMapper.entityToResponseMapper(user);
        });
        return usersResponse;
    }
    // findById 
    public static async findUserById(id: string) {
        let userEntity = await UserRepository.findUserById(id);
        if (userEntity) {
            let userResponse = UserMapper.entityToResponseMapper(userEntity);
            return userResponse;
        }
        else {
            return "User Does Not Exist";
        }
    }


    // findByEmail 
    public static async findUserByEmail(email: string) {
        let userEntity = await UserRepository.findUserByEmail(email);
        if (userEntity) {
            return userEntity;
        }
    }


    // Update user
    public static async updateUserById(id: string, requestPayload: UserRequestPayload) {
        try {
            console.log("requestPayload id", id)
            await UserRepository.updateUserById(id, UserMapper.requestToEntityMapper(requestPayload));
            return "User updateUserById Successfully!!!";
        } catch (error) {
            return error;
        }
    }

    // Update user
    public static async updateUserByregistrationNo(registrationNo: string, requestPayload: UserRequestPayload) {
        try {
            console.log("requestPayload- registrationNo", registrationNo)
            await UserRepository.updateUserByRegistrationNo(registrationNo, UserMapper.requestToEntityMapper(requestPayload));
            return "User updateUserByregistrationNo Successfully!!!";
        } catch (error) {
            return error;
        }
    }
}