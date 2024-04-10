const express=require('express');
const playerModel = require("../models/playersModel");
const teamsModel = require("../models/teamsModel");
// const axios=require(axios)
const route=express.Router();



const controllers=require('../controllers/homeControllers');
const { default: axios } = require('axios');

route.get('/',async (req,res)=>{
        try{
            console.log("hello")
            const teams=await axios.get(`http://localhost:4000/getAllTeams`)

            const players=await axios.get(`http://localhost:4000/getAllPlayers`)

            let randomPlayer;

            if(req.query.next=="true")
            {
              const result=await axios.get(`http://localhost:4000/getRandomPlayer`)

              randomPlayer=result.data['data']

              const a=controllers.convertToWords(randomPlayer.basePrice)

              randomPlayer.a=a;

            }



    
            console.log(teams.data['data'])
    
            res.render('a',{teams:teams.data['data'],players:players.data['data'],randomPlayer:randomPlayer});
            
        }
        catch(error){
            console.log(error);
            res.json({status:400,error:error});
        }
    })


route.post("/addPlayer",controllers.addplayer)



route.post("/buyPlayer",controllers.buyPlayer)




route.post("/addTeam",controllers.addTeam)

route.get('/getRandomPlayer',controllers.getRandomPlayer)






route.get('/getAllPlayers',controllers.getAllPlayers)
route.get('/getAllTeams',controllers.getAllTeams)


route.post('/deletePlayer',controllers.deletePlayer)


route.get('/getPlayersForm',(req,res)=>{
    try{
    res.render('playersForm')
    }
    catch(error){
        console.log(error);
    }
})

route.get('/unsoldPlayer/:playerId',controllers.unsoldPlayer)
route.get('/getTeamsForm',(req,res)=>{
    try{
    res.render('teamsForm')
    }
    catch(error){
        console.log(error);
    }
})

module.exports = route;