const orgRepo = require("../../modules/Org/org.repo");


exports.getOrg = async (req, res) => {
    try {
        if (req.query._id !== req.tokenData._id) return res.status(400).json({
            success: false,
            code: 400,
            error: "You can only manage your own account."
        });
        const operationResultObject = await orgRepo.get({ _id: req.query._id }, { password: 0, token: 0 });
        return res.status(operationResultObject.code).json(operationResultObject);

    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error Happened."
        });
    }
}

exports.updateOrg = async (req, res) => {
    try {
        if (req.query._id !== req.tokenData._id) return res.status(400).json({
            success: false,
            code: 400,
            error: "You can only manage your own account."
        });
        const operationResultObject = await orgRepo.update(req.query._id, req.body);
        return res.status(operationResultObject.code).json(operationResultObject);

    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error Happened."
        });
    }
}

exports.removeOrg = async (req, res) => {
    try {
        if (req.query._id !== req.tokenData._id) return res.status(400).json({
            success: false,
            code: 400,
            error: "You can only manage your own account."
        });
        const operationResultObject = await orgRepo.remove(req.query._id);
        return res.status(operationResultObject.code).json(operationResultObject);
    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error Happened."
        });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        if (req.body.email !== req.tokenData.email) return res.status(400).json({
            success: false,
            code: 400,
            error: "You can only manage your own account."
        });
        const operationResultObject = await orgRepo.resetPassword(req.body.email, req.body.newPassword);
        return res.status(operationResultObject.code).json(operationResultObject);

    } catch (err) {
        console.log(`err.message`, err.message);
        return res.status(500).json({
            success: false,
            code: 500,
            error: "Unexpected Error Happened."
        });
    }

}
