exports.pageNotFound = (req, res, next) => {
	res.status(404).json({ success: false, code: '404', errorMessage: 'Invalid endpoint' });
};
