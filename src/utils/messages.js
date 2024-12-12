const messages = {
  SUCCESS: {
    LOGIN: 'User logged in successfully',
    BOARD_CREATE: 'Board added successfully',
    BOARD_UPDATE: 'Board upddated successfully',
    USER_INFO: 'User data fetched successfully',
    BOARDS: 'Boards fetched successfully'
  },
  ERROR: {
    USER_DOESNOT_EXIST: 'User does not exist',
    USER_CREDENTIALS: 'Invalid user credentials',
    ACCESS_TOKEN_GENERATION: 'Something went wrong while generating access token',
    INSUFFICIENT_CREDENTIALS: 'Insufficient user credentials',
    UNAUTHORIZED_ACCESS: 'Your account doesnot exist',
    INVALID_TOKEN: 'Invalid Access Token',
    BOARD_EXISTS: 'This board already exists',
    BOARD_DOES_NOT_EXISTS: 'This board does not exists',
    BOARD_CREATE: 'Something went wrong while creating the board',
    INSUFFICIENT_DATA: 'Missing or incomplete request data',
    SOMETHING_WENT_WRONG: 'Something went wrong'
  }
}

module.exports = messages