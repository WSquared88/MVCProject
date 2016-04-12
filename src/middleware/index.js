var requiresLogin = function(req, res, next)
{
	cobnsole.log("must login");
	if(!req.session.account)
	{
		return res.redirect("/");
	}
	console.log("next");
	next();
};

var requiresLogout = function(req, res, next)
{
	console.log("must logout");
	if(req.session.account)
	{
		return res.redirect("/view");
	}
	console.log("next");
	next();
};

var requiresSecure = function(req, res, next)
{
	console.log("checking secure");
	if(req.headers["x-forwarded-proto"] != "https")
	{
		return res.redirect("https://" + req.hostname + req.url);
	}
	console.log("next");
	next();
};

var bypassSecure = function(req, res, next)
{
	console.log("no secure");
	next();
};

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

if(process.env.NODE_ENV === "production")
{
	module.exports.requiresSecure = requiresSecure;
}
else
{
	module.exports.requiresSecure = bypassSecure;
}