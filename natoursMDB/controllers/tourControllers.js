const fs = require('fs');
const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    // Build query

    // 1) Filtering
    const queryObject = { ...req.query }; // Instead of assigning by reference, we use "..." to extract all the fields an put them in an object {}
    const exclude = ['page', 'sort', 'limit', 'fields'];
    exclude.forEach((element) => {
      delete queryObject[element];
    });
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    let query = Tour.find(JSON.parse(queryStr));

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('-price');
    }

    //Execute query
    const tours = await query;
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failure',
      message: error,
    });
  }
};
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failure',
      message: error,
    });
  }
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failure',
      message: 'Invalid data sent',
    });
  }
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //return the updated object rather than the pre-update object
      runValidators: true, //validate the update object (req.body) to the Schema
    });
    res.status(200).send({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failure',
      message: error,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).send({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failure',
      message: error,
    });
  }
};
