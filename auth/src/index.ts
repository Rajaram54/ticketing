import express from 'express';
import {json} from 'body-parser';

const app = express();
app.use(json());

app.get('/api/user/currentuser', (req, res)=>{
    res.send("hi");
})

app.listen(3000, ()=>{
    console.log("listening on port 3000!");
});
