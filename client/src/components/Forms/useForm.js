import React, { useState } from "react";

const useForm = (initialFieldValues,setCurrentId) => {

    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    const types = ['image/png','image/jpeg','image/jpg']

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleInputFileChange = e => {
        const { name, value } = e.target.files[0];
        if(value && types.includes(value.type)){
            setValues({
                ...values,
                [name]: value
            }) 
           
        }else{
            setErrors("Selectionnez une image de type png, jpg ou jpeg")
        }
    }

    const resetForm =() =>{
        setValues(initialFieldValues)
        setErrors({}) 
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleInputFileChange,
        resetForm
    };
}

export default useForm;
