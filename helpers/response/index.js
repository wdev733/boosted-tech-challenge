exports.successResponse = (req, res, data, code = 200) =>
  res.send({
    code,
    data,
    success: true,
  });

exports.errorResponse = async (
  req,
  res,
  errorMessage = 'Something went wrong',
  code = 500,
  error = {}
) => {
  return res.status(500).json({
    code,
    errorMessage,
    error,
    data: null,
    success: false,
  });
};