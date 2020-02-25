const express = require('express');
const router = express.Router();
const mongoCollections = require('../config/mongoCollections');

const tasks = mongoCollections.task;

const data = require('../data');
const locationData = data.location;


router.get('/', async (req,res) => {
    try { 
        const x = await locationData.getIpData();
        return res.status(200).render("home", {title:"IDT",x});
    } catch (e) {
        res.status(404).json({error: e.message});
    }
})

router.post('/locationDetails', async (req,res) => {
    try { 
        console.log("hello" + req.body.ipaddress);
        const locationDetails = await locationData.addData(req.body.ipaddress);
        const x = await locationData.sendSMS(req.body.ipaddress,req.body.phone);
        console.log(locationDetails.status);
        if(locationDetails.status=='success') {
        return res.status(200).render("locationDetails", {title:"IDT", locationDetails});
        } else {
            return res.status(200).render("error", {title:"IDT"});

        }
    } catch (e) {
        res.status(404).json({error: e.message});
    }
})

router.post('/getAllIps', async (req,res) => {
    try { 

        const locationDetails = await locationData.getAllIps(req.body.limit);
        console.log(req.body.limit);
        console.log(locationDetails);
        return res.status(200).render("getAllIps", {title:"IDT", locationDetails});
    } catch (e) {
        res.status(404).json({error: e.message});
    }
})

router.post('/getAllIpFromDateFilters', async (req,res) => {
    try { 
        const dateFilter = await locationData.getIpFromDateFilter(req.body.fromDate,req.body.toDate);
        //const locationDetails = await locationData.getAllIps(req.body.limit);
        console.log("LEngth is :" + dateFilter.length);
        console.log(req.body.fromDate);
        console.log(req.body.toDate);
        return res.status(200).render("getAllIpFromDateFilters", {title:"IDT",dateFilter});
    } catch (e) {
        res.status(404).json({error: e.message});
    }
})



// router.get('/locationDetails', async (req,res) => {
//     try { 
//         const x = await locationData.getIpData();
//         return res.status(200).render("locationDetails", {title:"IDT",x});
//     } catch (e) {
//         res.status(404).json({error: e.message});
//     }
// })


module.exports = router;