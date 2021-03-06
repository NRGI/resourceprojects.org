////////////////
//LINK SCHEMA///
////////////////
'use strict';
var mongoose = require('mongoose');
require('mongoose-html-2').loadType(mongoose);

var linkSchema, Link,
    deepPopulate    = require('mongoose-deep-populate')(mongoose),
    Schema          = mongoose.Schema,
    ObjectId        = Schema.Types.ObjectId,
    entity_enu      = {
        values: 'commodity company company_group concession contract project production site transfer'.split(' '),
        //values: ' project '.split(' '),
        message: 'Validator failed for `{PATH}` with value `{VALUE}`. Please select company, concession, contract, country, project, site, production transfer, or company group.'
    };

linkSchema = new Schema({
    commodity: {type: ObjectId, ref: 'Commodity'},
    company: {type: ObjectId, ref: 'Company'},
    company_group: {type: ObjectId, ref: 'CompanyGroup'},
    concession: {type: ObjectId, ref: 'Concession'},
    contract: {type: ObjectId, ref: 'Contract'},
    project: {type: ObjectId, ref: 'Project'},
    site: {type: ObjectId, ref: 'Site'},
    transfer: {type: ObjectId, ref: 'Transfer'},
    production: {type: ObjectId, ref: 'Production'},
    source: {type: ObjectId, ref: 'Source'},
    entities: [{ //linked entity
        type: String,
        required:'{PATH} is required!',
        enum: entity_enu}]

});

//linkSchema.plugin(mongooseHistory, hst_options);
linkSchema.plugin(deepPopulate);
//linkSchema.index({ commodity: 1, company: 1, company_group: 1, contract: 1,  concession: 1,  project: 1,  transfer: 1, production: 1}, { unique: true });

Link = mongoose.model('Link', linkSchema);

function createDefaultLinks() {
    Link.find({}).count().exec(function(err, link_count) {
        if(link_count === 0) {
            //group-company
            Link.create({company_group:'56a14d8ee47b92f110ce9a57',company:'56a13a758f224f670e6a376e',source:'56747e060e8cc07115200ee5',entities:['company','company_group']});
            Link.create({company_group:'56a14d8ee47b92f110ce9a58',company:'56a13a758f224f670e6a376e',source:'56747e060e8cc07115200ee5',entities:['company','company_group']});
            //project-company
            Link.create({project:'56a930f41b5482a31231ef42',company:'56a13a758f224f670e6a376e',source:'56747e060e8cc07115200ee5',entities:['company','project']});
            Link.create({project:'56a930f41b5482a31231ef43',company:'56a13a758f224f670e6a376e',source:'56747e060e8cc07115200ee5',entities:['company','project']});
            Link.create({project:'56a930f41b5482a31231ef44',company:'56a13a758f224f670e6a376a',source:'56747e060e8cc07115200ee5',entities:['company','project']});
            //contract-company
            Link.create({contract:'56a2eb4345d114c30439ec20',company:'56a13a758f224f670e6a376a',source:'56747e060e8cc07115200ee4',entities:['company','contract']});
            Link.create({contract:'56a2eb4345d114c30439ec20',company:'56a13a758f224f670e6a376e',source:'56747e060e8cc07115200ee6',entities:['company','contract']});
            //concession-company
            Link.create({concession:'56a2b8236e585b7316655794',company:'56a13a758f224f670e6a376e',source:'56747e060e8cc07115200ee6',entities:['company','concession']});
            Link.create({concession:'56a2b8236e585b7316655794',company:'56a13a758f224f670e6a376a',source:'56747e060e8cc07115200ee5',entities:['company','concession']});
            //concession-project
            Link.create({concession:'56a2b8236e585b7316655794',project:'56a930f41b5482a31231ef43',source:'56747e060e8cc07115200ee5',entities:['project','concession']});
            Link.create({concession:'56a2b8236e585b731665579d',project:'56a930f41b5482a31231ef44',source:'56747e060e8cc07115200ee5',entities:['project','concession']});
            Link.create({concession:'56a2b8236e585b7316655794',project:'56a930f41b5482a31231ef42',source:'56747e060e8cc07115200ee5',entities:['project','concession']});
            Link.create({project:'56a930f41b5482a31231ef43',concession:'56a2b8236e585b7316655794',source:'56747e060e8cc07115200ee6',entities:['concession','project']});
            //concession-contract
            Link.create({contract:'56a2eb4345d114c30439ec20',concession:'56a2b8236e585b7316655794',source:'56747e060e8cc07115200ee6',entities:['concession','contract']});
            Link.create({contract:'56a2eb4345d114c30439ec22',concession:'56a2b8236e585b7316655794',source:'56747e060e8cc07115200ee6',entities:['concession','contract']});
            Link.create({contract:'56a2eb4345d114c30439ec20',concession:'56a2b8236e585b731665579d',source:'56747e060e8cc07115200ee6',entities:['concession','contract']});
            Link.create({contract:'56a2eb4345d114c30439ec22',concession:'56a2b8236e585b731665579d',source:'56747e060e8cc07115200ee6',entities:['concession','contract']});
            //project-contract
            Link.create({project:'56a930f41b5482a31231ef42',contract:'56a2eb4345d114c30439ec20',source:'56747e060e8cc07115200ee6',entities:['contract','project']});
            Link.create({project:'56a930f41b5482a31231ef43',contract:'56a2eb4345d114c30439ec20',source:'56747e060e8cc07115200ee6',entities:['contract','project']});
            Link.create({project:'56a930f41b5482a31231ef44',contract:'56a2eb4345d114c30439ec21',source:'56747e060e8cc07115200ee6',entities:['contract','project']});
            //project-site
            Link.create({site:'56eb117c0007bf5b2a3e4b71',company:'56a13a758f224f670e6a376e',source:'56747e060e8cc07115200ee3',entities:['site','company']});
            Link.create({site:'56eb117c0007bf5b2a3e4b76',company:'56a13a758f224f670e6a376e',source:'56747e060e8cc07115200ee3',entities:['site','company']});
            //concession-site
            Link.create({concession:'56a2b8236e585b7316655794',site:'56eb117c0007bf5b2a3e4b76',source:'56747e060e8cc07115200ee6',entities:['concession','site']});
            //contract-site
            Link.create({site:'56eb117c0007bf5b2a3e4b71',project:'56a930f41b5482a31231ef42',source:'56747e060e8cc07115200ee3',entities:['site','project']});
            Link.create({site:'56eb117c0007bf5b2a3e4b76',project:'56a930f41b5482a31231ef42',source:'56747e060e8cc07115200ee3',entities:['site','project']});
            Link.create({site:'56eb117c0007bf5b2a3e4b76',project:'56a930f41b5482a31231ef44',source:'56747e060e8cc07115200ee3',entities:['site','project']});
            //project-site
            Link.create({site:'56eb117c0007bf5b2a3e4b71',contract:'56a2eb4345d114c30439ec22',source:'56747e060e8cc07115200ee3',entities:['site','contract']});
            Link.create({site:'56eb117c0007bf5b2a3e4b76',contract:'56a2eb4345d114c30439ec20',source:'56747e060e8cc07115200ee3',entities:['site','contract']});
            Link.create({site:'56eb117c0007bf5b2a3e4b76',contract:'56a2eb4345d114c30439ec22',source:'56747e060e8cc07115200ee3',entities:['site','contract']});

            //Link.create({company_group:'',company:'',source:'',entities:['company','company_group']});
            //Link.create({company_group:'',company:'',source:'',entities:['company','company_group']});
            //Link.create({company_group:'',company:'',source:'',entities:['company','company_group']});
            //Link.create({company_group:'',company:'',source:'',entities:['company','company_group']});
            //
            Link.find({}).count().exec(function(err, link_count) {
                console.log(String(link_count), 'links created...')
            });
        } else {
            console.log(String(link_count), 'links exist...')
        }
    });
};
function getInitLinkCount() {
    Link.find({}).count().exec(function(err, link_count) {
        console.log(String(link_count), 'links exist...')
    });
};

exports.getInitLinkCount = getInitLinkCount;
exports.createDefaultLinks = createDefaultLinks;