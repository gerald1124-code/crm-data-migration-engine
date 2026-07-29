import express from "express";
const app=express(); app.use(express.json());
const jobs=[];
app.get("/health",(req,res)=>res.json({status:"ok"}));
app.post("/migrations",(req,res)=>{
  const {records=[], mapping={}}=req.body;
  const transformed=records.map(row=>Object.fromEntries(
    Object.entries(mapping).map(([target,source])=>[target,row[source] ?? null])
  ));
  const job={id:jobs.length+1,status:"completed",processed:transformed.length,records:transformed};
  jobs.push(job); res.status(201).json(job);
});
app.get("/migrations",(req,res)=>res.json(jobs));
const port=process.env.PORT||3000;
if(process.env.NODE_ENV!=="test") app.listen(port,()=>console.log(`CRM migration API on ${port}`));
export default app;
