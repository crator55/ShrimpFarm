const Ponds = require('../models/Ponds');
const Farms = require('../models/Farms');
const farmsFunctions = require('../functions/farms');


exports.newPond = async(req,res,next)=>{

const Pond = new Ponds(req.body);
    try {
        await Pond.save();
        res.json({message:'New Pond saved succesfully'});
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.showPonds =async(req,res,next)=>{

    try {
        const ponds = await Ponds.find({});
        res.json(ponds);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.showPond = async(req,res,next)=>{

    try {
        const pond =await Ponds.findById(req.params.idPond);
        if (!pond) {
            res.json({message: 'Pond did not founded.'});
            next();
        }
        res.json(pond);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.updatePond =async(req,res,next)=>{

    try {
        const pond = await Ponds.findOneAndUpdate(
            {_id:req.params.idPond},
            req.body,
            {new: true}
        );
        res.json(pond);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.deletePond= async(req,res,next)=>{
    try {
      if (  !farmsFunctions.UpdateinDeletePond(req.params.idPond)) {
        res.json({message: 'Pond did not founded.'});
        next();
      }
        await Ponds.findOneAndDelete(
                {_id:req.params.idPond}
            );
              
            res.json({message:"Pond succesfuly deleted!"})
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.findPond= async(req,res,next)=>{
    try {
        const {query} =req.params
       const pond= await Ponds.find(
        {name:new RegExp(query,'i')}
        );
        res.json(pond)
    } catch (error) {
        console.log(error);
        next();
    }
}

