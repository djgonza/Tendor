module.exports = () => {
	return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}