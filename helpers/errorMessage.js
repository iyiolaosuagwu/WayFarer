const errorMessage = (res, statusCode, message) => {
    res.status(statusCode).json({
        status: 'error',
        message
    });
};

export default errorMessage;
