
// schema
 const userValidate = {
    organization: {
      exists: {
        errorMessage: "Organization is required",
        options: { checkFalsy: true },
      },
      isString: { errorMessage: "Organization should be string" },
    },
   
    "products.*": {
        isString: {errorMessage: "input should be a string"}
    },
    marketValue: {
        exists: {
          errorMessage: "Organization is required",
          options: { checkFalsy: true },
        },
        isString: { errorMessage: "marketValue should be string" },
      },
    address: {
        exists: {
          errorMessage: "address is required",
          options: { checkFalsy: true },
        },
        isString: { errorMessage: "address should be string" },
      },
    ceo: {
        exists: {
          errorMessage: "ceo is required",
          options: { checkFalsy: true },
        },
        isString: { errorMessage: "ceo should be string" },
      },
    country: {
        exists: {
          errorMessage: "country is required",
          options: { checkFalsy: true },
        },
        isString: { errorMessage: "country should be string" },
      },
    noOfEmployees:{
        exists: {
          errorMessage: "noOfEmployees is required",
          options: { checkFalsy: true },
        },
        isNumeric: { errorMessage: "noOfEmployees should be number" },
      },
    
    "employees.*": {
        isString: {errorMessage: "input should be string"}
    }
}

export default userValidate






  
