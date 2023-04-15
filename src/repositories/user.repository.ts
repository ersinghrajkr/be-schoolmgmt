import { UserEntity } from "../entities/user.entity";
import AppDataSource from "../database/db.config";



export default class UserRepository {
    // public static data: UserEntity[] = [];

    public static async findAllUsers() {

        try {
            return await AppDataSource.getRepository(UserEntity).find();
        } catch (error) {
            throw error
        }
    }

    public static async findUserById(id: string) {

        try {
            return await AppDataSource.getRepository(UserEntity).findOne({ where: { id: id } });
        } catch (error) {
            throw error
        }
    }

    public static async findUserByEmail(email: string) {
        try {
            return await AppDataSource.getRepository(UserEntity).findOne({ where: { email: email } });
        } catch (error) {
            throw error
        }
    }

    public static async deleteUserById(id: string) {

        try {
            return await AppDataSource.getRepository(UserEntity).delete(id);
        } catch (error) {
            throw error
        }
    }

    public static async addUser(user: UserEntity) {
        try {
            return await AppDataSource.getRepository(UserEntity).save(user)
        } catch (error) {
            throw error
        }
    }

    public static async updateUserById(id: string, updateUser: UserEntity) {
        try {
            if (id) {
                return await AppDataSource.getRepository(UserEntity).update(id, updateUser)
            }
        } catch (error) {
            throw new Error(`User Not Found with id - ${id}`)
        }
    }

    public static async updateUserByRegistrationNo(registrationNo: string, updateUser: UserEntity) {
        if (registrationNo) {
            return await AppDataSource.getRepository(UserEntity).update(registrationNo, updateUser)
        } else {
            throw new Error(`User Not Found with registrationNo - ${registrationNo}`)
        }
    }
}