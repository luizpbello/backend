module.exports = app => {
    
    const Stat = app.mongoose.model('Stat', {
        clients:Number,
        pets:Number,
        schedules:Number,
        createdAt:Date

    })
    

    const get =  (req, res) => {
        Stat.findOne({}, {}, {sort : {'createdAt' : -1}})
        .then(stat =>  { 
            const statDefault = {
                clients:0,
                pets:0,
                schedules:0,
            }
            
            res.json(stat || statDefault)
        })
    }

   return { get, Stat }
}