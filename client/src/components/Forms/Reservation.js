import React,{useEffect} from 'react'
import { Button,Grid,Box, Container, TextField, Select, MenuItem, InputLabel, FormControl, Paper } from '@mui/material'
import useForm from './useForm'
import { format } from 'date-fns'


const initialFieldValues = {
    _id: '',
    date:format(new Date(), 'MM/dd/yyyy'),
    tableId:'',
    time:'',
    location:'',
    name:'',
    phone:'',
    email:'',
    restaurant:''
    
}

const restauTab = [
    "la cabane du pêcheur",
    "le cabanon",
    "le Farid",
    "le Bideew",
    "la Terrasse d’anvers",
    "la corvette",
    "la calebasse",
    "le Terroubi",
    "le kermel",
]


function ReservationForm({tables,times,addReservation,...props}) {

  
    const validate = () => {
        let temp = { ...errors }
        temp.date = values.date ? "" : "La date de reservation est requise"
        temp.name = values.name ? "" : "Votre nom est requis"
        temp.phone = values.phone ? "" : "Votre téléphone est requis"
        temp.email = values.email ? "" : "Votre email est requis"
        temp.time = values.time ? "" : "Choisissez une heure de reservation"
        temp.location = values.location ? "" : "Choisissez la localisation"
        temp.capacity = values.capacity ? "" : "Choisissez des places"
        temp.restaurant = values.restaurant ? "" : "Choisissez un restaurant"
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
        resetForm
    } = useForm(initialFieldValues)

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addReservation(values,resetForm)
        } 
    }

  


    return (
        <Container maxWidth="md" >
           
             <form 
                noValidate 
                autoComplete="off" 
                onSubmit={handleSubmit}
             >
                              <Grid container spacing={2} >  
                                  <Grid  item lg={6} xs={6}>
                                     
                                        <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Restaurants</InputLabel>
                                                <Select
                                                style={{marginBottom:10}} 
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    name="restaurant"
                                                    value={values.restaurant}
                                                    onChange={handleInputChange}
                                                    fullWidth
                                                    {...(errors.restaurant && { error: true, helperText: errors.restaurant })}
                                                    >
                                                    {restauTab.map(function(val,index){
                                                        return(
                                                            <MenuItem key={index} value={val}>{val}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                        </FormControl>
                                  
                                       
                                       <FormControl fullWidth>
                                       <InputLabel id="demo-simple-select-label">Heures de reservation</InputLabel>
                                            <Select
                                            style={{marginBottom:10}} 
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="time"
                                                value={values.time}
                                                label="Heures de reservation"
                                                onChange={handleInputChange}
                                                fullWidth
                                                {...(errors.time && { error: true, helperText: errors.time })}
                                                >
                                                {times.map(function(val,index){
                                                    return(
                                                        <MenuItem key={val} value={val}>{val}</MenuItem>
                                                    )
                                                })}
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
                                                {...(errors.location && { error: true, helperText: errors.location })}
                                                >
                                                <MenuItem value="interieur">Interieur</MenuItem>
                                                <MenuItem value="exterieur">Exterieur</MenuItem>
                                            </Select>
                                         </FormControl>
                                      
                                          <FormControl fullWidth>
                                           <InputLabel id="demo-simple-select-label">Places</InputLabel>
                                            <Select
                                            style={{marginBottom:10}} 
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="capacity"
                                                value={values.capacity}
                                                onChange={handleInputChange}
                                                fullWidth
                                                {...(errors.capacity && { error: true, helperText: errors.capacity })}
                                                >
                                                    {
                                                        tables.map((item)=>(
                                                                <MenuItem value={item._id}>{item.capacity} </MenuItem>
                                                        ))
                                                    }
                                             
                                            </Select>
                                           
                                         </FormControl>

                                       </Grid>
                                       <Grid  item lg={6} xs={6}>
                                      
                                       <TextField 
                                       style={{marginBottom:10}} 
                                                  id="date"
                                                  label="Date de reservation"
                                                  type="date"
                                                  fullWidth
                                                  defaultValue={values.date}
                                                  sx={{ width: 220 }}
                                                  onChange={handleInputChange}
                                                  InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                                  {...(errors.date && { error: true, helperText: errors.date })}
                                       />
                                      
                                       <TextField 
                                          style={{marginBottom:10}} 
                                            fullWidth 
                                            variant="outlined" 
                                            name="name" 
                                            label="Votre nom" 
                                            value={values.name}
                                            type="text"
                                            onChange={handleInputChange}
                                            {...(errors.name && { error: true, helperText: errors.name })}
                                        />
                                         <TextField 
                                                style={{marginBottom:10}} 
                                                fullWidth 
                                                variant="outlined" 
                                                name="phone" 
                                                label="Votre contact" 
                                                value={values.phone}
                                                type="text"
                                                onChange={handleInputChange}
                                                {...(errors.phone && { error: true, helperText: errors.phone })}
                                            />
                                            <TextField 
                                                style={{marginBottom:10}} 
                                                fullWidth 
                                                variant="outlined" 
                                                name="email" 
                                                label="Votre email" 
                                                value={values.email}
                                                type="text"
                                                onChange={handleInputChange}
                                                {...(errors.email && { error: true, helperText: errors.email })}
                                            />
                                           
                                       </Grid>
                                        
                                        <Box p={2}>
                                                   <Button
                                                   style={{backgroundColor:'#FF7400'}}
                                                   variant="contained"
                                                   fullWidth
                                                   size="large"
                                                   color="primary"
                                                   type="submit"
                                                   >
                                                      reserver
                                                   </Button>
                                        </Box>
                                    </Grid>
                        </form>
                      
        </Container>
    )
}

export default ReservationForm
