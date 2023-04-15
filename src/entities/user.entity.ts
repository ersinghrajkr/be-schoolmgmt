import { Entity, PrimaryGeneratedColumn, Column, Unique, BeforeInsert, AfterLoad, BeforeUpdate } from "typeorm"
import { UserType, GENDER } from '../enums';
import { IsAlpha, IsDate, IsEmail, Length, MinLength, IsPhoneNumber, Matches, IsTimeZone, MaxLength, IsOptional } from "class-validator";
import bcrypt from 'bcrypt';

@Entity({ name: "User" })
@Unique(["email", "registrationNo"])

export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string 

    @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
    registrationNo: string | null;

    @Column()
    @IsAlpha()
    @MinLength(3, {
        message: 'First Name must be greater than $constraint1 characters, but actual is $value',
    })
    @MaxLength(20, {
        message: 'First Name must be less than $constraint1 characters, but actual is $value',
    })
    firstName: string

    @Column()
    @IsAlpha()
    @Length(3, 20)
    @IsOptional()
    middleName: string

    @Column()
    @IsAlpha()
    @Length(3, 20)
    lastName: string

    @Column()
    // @IsDate()
    dateOfBirth: Date

    @Column({ unique: true })
    @IsEmail()
    email: string

    @Column()
    @Length(6, 20)
    password: string

    @Column({
        type: 'enum',
        enum: UserType,
        default: UserType.STUDENT
    })
    type: UserType

    @BeforeInsert()
    @BeforeUpdate()
    async hashNewPlainPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    @AfterLoad()
    async hashLoadedPassword() {
        this.password = this.password;
        console.log("hashLoadedPassword", this.password)
    }
}

// gender profile pic,title  profession salutation maritalStatus
// @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   firstName: string;

//   @Column()
//   lastName: string;

//   @Column({ nullable: true })
//   registrationNo: string;

//   @Column({ unique: true })
//   email: string;

//   @Column({ select: false })
//   password: string;

//   @Column({ type: 'enum', enum: UserType })
//   type: UserType;

//   @Column({ default: true })
//   isActive: boolean;

//   @Column({ nullable: true })
//   dob: Date;

//   @Column({ nullable: true })
//   contactNo: string;

//   @Column({ nullable: true })
//   address: string;

//   @Column({ nullable: true })
//   profilePicUrl: string;

//   @Column({ nullable: true })
//   bio: string;

//   @Column({ nullable: true })
//   specialization: string;

//   @Column({ nullable: true })
//   experience: number;

//   @Column({ nullable: true })
//   qualification: string;

//   @Column({ nullable: true })
//   designation: string;

//   @Column({ nullable: true })
//   organization: string;

//   @Column({ nullable: true })
//   department: string;

//   @Column({ nullable: true })
//   employeeId: string;

//   @Column({ nullable: true })
//   joiningDate: Date;

//   @Column({ nullable: true })
//   relievingDate: Date;

//   @Column({ nullable: true })
//   role: string;

//   @Column({ nullable: true })
//   createdBy: number;

//   @Column({ nullable: true })
//   updatedBy: number;

//   @Column({ nullable: true })
//   deletedBy: number;

//   @Column({ type: 'timestamp', nullable: true })
//   createdAt: Date;

//   @Column({ type: 'timestamp', nullable: true })
//   updatedAt: Date;

//   @Column({ type: 'timestamp', nullable: true })
//   deletedAt: Date;

//   @Column({ select: false })
//   hashPassword: string;