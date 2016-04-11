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
	
	owner:
	{
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: "Account"
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
		color: this.color
	};
};

MiiSchema.statics.findByOwner = function(ownerId, callback)
{
	var search = 
	{
		owner: mongoose.Types.ObjectId(ownerId)
	};
	
	return MiiModel.find(search).select("name age color").exec(callback);
};

MiiSchema.statics.findAll = function(ownerId, callback)
{	
	return MiiModel.find().select("name age color").exec(callback);
};

MiiModel = mongoose.model("Mii", MiiSchema);

module.exports.MiiModel = MiiModel;
module.exports.MiiSchema = MiiSchema;