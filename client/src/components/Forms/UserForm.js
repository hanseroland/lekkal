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
    pseudo: '',
    email:'',
    isAdmin:'',
    password:'',
    repassword:'',
}


function UserForm({recordForEdit,addOrEdit,...props}) {

   
    const validate = () => {
        let temp = { ...errors }
        temp.pseudo = values.pseudo ? "" : "Le pseudo est requis"
        temp.email = values.email ? "" : "Votre email est requis"
        temp.isAdmin = values.isAdmin ? "" : "Le role  est requis"
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
                                                   name="pseudo" 
                                                   label="Pseudo" 
                                                   value={values.pseudo}
                                                   type="text"
                                                   onChange={handleInputChange}
                                                   {...(errors.pseudo && { error: true, helperText: errors.pseudo })}
                                               />
                                               
                                               <TextField 
                                                   style={{marginBottom:10}} 
                                                   fullWidth 
                                                   variant="outlined"
                                                   name="email" 
                                                   label="Email" 
                                                   value={values.email}
                                                   type="text"
                                                   onChange={handleInputChange}
                                                   {...(errors.email && { error: true, helperText: errors.email })}
                                               />

                                                <TextField 
                                                   style={{marginBottom:10}} 
                                                   fullWidth 
                                                   variant="outlined"
                                                   name="password" 
                                                   label="password" 
                                                   value={values.password}
                                                   type="password"
                                                   onChange={handleInputChange}
                                                   {...(errors.password && { error: true, helperText: errors.password })}
                                               />
                                                 <TextField 
                                                   style={{marginBottom:10}} 
                                                   fullWidth 
                                                   variant="outlined"
                                                   name="repassword" 
                                                   label="Re password" 
                                                   value={values.repassword}
                                                   type="password"
                                                   onChange={handleInputChange}
                                                   {...(errors.repassword && { error: true, helperText: errors.repassword })}
                                               />
                                           
                                           <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">isAdmin</InputLabel>
                                                        <Select
                                                            style={{marginBottom:10}} 
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name="isAdmin"
                                                            value={values.isAdmin}
                                                            onChange={handleInputChange}
                                                            fullWidth
                                                            >
                                                              <MenuItem  value="true">True</MenuItem>
                                                              <MenuItem value="false">False</MenuItem>
                                                              
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

export default UserForm 