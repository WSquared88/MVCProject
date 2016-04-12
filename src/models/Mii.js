var mongoose = require("mongoose");
var _ = require("underscore");
var MiiModel;
var setName = function(name)
{
	return _.escape(name).trim();
};

var MiiSchema = new mongoose.Schema(
{
	name: 
	{
		type: String,
		required: true,
		trim: true,
		set: setName
	},
	
	age: 
	{
		type: Number,
		min: 0,
		required: true
	},
	
	color:
	{
		type: String,
		required: false,
		trim: false,
	},
	
	face:
	{
		type: Number,
		required: true,
		min: 0
	},
	
	owner:
	{
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: "Account"
	},
	
	ownerUsername:
	{
		type: String,
		required: true,
	},
	
	createdData:
	{
		type: Date,
		default: Date.now
	}
});

MiiSchema.methods.toAPI = function()
{
	return {
		name: this.name,
		age: this.age,
		color: this.color,
		face: this.face
	};
};

MiiSchema.statics.findByOwner = function(ownerId, callback)
{
	var search = 
	{
		owner: mongoose.Types.ObjectId(ownerId)
	};
	
	return MiiModel.find(search).select("name age color face").exec(callback);
};

MiiSchema.statics.findAll = function(ownerId, callback)
{	
	return MiiModel.find().select("name age color face ownerUsername").exec(callback);
};

MiiModel = mongoose.model("Mii", MiiSchema);

module.exports.MiiModel = MiiModel;
module.exports.MiiSchema = MiiSchema;