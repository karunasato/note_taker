const fs = require("fs");
const path = require("path");


module.exports = function(app){
    //do somehting like assign some routes to the app
    app.get("/api/notes", function(req,res){
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", function(err,data){
            if(err) throw err;
            res.json(JSON.parse(data))
        })
    });
    app.post("/api/notes", function(req,res){
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", function(err,data){
            if(err) throw err;
            const notes = JSON.parse(data);
            notes.push(req.body);
            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes, null, "\t"), err=> {
                res.json("ok")
            })
        })
    });
    app.delete("/api/notes/:id", function(req,res){
        console.log(req.params.id)
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", function(err,data){
            if(err) throw err;
            const notes = JSON.parse(data);
            notes.splice(req.params.id,1)
            fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes, null, "\t"), err=> {
                res.json("success")
            })
        })
    });

}