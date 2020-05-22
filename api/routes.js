const controllers = require("./controllers.js");
const express = require("express");

const router = express.Router();
//fs.appendFileSync(REPORT_FILE, JSON.stringify(data, null, 2));

router.get("/", controllers.hello);

// write your routes
router.get("/courses", controllers.readList);

router.get("/courses/:id", controllers.readCourse);
//res.send(req.param.id);
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if (!course) {
//         res.status(404).send('The course with the given ID does not exist"); }
// router.send(course);
//     });

// router.get("/posts/:year/:month", (req, res) => {
//   //res.send(req.params);
//   //res.send(req.query); //localhost:3000/api/posts/2018/1?sortBy=name
// });

router.post("/courses", controllers.addCourse);

router.put("/courses/:id", controllers.updateCourse);

router.delete("/courses/:id", controllers.deleteCourse);

module.exports = router;
