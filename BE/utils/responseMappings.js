module.exports = {
    getSuccessMessage: (
        res,
        message = "Action Performed Successfully",
        data = {},
        status = 200
    ) => {
        return res.send({
            message,
            data,
            status
        })
    },
    getErrorMessage: (
        res,
        message = "Action Could Not be Performed",
        status = 500
    ) => {
        return res.send({
            message,
            status
        })
    }
}
