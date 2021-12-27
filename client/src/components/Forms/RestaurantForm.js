import React,{useEffect} from 'react'
import { Button,Grid,Box, Container, TextField } from '@mui/material'
import useForm from './useForm'


const initialFieldValues = {
    _id: '',
    name: '',
    address:'',
    telephone:'',
    web:'',
    image:'',
}


function RestaurantForm({recordForEdit,addOrEdit,...props}) {

   
    const validate = () => {
        let temp = { ...errors }
        temp.name = values.name ? "" : "Le nom est requis"
        temp.address = values.address ? "" : "L'adresse est requise"
        temp.telephone = values.telephone ? "" : "Le numéro de téléphone est requis"
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    }

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleInputFileChange,
        resetForm
    } = useForm(initialFieldValues)

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values,resetForm)
        } 
    }

    useEffect(() => {
        if (recordForEdit !== null){
            setValues({
                ...recordForEdit
            })
            setErrors({})
        } 
    }, [recordForEdit])


    return (
        <Container>
            <Grid container>
             <form 
                noValidate 
                autoComplete="off" 
                onSubmit={handleSubmit}
             >
                                       
                                       <Grid  item lg={12} xs={12}>
                                               
                                               <TextField 
                                                   style={{marginBottom:10}} 
                                                   fullWidth 
                                                   variant="outlined" 
                                                   name="name" 
                                                   label="Nom" 
                                                   value={values.name}
                                                   type="text"
                                                   onChange={handleInputChange}
                                                   {...(errors.name && { error: true, helperText: errors.name })}
                                               />
                                               
                                               <TextField 
                                                   style={{marginBottom:10}} 
                                                   fullWidth 
                                                   variant="outlined"
                                                   name="telephone" 
                                                   label="Téléphone" 
                                                   value={values.telephone}
                                                   type="text"
                                                   onChange={handleInputChange}
                                                   {...(errors.telephone && { error: true, helperText: errors.telephone })}
                                               />
                                           
                                               <TextField 
                                                   style={{marginBottom:10}} 
                                                   fullWidth 
                                                   variant="outlined" 
                                                   name="address" 
                                                   label="Adresse" 
                                                   value={values.address}
                                                   type="text"
                                                   onChange={handleInputChange}
                                                   {...(errors.address && { error: true, helperText: errors.address })}
                                               />

                                                <TextField 
                                                   style={{marginBottom:10}} 
                                                   fullWidth 
                                                   variant="outlined" 
                                                   name="web" 
                                                   label="Site web" 
                                                   value={values.web}
                                                   type="text"
                                                   onChange={handleInputChange}
                                                  
                                               />

                                                <TextField 
                                                   style={{marginBottom:10}} 
                                                   fullWidth 
                                                   variant="outlined" 
                                                   name="image" 
                                                   label="Image" 
                                                   value={values.image}
                                                   type="file"
                                                   onChange={handleInputFileChange}
                                                  
                                               />
                                               
                                               <Box p={2}>
                                                   <Button
                                                   style={{backgroundColor:'#0c2474'}}
                                                   variant="contained"
                                                   fullWidth
                                                   size="large"
                                                   color="primary"
                                                   type="submit"
                                                   >
                                                       {recordForEdit ? "Modifier" : "Ajouter"}
                                                   </Button>
                                               </Box>
                                       </Grid>
                                   
                                 </form>
                </Grid>
        </Container>
    )
}

export default RestaurantForm