const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course 1' },
    { id: 2, name: 'course 2' },
    { id: 3, name: 'course 3' }
];

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
console.log(req.body);
    //Validate
    const { error } = validateCourse(req.body); //result.error (destructured)
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    //Post
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.put('api/courses/:id', (req, res) => {

    //Find course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Courses with given ID was not found');

    //Validate
    const { error } = validateCourse(req.body); //result.error (destructured)
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    //Update course
    course.name = req.body.name;
    res.send(course);

});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Courses with given ID was not found');
    res.send(course);
});


const port = process.env.PORT || 3000; // || means "Else use"
app.listen(port, () => console.log(`Listening on port ${port}...`));

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            // .required()
    });
    return schema.validate({ course });
}