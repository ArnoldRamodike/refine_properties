import mongoose from 'mongoose';
import Property from '../mongodb/models/property.js';
import User from '../mongodb/models/user.js';
import * as dotenv from 'dotenv';
import { v2 as cloudinary} from 'cloudinary';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProperties = async (req, res) => {
    const { _end, _order, _start, _sort, title_like = "", propertyType= ""} =req.query;

    const query ={};
        if (propertyType !== '') {
            query.propertyType = propertyType;
        }
        if (title_like) {
            query.title = {$regex: title_like, $options: 'i'}
        }

    try {
        const count = await Property.countDocuments({query});

        const properties = await Property.find({query}).limit(_end).skip(_start).sort({[_sort]: _order})

        res.header('x-total-coiunt', count);
        res.header('access-Control-Expose-Headers', 'x-total-count');

        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getPropertyDetails = async (req, res) => {
   try {
    const {id} = req.params;
    const propertyExists = await Property.findOne({_id: id}).populate('creator');

    if (propertyExists) {
        res.status(200).json(propertyExists)
    } else{
        res.status(404).json({message : 'Property not found!'});
    }
   } catch (error) {
    res.status(500).json({message: error.message});
   }
    
};

const createProperty = async (req, res) => {
    try{
    const {title, description, propertyType, location, price, photo, email} = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

        const user = await User.findOne({email}).session(session);
        if (!user) throw new Error('User not Found')
        const photoUrl = await cloudinary.uploader.upload(photo);
        const newProperty = await Property.create({
            title, description, propertyType, location, price, photo: photoUrl.url, creator: user._id,
        });
    user.allProperties.push(newProperty._id);
    await session.commitTransaction();
    res.status(200).json({message: 'Property Created Successfully.'});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

const updatePropert = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description, propertyType, location,price, photo } = req.body;

        const photoUrl = await cloudinary.uploader.upload(photo)

        await Property.findByIdAndUpdate({_id: id}, {
            title, description, propertyType, location,price, photo: photoUr.url || photo
        });
        res.status(200).json({message: 'Property Updated Successfully.'});
    } catch (error) {
        res.status(500).json({messgae: error.message}); 
    }
};

const deleteProperty = async (req, res) => {
    try {
        const {id} = req.params;

        const propertyToDelete = await Property.findById({_id: id}).populate('creator');

        if(!propertyToDelete) throw new Error('Property not Found');

        const session = await mongoose.startSession();
        session.startTransaction();
        propertyToDelete.remove({session});
        propertyToDelete.creator.allProperties.pull(propertyToDelete);

        await propertyToDelete.creator.save({session});
        await session.commitTransaction();

        res.status(200).json({messgae: 'Property Deleted'});
    } catch (error) {
        res.status(500).json({messgae: error.message}); 
    }
};

export{
    getAllProperties,
    getPropertyDetails,
    createProperty,
    updatePropert,
    deleteProperty,
}