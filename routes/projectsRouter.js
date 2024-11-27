const express = require("express");
const router = new express.Router();
const connection = require("../config/db");

router.post("/createproject",(req,res) => {
    const {ProjectDate , ProjectTitle, ProjectInfo, ProjectPhoto} = req.body;
    const que = "INSERT INTO projects (ProjectDate, ProjectTitle,ProjectInfo, ProjectPhoto) VALUES (?, ?, ?, ?)";

    connection.query(que, [ProjectDate, ProjectTitle, ProjectInfo, ProjectPhoto], (err, data) => {
        if (err) return res.json(err)
        return res.json("Project created");
    })
})

router.get("/getproject", (req, res) => {
    const que = "SELECT * FROM projects"
    connection.query(que, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

router.get("/getproject/:id", (req, res) => {
    const que = "SELECT * FROM projects WHERE ProjectID=?";
    const id = req.params.id;
    connection.query(que, [id], (err, data) => {
        if (err) return res.json(err)
        return res.json(data[0])
    })
})

router.delete("/deleteproject/:id", (req, res) => {
    const que = "DELETE FROM projects WHERE ProjectID = ?";
    const id = req.params.id;
     connection.query(que, [id], (err, data) => {
        if (err) return res.json("Error");
        return res.json("Project has been deleted");
    });
});

router.patch("/editproject/:id", (req, res) => {
    const que = "UPDATE projects SET ProjectDate=?, ProjectTitle=?, ProjectInfo=?, ProjectPhoto=? WHERE ProjectID=? ";
    const values = [
        req.body.ProjectDate,
        req.body.ProjectTitle,
        req.body.ProjectInfo,
        req.body.ProjectPhoto,   
    ]

    const id = req.params.id;

    connection.query(que, [...values, id], (err, data) => {
        if (err) return result.json("Error");
        return res.json({ message: "Project Updated Successfully"});
    });
});


module.exports = router