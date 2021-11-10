exports.login = (message, results, statusCode, bool) => {
    return {
      message,
      error: bool,
      code: statusCode,
      results
    };
  };
