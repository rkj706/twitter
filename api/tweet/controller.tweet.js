/**
 * Created by rakesh on 29/9/17.
 */
'use strict';
const express=require('express');
const Follow =require('../../models/follows');
const Tweet =require('../../models/tweets');


// map nested Object to single level
let  generateProfileView=(result)=> {
    let profiles = [];

    result.forEach(function (object) {

        let profile = {
            screenName: object.userId.screenName,
            _id: object.userId._id,
            text: object.text|| '',
            created_at: object.created_at || '',

        };
        profiles.push(profile);
    });
    return profiles;
};

// get particular users Tweet by pagination
let getTweetByUserId=(req,res)=>{
    let skipData = parseInt(req.query.pageno) * 10 || 0;
    Tweet.find({userId:req.body.userId},function (err,result) {
        if(err){
            return   res.status(500).json({message:err.message})
        }
        return res.status(200).json(result);
    }).skip(skipData).limit(10);
}

// get  tweets of people  whom loggedIn user is following
let getDashboardTweet=(req,res)=> {
    let skipData = parseInt(req.query.pageno) * 10 || 0;
    let userId=req.user._id;
    Follow.findOne({userId:userId},{_id:0,followingIds:1},function (err,result) {
        if(err){
         return   res.status(500).json({message:err.message})
        }
        Tweet.find(
            {userId:{$in: result.followingIds}})
            .sort({created_at:-1})
            .skip(skipData).limit(10)
            .populate('userId',['screenName','email']).exec()
            .then(function (response) {

                return   res.status(200).json(generateProfileView(response))
            }).catch(function (error) {
            return   res.status(500).json({message:error.message})
        })

    })
}


// post tweet
let postTweet=(req,res)=>{
    let userId=req.user._id;
    let text=req.body.text;
    if(text.length<1 || text.length>140){
        res.status(200).json({message:"Tweet can't be less than 1 or more than 140 characters"});
    }
    let tweetModel=new Tweet();
    tweetModel.text=text;
    tweetModel.userId=userId;
    tweetModel.save(function (err) {
        if(err){
            res.status(202).json({message:err.message})
        }
        else{
            res.status(200).json({message:"your tweet has been saved"});
        }
    })
}



module.exports={
    getDashboardTweet:getDashboardTweet,
    postTweet:postTweet,
    getTweetByUserId:getTweetByUserId
}