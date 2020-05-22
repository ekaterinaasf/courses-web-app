"use strict";

const fs = require("fs");
const path = require("path");
const Joi = require("joi");
const util = require("util");

const config = require("../config");
const DATA_DIR = path.join(__dirname, "/..", config.DATA_DIR, "/courses.json");
//const COURSE_FILE = path.join(__dirname, "/../", "data", "courses.json")

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const controllers = {
  async constructor() {
    this.list = await readFilePromise(DATA_DIR, "utf-8");
    this.courses = JSON.parse(this.list);
  },
  hello: (req, res) => {
    res.json({ api: "courses!" });
  },

  validateCourse: function (course) {
    //Joi https://hapi.dev/module/joi/
    const schema = { name: Joi.string().min(2).required() };
    return Joi.validate(course, schema);
  },

  readList: async (req, res) => {
    try {
      let contents = await readFilePromise(DATA_DIR, "utf8");
      res.send(JSON.parse(contents));
      console.log(contents);
      //res.send(this.courses);
    } catch (err) {
      console.log("Data dir: " + DATA_DIR);
      res.status(404).send(err);
    }
  },

  readCourse: (req, res) => {
    //res.send(req.param.id);
    const course = this.courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
      res
        .status(404)
        .send(`The course with the ID=${req.params.id} does not exist`);
    } else {
      res.send(course);
    }
  },

  addCourse: async (req, res) => {
    const result = validateCourse(req.body);
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      // res.status(400).send('Name is required and should be bigger than 3 symbols');
    } else {
      try {
        const course = {
          id: this.courses.length + 1,
          name: req.body.name,
        };
        //this.courses[Object.keys(this.courses).length + 1] = req.body.name;
        this.courses.push(course);
        await writeFilePromise(DATA_DIR, courses); //convert to array??
        res.send(course);
      } catch (err) {
        res.status(501).send(err);
      }
    }
  },

  updateCourse: async (req, res) => {
    //verify if course exists
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
      res
        .status(404)
        .send(`The course with the ID=${req.params.id} does not exist`);
      return;
    }
    //Validate
    const result = validateCourse(req.body);
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
    }
    try {
      //Update course
      course.name = req.body.name;
      await writeFilePromise(DATA_DIR, courses);
      res.send(course);
    } catch (err) {
      res.status(501).send(err);
    }
  },

  deleteCourse: async (req, res) => {
    //Look up the course
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course)
      res
        .status(404)
        .send(`The course with the ID=${req.params.id} does not exist`);
    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    await writeFilePromise(DATA_DIR, courses);
    //Return the same course
    res.send(course);
  },
};

module.exports = controllers;
