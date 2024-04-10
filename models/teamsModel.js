const { DataTypes } = require('sequelize');
const {sequelize,Sequelize}=require('../helpers/connection');

const Team=sequelize.define('team',{
    teamId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    teamName:{
        type:DataTypes.STRING,
        
    },
    
    remainingAmount:{
            type:DataTypes.BIGINT,
            defaultValue:600000000
    },
    isDeleted:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    overSeasplayers:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    totalPlayers:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }

})
// Team.sync({force:true});
module.exports=Team;