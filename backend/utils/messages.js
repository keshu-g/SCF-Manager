const messages = {
  FETCH: [200, ":item fetched successfully."],
  LOGIN: [200, "Login successful."],
  SUCCESS: [200, ":item sent successfully."],
  ADD_SUCCESS: [200, ":item added successfully."],
  STATUS_SUCCESS: [200, ":item status updated successfully."],
  UPDATE_SUCCESS: [200, ":item updated successfully."],
  RESET_SUCCESS: [200, ":item reset successfully."],
  DELETE_SUCCESS: [200, ":item deleted successfully."],
  SENT_SUCCESS: [200, ":item sent successfully."],
  CUSTOM_SUCCESS: [200, ":item."],
  CUSTOM_PARTIAL_SUCCESS: [207, ":item."],

  CUSTOM_ERROR: [400, ":item."],
  SENT_ERROR: [400, "Couldn't sent :item."],
  ADD_ERROR: [400, "Couldn't create :item."],
  UPDATE_ERROR: [400, "Couldn't update :item."],
  DELETE_ERROR: [400, "Couldn't remove :item."],
  REQUIRED: [400, ":item is required."],
  EXISTS: [409, ":item already exists."],
  EMAIL_EXISTS: [400, "User with this emailID already exists."],
  EXPIRED: [400, "Invalid/Expired :item, please try again."],
  PASS_EXPIRED: [400, "Password has been expired. Please check your email"],
  USED_PASSWORD: [
    400,
    "Password has been used in past, please create a new one",
  ],
  INVALID_AUTH: [401, "Invalid Email or Password"],
  INVALID: [400, "Invalid :item."],
  UNAUTHORIZED: [401, ":item is unauthorized. Please login again."],
  FORBIDDEN: [403, ":item does not have access."],
  NOT_FOUND: [404, ":item not found."],
  INSUFFICIENT_QUANTITY: [400, "Insufficient quantity of material :item."],
  ITEM_IN_USE: [400, ":item is in used in a product and can't be deleted."],

  SERVER_ERROR: [500, "Something went wrong. Please try again later."],
};

export default messages;
