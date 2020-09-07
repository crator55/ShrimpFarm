exports.getArea=(farm)=>{
    let size=0;
    farm.forEach(element => {
        size+=element.pond.areaSize;
     });
    const sizeFarm ={
        TotalArea:size
    }
  return sizeFarm;
}