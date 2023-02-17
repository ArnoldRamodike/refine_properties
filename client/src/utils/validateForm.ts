import { Key } from '@mui/icons-material';
import {FormValues} from 'interfaces/property';

export const validateForm = (formValues: FormValues) => {
    const errors: { message: string} = {message: ''};
    let hasError = false;

    Object.keys(formValues).forEach((key) => {
        switch (key) {
            case 'title':
                if (!formValues.title) {
                    errors.message = 'Title is required';
                    hasError = true;
                }
                break;

            case 'description':
                if (!formValues.description) {
                    errors.message = 'Description is required';
                    hasError = true;
                }
                break;
                case 'location':
                    if (!formValues.location) {
                        errors.message = 'location is required';
                        hasError = true;
                    }
                    break;
                    case 'propertyType':
                        if (!formValues.propertyType) {
                            errors.message = 'Property Type is required';
                            hasError = true;
                        }
                        break;

                case 'price':
                    if (!formValues.price) {
                        errors.message = 'Price is required';
                        hasError = true;
                    }
                    break;
        
        
            default:
                hasError = false;
        }
    });
    return{hasError,errors};
};

export const hasChanged = (initialValue: FormValues, currentValues: FormValues) => {
    const initialValueArray = Object.values(initialValue);
    const currentValuesArray = Object.values(currentValues);
    for(let i = 0; i < initialValueArray.length; i++)
    {
        if (initialValueArray[i] !== currentValuesArray[i]) {
            return true;
        }
    }
    return false;
};