const Sequelize=require('sequelize')

const sequelize=new Sequelize('auction','root','',{
    host:'localhost',
    dialect:'mysql'

})

module.exports={Sequelize,sequelize};