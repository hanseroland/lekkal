const router = require('express').Router();
const resController = require('../controllers/reservation.controller');


//CRUD
router.get('/', resController.getAllReservation);
router.get("/count", resController.countReservation);
router.get("/stats", resController.statistiques);
router.get('/:id', resController.getReservation);
router.post('/',resController.create);
router.put('/:id',resController.update);
router.delete('/:id',resController.delete);



module.exports = router;