import { validate } from "class-validator"


const myValidator = (objectToValidate: object) => {
    validate(objectToValidate).then(errors ) {
        if(errors ) {
            return errors ;
        }
        return objectToValidate
       
    }
}







export default myValidator