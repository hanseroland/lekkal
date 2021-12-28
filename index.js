const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const reservationRoutes = require('./routes/reservation');
const restaurantRoutes = require('./routes/restaurants');
const userRoutes = require('./routes/users')


dotenv.config();

mongoose.connect("mongodb+srv://parfaitcarree:"+process.env.DB_USER_PASS+"@clusterlekkal.ce8cl.mongodb.net/test")
        .then(()=>console.log('MongoDB connection succes'))
        .catch((err)=>{
          console.log(err);
});

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));  

app.use('/api/user', userRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/restaurant', restaurantRoutes);

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));
  
    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }


app.listen(process.env.PORT || 5000, ()=>{
    console.log('Le backend server est en marche ...')
});