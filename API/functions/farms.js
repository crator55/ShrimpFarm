
const Farms = require('../models/Farms');

exports.getArea=(farm)=>{
    let size=0;
    let sizeFarm={};
    if ( farm !== null && farm.length > 0) {
      farm.forEach(element => {
        size+=element.pond.areaSize;
     });
     sizeFarm ={
        TotalArea:size
    }
  }
    
  return sizeFarm;
}

exports.UpdateinDeletePond= async(id)=>{
  let status =false;
  const farm =await Farms.find({"ponds._id":id});
  farm.forEach(async elemen=>{
     for (let index = 0; index < elemen.ponds.length; index++) {
         if (elemen.ponds[index]._id==id) {
          delete elemen.ponds[index]              
         }
     }
     elemen.ponds = elemen.ponds.filter(item => item);  
     await Farms.findOneAndUpdate(
          {_id:elemen._id},
          elemen,
          {new: true}
                  )
  })
  status=true;
  return status;
}