const {sequelize,Sequelize}=require('../helpers/connection');


const axios=require('axios');

const teamsModel=require('../models/teamsModel')

const playerModel=require('../models/playersModel')

const port=process.env.port




// exports.getHomePage=async (req,res)=>{
//     try{
//         console.log("hello")
//         // const teams=await axios.get(`http://localhost:4000/getAllTeams`)

//         // console.log(teams.data['data'])

//         res.render('a');
        
//     }
//     catch(error){
//         console.log(error);
//         res.json({status:400,error:error});
//     }
// }





exports.getHomePage=async (req,res)=>{
    try{

    }
    catch(error)
    {
        console.log(error);

        res.send("something Went Wrong")
    }
}




exports.getAllPlayers=async (req,res)=>{
    try{
        const players = await playerModel.findAll();

        res.json({status:200,data:players});
        
        
    }
    catch{
        console.log(error);
        res.json({status:400,error:error})
    }
}



exports.getRandomPlayer=async (req,res)=>{
    try{
        const randomPlayer = await playerModel.findOne({
            where:{
                playerName:'Alex Hales',
                status:0
            },
            order: sequelize.random(), 
          });
          console.log(randomPlayer)

        res.json({status:200,data:randomPlayer});
        
        
    }
    catch{
        console.log(error);
        res.json({status:400,error:error})
    }
}


exports.getAllTeams=async (req,res)=>{
    try{
        const teams = await teamsModel.findAll();
        res.json({status:200,data:teams});
    }
    catch(error){
        console.log(error);
        res.json({status:400,error:error})
    }
}


exports.buyPlayer=async (req,res)=>{
    try{
        console.log(req.body);
        
    const playerId=+req.body.playerId;
    const bidPrice=+req.body.bidPrice;
    const teamId=+req.body.teamId;
    const nationality=req.body.nationality

    const data = await playerModel.findOne({
        where:{
            playerId:playerId
        }});

        if(data){
            data.bidPrice=bidPrice;
            data.teamId=teamId;
            data.status=1;
            data.save();
        }


    const teamData = await teamsModel.findOne({
        where:{
            teamId:teamId
        }

        
    });
    if(teamData){
        teamData.remainingAmount=teamData.remainingAmount-bidPrice;
        teamData.totalPlayers=teamData.totalPlayers+1;
        if(nationality!='Indian')
        {
            teamData.overSeasplayers=teamData.overSeasplayers+1;
        }

        teamData.save()
     }


    res.redirect('/')

}
catch(error){
    console.log(error);
    res.send(error)
 
}
}



exports.addTeam=async (req,res)=>{
    try{
    const details ={
        teamName:req.body.teamName,
        
    }
    const result = await teamsModel.create(details);
    // res.send("successFully Added")
    return res.redirect('/getTeamsForm');
}
catch(error){
    console.log(error);
    res.json({status:400,error:error})
}
}



exports.addplayer=async (req,res)=>{
    try{
        console.log(req.body);
    const details ={
        playerName:req.body.playerName,
        nationality:req.body.nationality,
        basePrice:req.body.basePrice,
        type:req.body.type,
        imageUrl:req.body.imageUrl
    }

    const data =await  playerModel.findOne({
        where:{
            playerName:details.playerName
        }
    });
    console.log(data)
    if(data)
    {
        return res.send("player Already exists")
    }
    const result = await playerModel.create(details);
    res.redirect('/getPlayersForm')

}
catch(error){
    console.log(error);
    res.send(error)
 
}
}




exports.unsoldPlayer=async(req,res)=>{
    try{
    const id = req.params.playerId;
    const data = await playerModel.findOne({
        where:{
            playerId:id
        }
        
    });

    if(data){
        data.status=2;
        data.save();
    }

    return res.redirect('/');
}
    catch(error){
        console.log(error)
    }
}



exports.deletePlayer=async(req,res)=>{
    try{
    const id = req.query.id;
    const data = playerModel.findOne({
        where:{
            playerId:id
        },
        if(data){
            data.isDeleted=1;
            data.save();
        }
    });
}
    catch(error){
        console.log(error)
    }
}



exports.convertToWords=(amount)=> {
    // Array of Indian numbering system words
    const words = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
                   "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    
    // Function to convert a given number less than 100 into words
    function convertLessThanHundred(number) {
        if (number < 20) {
            return words[number];
        } else {
            return tens[Math.floor(number / 10)] + " " + words[number % 10];
        }
    }
    
    // Function to convert a given number less than 1000 into words
    function convertLessThanThousand(number) {
        if (number >= 100) {
            return words[Math.floor(number / 100)] + " Hundred " + convertLessThanHundred(number % 100);
        } else {
            return convertLessThanHundred(number);
        }
    }
    
    // Main function to convert amount into words
    function convertAmount(amount) {
        if (amount === 0) {
            return "Zero";
        }

        let result = "";
        
        if (amount >= 100000) {
            result += convertLessThanThousand(Math.floor(amount / 100000)) + " Lakh ";
            amount %= 100000;
        }

        if (amount !== 0) {
            result += convertLessThanThousand(amount);
        }

        return result.trim();
    }
    
    return convertAmount(amount);
}
