var _ = require("underscore");
var models = require("../models");
var Mii = models.Mii;

var makerPage = function(req, res)
{
	Mii.MiiModel.findByOwner(req.session.account._id, function(err, docs)
	{
		if(err)
		{
			console.log(err);
			return res.status(400).json(
			{
				error: "An error occured"
			});
		}
		
		res.render("maker", 
		{
			csrfToken: req.csrfToken(),
			miis: docs
		});
	});
};

var makeMii = function(req, res)
{
	if(!req.body.name || !req.body.age || !req.body.name)
	{
		return res.status(400).json(
		{
			error: "Name, age, and color are required"
		});
	}
	
	console.log("Making the Mii");
	
	var miiData = 
	{
		name: req.body.name,
		age: req.body.age,
		color: req.body.color,
		owner: req.session.account._id
	};
	
	var newMii = new Mii.MiiModel(miiData);
	
	newMii.save(function(err)
	{
		if(err)
		{
			console.log(err);
			return res.status(400).json(
			{
				error: "An error occured"
			});
		}
		
		res.json(
		{
			redirect: "/maker"
		});
	});
};

var viewPage = function(req, res)
{
	Mii.MiiModel.findByOwner(req.session.account._id, function(err, docs)
	{
		if(err)
		{
			console.log(err);
			return res.status(400).json(
			{
				error: "An error occured"
			});
		}
		
		res.render("app", 
		{
			csrfToken: req.csrfToken(),
			miis: docs
		});
	});
};

var viewAllPage = function(req, res)
{
	Mii.MiiModel.findAll(req.session.account._id, function(err, docs)
	{
		if(err)
		{
			console.log(err);
			return res.status(400).json(
			{
				error: "An error occured"
			});
		}
		
		res.render("view", 
		{
			miis: docs
		});
	});
};

module.exports.makerPage = makerPage;
module.exports.make = makeMii;
module.exports.viewPage = viewPage;
module.exports.viewAllPage = viewAllPage;