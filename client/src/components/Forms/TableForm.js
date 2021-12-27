import React,{useEffect} from 'react'
import { 
    Button,
    Grid,
    Box, 
    Container, 
    TextField,
    Select,
    MenuItem, 
    InputLabel, 
    FormControl,
} from '@mui/material'
import useForm from './useForm'


const initialFieldValues = {
    _id: '',
    name: '',
    capacity:'',
    isAvailable:'',
    location:'',
}


function TableForm({recordForEdit,addOrEdit,...props}) {

   
    const validate = () => {
        let temp = { ...errors }
        temp.name = values.name ? "" : "Le nom est requis"
        temp.capacity = values.capacity ? "" : "La capacité est requise"
        temp.isAvailable = values.isAvailable ? "" : "Ce champ est requis"
        temp.location = values.location ? "" : "La localisation de la table est requise"
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
                                                   name="capacity" 
                                                   label="Capacité" 
                                                   value={values.capacity}
                                                   type="text"
                                                   onChange={handleInputChange}
                                                   {...(errors.capacity && { error: true, helperText: errors.capacity })}
                                               />
                                           
                                           <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">isAvailable</InputLabel>
                                                        <Select
                                                            style={{marginBottom:10}} 
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="isAvailable"
                                                            value={values.isAvailable}
                                                            onChange={handleInputChange}
                                                            fullWidth
                                                            >
                                                              <MenuItem  value="true">True</MenuItem>
                                                              <MenuItem value="false">False</MenuItem>
                                                              
                                                        </Select>
                                                </FormControl>

                                                <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Localisation</InputLabel>
                                                        <Select
                                                            style={{marginBottom:10}} 
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="location"
                                                            value={values.location}
                                                            onChange={handleInputChange}
                                                            fullWidth
                                                            >
                                                              <MenuItem  value="interieur">Interieur</MenuItem>
                                                              <MenuItem value="exterieur">Exterieur</MenuItem>
                                                              
                                                        </Select>
                                                </FormControl>
                                               
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

export default TableForm 