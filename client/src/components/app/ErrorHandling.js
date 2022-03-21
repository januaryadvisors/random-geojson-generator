import { toast } from "react-toastify";

export const errorHandling = (values) => {
    if (values.num === '') {
        toast.error("Number of features is a mandatory field");
        return false;
    } else if (values.num <= 0) {
        toast.error("Number of features must be greater than 0");
        return false;
    } else if (values.propertyOptions.length !== values.num) {
        toast.error("Number of features has to be equal to number or properties");
        return false;
    } else {
        for (let [index, property] of values.propertyOptions.entries()) {
            if (property.name === '') {
                toast.error(`Feature #${index + 1} property name is empty`);
                return false;
            } else if (!/^[a-zA-Z]+$/.test(property.name)) {
                toast.error(`Property name ${property.name} can contain only letters`);
                return false;
            } else if (property.min < 0) {
                toast.error(`Property ${property.name} minimum value cannot be less than 0`);
                return false;
            } else if (property.max < 0) {
                toast.error(`Property ${property.name} maximum value cannot be less than 0`);
                return false;
            } else if (property.min !== '' && property.max !== '' && property.min > property.max) {
                toast.error(`In ${property.name}, Min cannot be greater than Max`);
                return false;
            } 
        }
    }
    return true;
}