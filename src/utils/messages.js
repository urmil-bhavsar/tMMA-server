const messages = {
  SUCCESS: {
    LOGIN: 'User logged in successfully',
    BOARD_CREATE: 'Board added successfully'
  },
  ERROR: {
    USER_DOESNOT_EXIST: 'User does not exist',
    USER_CREDENTIALS: 'Invalid user credentials',
    ACCESS_TOKEN_GENERATION: 'Something went wrong while generating access token',
    INSUFFICIENT_CREDENTIALS: 'Insufficient user credentials',
    UNAUTHORIZED_ACCESS: 'Your account doesnot exist',
    INVALID_TOKEN: 'Invalid Access Token',
    BOARD_EXISTS: 'This board already exists',
    BOARD_CREATE: 'Something went wrong while creating the board'
  }
}

module.exports = messages