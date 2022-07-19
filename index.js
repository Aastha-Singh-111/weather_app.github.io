 const http = require("http");
 const fs= require("fs");
 var requests = require("requests");
//const { create } = require("domain");
 const homefile=fs.readFileSync("index.html","utf-8");

const replaceval=(tempval,orgval)=>{
   let temperature=tempval.replace("{%tempval%}",orgval.main.temp);
   temperature=temperature.replace("{%tempmin%}",orgval.main.temp_min);
   temperature=temperature.replace("{%tempmax%}",orgval.main.temp_max);
   temperature=temperature.replace("{%location%}",orgval.name);
   temperature=temperature.replace("{%country%}",orgval.sys.country);
   temperature=temperature.replace("{%tempstatus%}",orgval.weather[0].main);
   return temperature;
}


 const server=http.createServer((req,res)=>{

    if(req.url=="/"){
      
        requests('https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=0888d15dc7ef26ed7c050d2bea0b87b5')
.on('data',(chunk)=> {
    const objdata=JSON.parse(chunk);
    const arrdata= [objdata];
  //console.log(arrdata[0].main.temp);
  // const realtimedata=arrdata.map((val)=>{
  //  // console.log(val.main);
  //   replaceval(homefile,val);
  //   //res.write(realtimedata);
  //   console.log(realtimedata);
  // })
  const realtimedata=arrdata
  .map((val)=>replaceval(homefile,val))
  .join("");
  res.write(realtimedata);
  console.log(realtimedata);
})

.on('end',(err)=> {
  if (err) return console.log('connection closed due to errors', err);
 res.end()
  console.log('end');
});

}
 });

 server.listen(8000,"127.0.0.1");