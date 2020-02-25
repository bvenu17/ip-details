const axios = require('axios');

const mongoCollections = require('../config/mongoCollections');
const ipdetails = mongoCollections.ipdetails;

const uuid = require('uuid/v4');

const getIpData = async (ip) => {
    const url = 'http://ip-api.com/json/' + ip;
    const res = await axios.get(url);

    return res.data;
}

const addData = async (ipaddress) => {

     

    const ipCollection = await ipdetails();

    const dets = await getIpData(ipaddress);

    const date = new Date();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const day = date.getDate();
    const fullDate = day + "/" + month + "/" + year;

    console.log("Month is" + month);
    let locationDetails = {
        _id: uuid(),
        ip:ipaddress,
        country:dets.country,
        regionName:dets.regionName,
        city:dets.city,
        latitude:dets.lat,
        longitude: dets.lon,
        date:fullDate
    };

    const newInsertInformation = await ipCollection.insertOne(locationDetails);
    if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
    return dets;
}

const getAllIps = async (limit) => {
    const ipCollection = await ipdetails();
    const allIps = await ipCollection.find({}).toArray();
    const retArr = [];
    if(allIps.length>=limit) {
        for(let i=allIps.length-1;i>allIps.length-1-limit;i--) {
            retArr.push(allIps[i]);
        }
    } else {
        for(let i=0;i<allIps.length;i++) {
            retArr.push(allIps[i]);
        }
    }
    return retArr;
}

const getIpFromDateFilter = async (fromDate,toDate) => {
    const ipCollection = await ipdetails();
    const allIps = await ipCollection.find({}).toArray();
    const retArr = [];
    console.log("HEllo" + allIps[1].date);
    for(let i=0;i<allIps.length;i++) {
        if(allIps[i].date>=fromDate&&allIps[i].date<=toDate) {
            retArr.push(allIps[i]);
        }
    }
    
    return retArr;
}



module.exports = {
    getIpData,
    addData,
    getAllIps,
    getIpFromDateFilter
}