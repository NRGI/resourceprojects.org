var Transfer 		= require('mongoose').model('Transfer'),
    async           = require('async'),
    mongoose 		= require('mongoose'),
    _               = require("underscore"),
    errors 	    = require('./errorList'),
    request         = require('request');

//Get payment filters
exports.getTransferFilters = function(req, res) {

    var paymentsFilter={},
        country={};
    country.company = {$exists: true, $nin: [null]};
    country.transfer_type = {$exists: true, $nin: [null]};

    if(req.params.country == 'false'){
       country.transfer_level={ $nin: [ 'country' ] };
    } else {
        country.transfer_level= 'country';
    }

    async.waterfall([
        getFilters
    ], function (err, result) {
        if (err) {
            res.send(err);
        } else {
            if (req.query && req.query.callback) {
                return res.jsonp("" + req.query.callback + "(" + JSON.stringify(result) + ");");
            } else {
                return res.send(result);
            }
        }
    });
    function getFilters(callback) {
        Transfer.aggregate([
            {$match: country},
            {$lookup: {from: "companies",localField: "company",foreignField: "_id",as: "company"}},
            {$unwind: {"path": "$company", "preserveNullAndEmptyArrays": true}}
        ]).exec(function (err, transfers) {
            if (err) {
                err = new Error('Error: '+ err);
                return res.send({error: err.toString()});
            } else if (transfers.length>0) {
                paymentsFilter.year_selector = _.countBy(transfers, "transfer_year");
                paymentsFilter.currency_selector = _.countBy(transfers, "transfer_unit");
                paymentsFilter.type_selector=_.countBy(transfers, "transfer_type");
                paymentsFilter.company_selector=_.groupBy(transfers, function (doc) {if(doc&&doc.company&&doc.company._id){return doc.company._id;}});
                callback(null, {filters: paymentsFilter});
            } else {
                return res.send({error: 'not found'});
            }
        })
    }
}

//Get payments by project
exports.getTransfers = function(req, res) {
    var errorList=[],
        limit = Number(req.params.limit),
        skip = Number(req.params.skip);
    req.query.transfer_level={ $nin: [ 'country' ] };
    if(req.query.transfer_year){req.query.transfer_year = parseInt(req.query.transfer_year);}
    if(req.query.company){req.query.company = mongoose.Types.ObjectId(req.query.company);}

    async.waterfall([
        transferCount,
        getTransferSet
    ], function (err, result) {
        if (err) {
            res.send(err);
        } else {
            if (req.query && req.query.callback) {
                return res.jsonp("" + req.query.callback + "(" + JSON.stringify(result) + ");");
            } else {
                return res.send(result);
            }
        }
    });

    function transferCount(callback) {
        Transfer.find(req.query).count().exec(function(err, transfersCount) {
            if (err) {
                err = new Error('Error: '+ err);
                return res.send({error: err.toString()});
            } else if (transfersCount == 0) {
                return res.send({error: 'not found'});
            } else {
                callback(null, transfersCount);
            }
        });
    }

    function getTransferSet(transfersCount, callback) {
        Transfer.aggregate([
            {$match:req.query},
                {$lookup: {from: "projects",localField: "project",foreignField: "_id",as: "project"}},
                {$lookup: {from: "companies",localField: "company",foreignField: "_id",as: "company"}},
                {$lookup: {from: "sites",localField: "site",foreignField: "_id",as: "site"}},
                {$lookup: {from: "countries",localField: "country",foreignField: "_id",as: "country"}},
                {$unwind: {"path": "$country", "preserveNullAndEmptyArrays": true}},
                {$unwind: {"path": "$project", "preserveNullAndEmptyArrays": true}},
                {$unwind: {"path": "$company", "preserveNullAndEmptyArrays": true}},
                {$unwind: {"path": "$site", "preserveNullAndEmptyArrays": true}},
                {$project:{_id:1,transfer_year:1,
                    country: { name:"$country.name",iso2:"$country.iso2"},
                    company:{$cond: { if:  {$not: "$company" }, then: '', else: {_id:"$company._id",company_name:"$company.company_name"}}},
                    proj_site:{$cond: { if:  {$not: "$site" },
                        then:  {_id:"$project.proj_id",name:"$project.proj_name",
                            type:{$cond: { if: {$not: "$project"}, then: '', else: 'project'}}},
                        else: {_id:"$site._id",name:"$site.site_name",
                            type:{$cond: { if: { $gte: [ "$site.field", true ] }, then: 'field', else: 'site' }}}}
                    },
                    transfer_level:1,transfer_type:1,transfer_unit:1,transfer_value:1
                }},
                {$group:{
                    _id:'$_id',
                    transfer_year:{$first:'$transfer_year'},
                    transfer_type:{$first:'$transfer_type'},
                    transfer_unit:{$first:'$transfer_unit'},
                    transfer_value:{$first:'$transfer_value'},
                    country:{$first:'$country'},
                    company:{$first:'$company'},
                    proj_site:{$first:'$proj_site'}
                }},
            {$skip: skip},
            {$limit: limit}
        ]).exec(function(err, transfers) {
            if (err) {
                errorList = errors.errorFunction(err,'Transfers by Project');
                callback(null,{data: transfers, count: transfersCount,errorList:errorList});
            }else {
                if (transfers.length > 0) {
                    callback(null,{data: transfers, count: transfersCount,errorList:errorList});
                } else {
                    errorList.push({type: 'Transfers by Project', message: 'transfers by project not found'})
                    callback(null, {data: transfers, count: transfersCount,errorList:errorList});
                }
            }
        });
    }
};

//Get payment by recipient
exports.getTransfersByGov = function(req, res) {
    var errorList=[],
        limit = Number(req.params.limit),
        skip = Number(req.params.skip);
    req.query.transfer_level='country';
    if(req.query.transfer_year){req.query.transfer_year = parseInt(req.query.transfer_year);}
    if(req.query.company){req.query.company = mongoose.Types.ObjectId(req.query.company);}

    async.waterfall([
        transferCount,
        getTransferSet
    ], function (err, result) {
        if (err) {
            res.send(err);
        } else {
            if (req.query && req.query.callback) {
                return res.jsonp("" + req.query.callback + "(" + JSON.stringify(result) + ");");
            } else {
                return res.send(result);
            }
        }
    });
    function transferCount(callback) {
        Transfer.find(req.query).count().exec(function(err, transfersCount) {
            if (err) {
                err = new Error('Error: '+ err);
                return res.send({error: err.toString()});
            } else if (transfersCount == 0) {
                return res.send({error: 'not found'});
            } else {
                callback(null, transfersCount);
            }
        });
    }
    function getTransferSet(transfersCount,  callback) {
        Transfer.aggregate([
                {$match:req.query},
                {$lookup: {from: "projects",localField: "project",foreignField: "_id",as: "project"}},
                {$lookup: {from: "companies",localField: "company",foreignField: "_id",as: "company"}},
                {$lookup: {from: "sites",localField: "site",foreignField: "_id",as: "site"}},
                {$lookup: {from: "countries",localField: "country",foreignField: "_id",as: "country"}},
                {$unwind: {"path": "$country", "preserveNullAndEmptyArrays": true}},
                {$unwind: {"path": "$project", "preserveNullAndEmptyArrays": true}},
                {$unwind: {"path": "$company", "preserveNullAndEmptyArrays": true}},
                {$unwind: {"path": "$site", "preserveNullAndEmptyArrays": true}},
                {$project:{_id:1,transfer_year:1,
                    country: { name:"$country.name",iso2:"$country.iso2"},
                    company:{$cond: { if:  {$not: "$company" }, then: '', else: {_id:"$company._id",company_name:"$company.company_name"}}},
                    proj_site:{$cond: { if:  {$not: "$site" },
                        then:  {_id:"$project.proj_id",name:"$project.proj_name",
                            type:{$cond: { if: {$not: "$project"}, then: '', else: 'project'}}},
                        else: {_id:"$site._id",name:"$site.site_name",
                            type:{$cond: { if: { $gte: [ "$site.field", true ] }, then: 'field', else: 'site' }}}}
                    },
                    transfer_level:1,transfer_type:1,transfer_unit:1,transfer_value:1,transfer_gov_entity:1
                }},
                {$group:{
                    _id:'$_id',
                    transfer_year:{$first:'$transfer_year'},
                    transfer_type:{$first:'$transfer_type'},
                    transfer_unit:{$first:'$transfer_unit'},
                    transfer_value:{$first:'$transfer_value'},
                    transfer_level:{$first:'$transfer_level'},
                    transfer_gov_entity:{$first:'$transfer_gov_entity'},
                    country:{$first:'$country'},
                    company:{$first:'$company'},
                    proj_site:{$first:'$proj_site'}
                }},
                {$skip: skip},
                {$limit: limit}
        ]).exec(function(err, transfers) {
                if (err) {
                    errorList = errors.errorFunction(err,'Transfers by Recipient');
                    callback(null,{data: transfers, count: transfersCount,errorList:errorList});
                }else {
                    if (transfers.length > 0) {
                        callback(null,{data: transfers, count: transfersCount,errorList:errorList});
                    } else {
                        errorList.push({type: 'Transfers by Recipient', message: 'transfers by recipient not found'})
                        callback(null, {data: transfers, count: transfersCount,errorList:errorList});
                    }
                }
            });
    }
};