import React, { useState } from 'react'

function Table() {
    const [totalTables,setTotalTables]= useState([])
    const [selection, setSelection] = useState({
        table:{
            name:null,
            _id:null
        },
        date: new Date(),
        time:null,
        location:"Partout",
        size:0
    });


    const [customer,setCustomer] = useState({
        name:"",
        phone:"",
        email:""
    });

    const [restaurants, setRestaurants] = useState([
        "la cabane du pêcheur",
        "le cabanon",
        "le Farid",
        "Le Bideew",
        "la Terrasse d’anvers",
        "la corvette",
        "la calebasse",
        "le Terroubi",
        "le kermel"
    ])

    const  [times, setTimes] = useState([
        "8h",
        "8h30",
        "9h",
        "9h30",
        "10h",
        "10h30",
        "11h",
        "11h30",
        "12h",
        "12h30",
        "13h",
        "13h30",
        "14h",
        "14h30",
        "15h",
        "15h30",
        "16h",
        "16h30",
        "17h",
        "17h30",
        "18h",
        "18h30",
        "19h",
        "19h30",
        "20h",
        "20h30",
        "21h",
        "21h30",
        "22h",
        "22h30",
    ]);

    const [reservationError,setReservationError] = useState(false);

    const getDate = () => {
      const months = [ 
        "Janvier",
        "fevrier",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre  "
      ];
      const date = months[selection.date.getMonth()] + 
      " " + 
      selection.date.getDay() +
      " " +
      selection.date.getFullYear();
      let time =  selection.time > 12 ? time  + 12 + "00" : time + ":00";
      console.log(time);
      const datetime = new Date(date + " " + time);
      return datetime;
    };

    const getEmptyTables = () => {
        let tables = totalTables.filter(table => table.isAvailable);
        return tables.length
    }
   

    

    return (
        <div>
            
        </div>
    )
}

export default Table
