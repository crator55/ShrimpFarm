const Farms = require('../models/Farms');
const farmsFunctions = require('../functions/farms');

exports.newFarm = async(req,res,next) => {

    const farm = new Farms(req.body);

    try {
        await farm.save();
        res.json({message:'New farm saved succesfully'});
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.showFarms = async(req,res,next) => {

    try {
        const farms = await Farms.find({}).populate({
            path:'ponds.pond',
            model:'Ponds'
        });
        res.json(farms);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.showFarm = async(req,res,next) => {

    try {
        const farm =await Farms.findById(req.params.idFarm).populate({
            path:'ponds.pond',
            model:'Ponds'
        });
        if (!farm) {
            res.json({message: 'Farm did not founded.'});
            next();
        }
        res.json(farm);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.updateFarm = async(req,res,next) => {

    try {
        const farm = await Farms.findOneAndUpdate(
            {_id:req.params.idFarm},
            req.body,
            {new: true}
        ).populate({
            path:'ponds.pond',
            model:'Ponds'
        });
        res.json(farm);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.deleteFarm = async(req,res,next) => {
    try {
        await Farms.findOneAndDelete(
            {_id:req.params.idFarm}
        );
        res.json({message:"Farm succesfuly deleted!"})
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.GetArea = async(req,res,next) => {
    try {
        const farm =await Farms.findById(req.params.idFarm).populate({
            path:'ponds.pond',
            model:'Ponds'
        });
        if (!farm) {
            res.json({message: 'Farm did not founded.'});
            next();
        }
        res.json(farmsFunctions.GetArea(farm.ponds));
    } catch (error) {
        console.log(error);
        next();
    }
}

