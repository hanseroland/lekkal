const router = require('express').Router();
const restauController = require('../controllers/restaurants.controller');
const multer = require('multer');
const maxSize = 2*1024*1024;



let storage = multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,__dirname + "/../client/public/uploads/products/");
        },
        filename:(req,file,cb)=>{
            const fileName = Date.now()+file.originalname
            cb(null,fileName);
        }
      });
const upload = multer({storage:storage,limits:maxSize});


//crud
router.get('/',restauController.getRestaurants);
router.get("/count", restauController.countRestau);
router.get('/:id', restauController.getRestaurant);
router.post('/',upload.single('image'), restauController.create);
router.put('/:id', restauController.update);
router.delete('/:id', restauController.delete);
 

//tables
router.patch("/add-table/:id", restauController.addTable); 
router.patch("/edit-table/:id", restauController.editTable);
router.patch("/delete-table/:id",restauController.deleteTable);

module.exports = router;