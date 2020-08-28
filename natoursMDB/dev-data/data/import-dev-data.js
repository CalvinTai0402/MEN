const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');
const e = require('express');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    //Just some config to rid of deprecation warning
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to DB successfully');
  });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
if (process.argv[2] == '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
} else {
  console.log('No data imported or deleted');
  process.exit();
}
