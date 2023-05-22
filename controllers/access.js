const AppError = require("../utils/appError");
const auth = require("./authentication");
const user = require("./user");

class access {
    token;
    userData;

    async getDataToken(req, res, next) {
        const token = await auth.authenticateToken(req, res, next);
        if (!token) {
            return false;
        }
        const userData = await user.getUserByEmail(token.userEmail);
        this.token = token;
        this.userData = userData;
        return true;
    }


}

exports.BlockSeeker = async (req, res, next) => {
    const accessTemp = new access();
    const check = await accessTemp.getDataToken(req, res, next);
    if (!check || accessTemp.userData.type == 'S') {
        return false;
    }
    return true;
}

exports.onlyId = async (id, req, res, next) => {
    const accessTemp = new access();
    const check = await accessTemp.getDataToken(req, res, next);
    if (!check || (accessTemp.userData.id != id && accessTemp.userData.type != 'A')) {
        return false;
    }
    return true;
} 

exports.admin = async (req, res, next) => {
    const accessTemp = new access();
    const check = await accessTemp.getDataToken(req, res, next);
    if (check && accessTemp.userData.type == 'A') {
        return true;
    }
    return false;
}