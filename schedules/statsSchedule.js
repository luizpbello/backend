const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function () {
        const clientCount = await app.db('clients').count('id').first()
        const petsCount = await app.db('pets').count('id').first()
        const schedulingCount = await app.db('scheduling').count('id').first()

        const { Stat } = app.api.stat

        const lastStat = await Stat.findOne( {}, {}, 
        {sort : {'createdAt' : -1 }})

        const stat = new Stat ({
            clients : clientCount.count,
            pets : petsCount.count,
            schedules : schedulingCount.count,
            createdAt : new Date()
        })

        const changeClients = !lastStat || stat.clients !==lastStat.clients
        const changePets = !lastStat || stat.pets !==lastStat.pets
        const changeSchedules = !lastStat || stat.clients !==lastStat.clients

        if( changeClients || changePets || changeSchedules){
            stat.save().then(() => 
            console.log(' \x1b[42m%s\x1b[37m', 'Dados atualizados com sucesso!', '\x1b[0m'))
        }
        
    })
}