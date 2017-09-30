/**
 * Created by rakesh on 22/9/17.
 */
var User = require('../../models/users');
var Follows = require('../../models/follows');

let getUser = (req, res)=> {
    return res.status(200).json({message:"to be implemented"})
};



module.exports = {

    getUser: getUser,
}