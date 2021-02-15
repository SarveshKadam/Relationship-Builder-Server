const express = require('express');
const router = express.Router();
const Relation = require('../model/relation')
const Person = require('../model/person')

router.get('/', async (req, res) => {

    try {
        const relations = await Relation.find({})
        res.send(relations)

    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }

})

router.post('/', async (req, res) => {
   const person1 =await findID(req.body.person1Name)
   const person2 =await findID(req.body.person2Name) 
   console.log(person1,person2);
    const relation = new Relation({
        person1 : person1[0]._id,
        person1Name:person1[0].name,
        relation:req.body.relation,
        person2 : person2[0]._id,
        person2Name:person2[0].name
    })

    try {
        if (!relation) {
            res.send("Send proper data")
        }
        await relation.save()
        res.status(200).send(relation)
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})

router.patch('/update',async(req,res)=>{
    try {
     const relation = await Relation.findByIdAndUpdate(req.body.id,{relation :req.body.newRelation},{new:true,runValidators:true})
     if(!relation){
        return res.status(404).send("Relation does not exists")
    }
     await relation.save()
     res.send(relation)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const relation = await Relation.findOneAndDelete({_id:req.params.id})
        if(!relation){
            return res.status(404).send("Relation not found")
        }
        res.send(relation)
    } catch (e) {
        res.status(400).send(e)
    }
})

async function findID(personname){
    const name = await Person.find({name : personname})
    console.log(name,"findBy Id weeoe");
    return name
}



module.exports = router
