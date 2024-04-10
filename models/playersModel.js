const { DataTypes } = require('sequelize');
const {sequelize,Sequelize}=require('../helpers/connection');

const Player=sequelize.define('player',{
    playerId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    playerName:{
        type:DataTypes.STRING,
        
    },
    nationality:{
        type:DataTypes.STRING
    },
    basePrice:{
            type:DataTypes.INTEGER
    },
    type:{
        type:DataTypes.STRING
    },
    teamId:{
        type:DataTypes.INTEGER,
        defaultValue:null
    },
    bidPrice:{
        type:DataTypes.INTEGER,
        defaultValue:null
    },
    imageUrl:{
        type:DataTypes.STRING,
    },
    isDeleted:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    status:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }

})


// Player.sync({alter:true})
module.exports=Player;
