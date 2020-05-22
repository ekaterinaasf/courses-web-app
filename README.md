Refactor this https://github.com/ekaterinaasf/RESTproject
from Web-Apps week1 project

const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
{ id: 1, name: 'course1' },
{ id: 2, name: 'course2' },
{ id: 3, name: 'course3' },
];

app.get('/', (req, res) => {
res.send('Hello world!');
});

app.get('/api/courses', (req, res) => {
//res.send([1,2,3]);
res.send(courses);
OR
fs.readFile(path.join(\_\_dirname, COURSES_PATH), 'utf-8',
(err, contents) => {
if (err) res.status(404).send(err);
res.send(JSON.parse(contents));

        });

});

app.post('/api/courses', (req, res) => {
//Joi
const schema = {
Joi.string().min(3).required()
};
const result = Joi.validate(req.body, schema);
console.log(result);

    if (!req.body.name || req.body.name.length < 3) {
        //replace with that using Joi
        //if (result.error) {
        //400 Bad Request
        //res.status(400).send(result.error.details[0].message);
        res.status(400).send('Name is required and should be bigger than 3 symbols');
        return;
    }
    //we can later replace this validation logic with joi
    //install #nmp i joi
    // #npm i joi@13.1.0
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);

})

app.get('/api/courses/:id', (req, res) => {
//res.send(req.param.id);
const course = courses.find(c => c.id === parseInt(req.params.id));
if (!course) { res.status(404).send('The course with the given ID does not exist"); }
res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
//res.send(req.params);
//res.send(req.query); //localhost:3000/api/posts/2018/1?sortBy=name

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.put('/api/courses/', (req, res) => {
//verify if course exists
const course = courses.find(c => c.id === parseInt(req.params.id));
if (!course) {
res.status(404).send('The course with the gived ID does not exist');
return;
}

//Validate
const schema = {
Joi.string().min(3).required()
};
const result = Joi.validate(req.body, schema);
//const result=validateCourse(req.body); //using function, remove block above
//OR
//const { error } =validateCourse(req.body); //same as result.error

    if (result.error) {
        //400 Bad Request
        res.status(400).send(result.error.details[0].message);

        //Update course
        course.name = req.body.name;
        res.send(course);

    }

});

function validateCourse(course) {
const schema = {
Joi.string().min(3).required()
};
return Joi.validate(course, schema);
};

app.delete('/api/courses/:id', (req, res) => {
//Look up the course
const course = couses.find(c => c.id === parseInt(req.params.id));
if (!course) res.status(404).send('The course with the given ID does not exist');

//Delete
const index = courses.indexOf(course);
courses, splice(index, 1);

    //Return the same course
    res.send(course);

})

// online service postman - to create http request with different methods

//npmjs.com
