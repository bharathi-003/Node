const fs=require('fs');

if(! fs.existsSync('./folder'))
{
    fs.mkdir('./folder',(err)=>{
        if(err){
            console.log(err.message);
        }
        else
       console.log("Folder created");
    })
    
   console.log("hear");
    
}