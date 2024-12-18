import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import Blog from './models/Blog.js';

let app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Blogo").then(()=>{
    console.log("Connected to MongoDB");
})



app.get("/",(req,res)=>{
    res.send("Hiii")
})

app.get("/blogs",async (req,res)=>{
    res.json({
        blogs: await Blog.find()
    })
})

app.post("/blogs", async (req,res)=>{
    let {
        title,
        poster,
        content
    } = req.body;
    let blog = new Blog({
        title,
        poster,
        content
    })
    await blog.save();
    res.json(blog);
})


app.put("/blogs",async (req,res)=>{
    let {id,title,poster,content} = req.body;
    let blog = await Blog.findByIdAndUpdate(id,{title,poster,content},{new:true});
    res.json(blog);
    
})



app.delete("/blogs/:id", async (req,res)=>{
    let Id = req.params.id;
    await Blog.findByIdAndDelete(Id);
    res.send("Blog deleted");
});



app.listen(5500,()=>{
    console.log("Server is running on port 5500");
});