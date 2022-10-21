const { v4: uuidv4 } = require('uuid');

const Target = require('../models/Target');
const ResponseHelper = require('../../helpers/response');

exports.getTargets = async (req, res, next) => {
	const { targetId } = req.params;

	const where = targetId ? { id: targetId } : {};

	const targets = await Target.findAll({
		where,
		order: [['created_at', 'ASC']]
	});

	return ResponseHelper.successResponse(req, res, targets)
};

exports.insertTarget = async (req, res, next) => {

	const { name, consent_url } = req.body;

	if (!name) {
		return ResponseHelper.errorResponse(req, res, 'Name is required');
	}

	if (!consent_url) {
		return ResponseHelper.errorResponse(req, res, 'Consent url is required');
	}

	const payload = {
		id: uuidv4(),
		name,
		consent_url,
		created_at: new Date(),
	}

	const target = await Target.create(payload);

	return ResponseHelper.successResponse(req, res, target)
};

exports.updateTarget = async (req, res, next) => {

	const { targetId } = req.params;

	const { name, consent_url } = req.body;

	if (!name && !consent_url) {
		return ResponseHelper.errorResponse(req, res, 'No data provided');
	}

	const lastedTarget = await Target.findOne({
		where: { id: targetId },
		order: [['version', 'DESC']]
	});

	if (!lastedTarget) {
		return ResponseHelper.errorResponse(req, res, 'Target does not exist');
	}

	const payload = {
		id: lastedTarget.id,
		name: name ? name : lastedTarget.name,
		consent_url: consent_url ? consent_url : lastedTarget.consent_url,
		version: lastedTarget.version + 1,
		created_at: new Date(),
	}

	const target = await Target.create(payload);

	return ResponseHelper.successResponse(req, res, target)
};