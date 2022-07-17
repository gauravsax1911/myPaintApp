const express=require('express');
const http=require('http');
const {customAlphabet}=require('nanoid');
const socketio=require('socket.io');
const PORT=process.env.PORT||8000;




const app=express();
const server=http.createServer(app);


const io=socketio(server);

app.use(express.static('public'));
app.set('view engine','ejs');


app.get('/:id',(req,res)=>{
    res.render('home');
});


app.get('/',async (req,res)=>{
   

    
    const nanoid =await customAlphabet('1234567890', 10)
    const  id = await nanoid() //=> "4f90d13a42"

    console.log(id);

    res.redirect(`/${id}`);

    

});


io.on('connection',socket=>{

    socket.on('join',data=>{
        console.log(data);
        socket.join(data.room);
    });


    socket.on('draw',data=>{
         console.log(data);
        io.to(data.room).emit('draw',{ini:data.ini,final:data.coord,w:data.w,c:data.c});
    })
});


server.listen(PORT,(err)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Server is successfully running");
    }
});