const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
      // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.companyName = !isEmpty(data.companyName) ? data.companyName : "";
    data.companyINN = !isEmpty(data.companyINN) ? data.companyINN : "";
    data.companyPhone = !isEmpty(data.companyPhone) ? data.companyPhone : "";
    data.password = !isEmpty(data.password) ? data.password : "";
      // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
      // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
      // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
      // Company Name checks;
  if(Validator.isEmpty(data.companyName)) {
    errors.companyName = "Company Name is required";
  }
      // Company INN checks;
  if(Validator.isEmpty(data.companyINN)) {
    errors.companyINN = "Company INN field is required";
  }
      // Company Phone checks;
  if(Validator.isEmpty(data.companyPhone)) {
    errors.companyPhone = "Company Phone field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};