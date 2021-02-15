const express = require('express');
const router = express.Router();
const Person = require('../model/person')

router.get('/', async (req, res) => {

    try {
        const persons = await Person.find({})
        res.send(persons)

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }

})

router.post('/', async (req, res) => {

    const person = new Person({
        name: req.body.name
    })

    try {
        if (!person) {
            res.send("Send proper data")
        }
        await person.save()
        res.status(200).send(person)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/update',async(req,res)=>{
    try {
     const person = await Person.findByIdAndUpdate(req.body.id,{name :req.body.newName},{new:true,runValidators:true})
     if(!person){
        return res.status(404).send("Person does not exists")
    }
     await person.save()
     res.send(person)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const person = await Person.findOneAndDelete({_id:req.params.id})
        if(!person){
            return res.status(404).send("Person not found")
        }
        res.send(person)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router