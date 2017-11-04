module.exports = (req, res, next) => { 
	req.start = Date.now(); 
	next(); 
}
