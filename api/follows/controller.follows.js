/**
 * Created by rakesh on 29/9/17.
 */

 'use strict';
const User = require('../../models/users');
const Follows = require('../../models/follows');
const mongoose=require('mongoose');


let followUnfollow = (req, res)=> {

    var  userId=mongoose.Types.ObjectId(req.body.userId); // person to follow
    var  followerId= req.user._id; // LoggedIn user's userId

    var newfollowData=new Follows();

    Follows.findOne({userId:followerId},function (err,response) {
        if(err){
            return res.status(500).json({message:err.message})
        }
        if(response){ // if already following then unfollow
           let index= response.followingIds.indexOf(userId);
            let responseMsg="";
            if (index > -1) {
                response.followingIds.splice(index, 1);
                responseMsg="Unfollowed";
            }else {
                response.followingIds.push(userId);
                responseMsg="Following";

            }
            response.save(function (saveError) {
                if(saveError){
                    return res.status(500).json({message:saveError})
                }
                res.status(200).json({message:responseMsg})
            })
        }

        else {

                newfollowData.userId=followerId;
                newfollowData.followingIds=userId;
                 newfollowData.save(function (saveError) {
                if(saveError){
                    return res.status(500).json({message:saveError})
                }
                res.status(200).json({message:"Following"})
            })
        }


    })

};



module.exports = {

    followUnfollow: followUnfollow,
}