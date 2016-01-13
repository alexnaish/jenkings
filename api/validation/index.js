module.exports = {
    validateObjectId: function(req, res, next){
        var objectIdRegex = /^[0-9a-fA-F]{24}$/;

        if(!req.params.id || !req.params.id.match(objectIdRegex)) {
            return res.status(400).json({error: 'Invalid ID.'});
        }
        next();
    }

};