const express = require('express');

const router = express.Router();
const farmsController = require('../Controller/farmController');
const pondsController = require('../Controller/pondController');
module.exports = () => {

router.post('/farms',farmsController.newFarm);
router.get('/farms',farmsController.showFarms);
router.get('/farms/:idFarm',farmsController.showFarm);
router.put('/farms/:idFarm',farmsController.updateFarm);
router.delete('/farms/:idFarm',farmsController.deleteFarm);
router.get('/farms/area/:idFarm',farmsController.GetArea);



router.post('/ponds',pondsController.newPond);
router.get('/ponds',pondsController.showPonds);
router.get('/ponds/:idPond',pondsController.showPond);
router.put('/ponds/:idPond',pondsController.updatePond);
router.delete('/ponds/:idPond',pondsController.DeletePond);
router.post('/ponds/find/:query',pondsController.FindPond);


return  router
};
