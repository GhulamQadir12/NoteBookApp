// const validateEmail = (email: string) => {
//   const re =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// };
import * as yup from 'yup';

export const signinFormValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
  password: yup.string().required('req_password').min(3, 'req_pass_short'),
});
export const forgotemailFormValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
});
export const forgotPasswordValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
  // password: yup.string().required('req_pass').min(8, 'weak_pass'),
  // confirm_password: yup
  //   .string()
  //   .required('New Password is required')
  //   .min(8, 'New weak_pass'),
});
export const renewpasswordFormValidation = yup.object().shape({
  password: yup.string().required('req_pass').min(8, 'weak_pass'),
  confirm_password: yup
    .string()
    .required('req_pass')
    .oneOf([yup.ref('password')], 'miss_match_pass'),
});
export const signupFormValidation = yup.object().shape({
  first_name: yup.string().required('req_first_name'),
  // middle_name: yup.string().required('req_middle_name'),
  email: yup.string().email('invalid_email').required('req_email'),
  phone: yup
    .string()
    .test(
      'is-ten-digits',
      'Phone number mus be less then 15 digits',
      (value: any) => {
        if (!value) return true; // Allow empty values
        return value.length <= 15 && !isNaN(value); // Check for 10 digits and numeric characters
      },
    )
    .required('Phone is required'),

  password: yup.string().required('req_password').min(8, 'weak_pass'),
  confirm_password: yup
    .string()
    .required('req_confirm_password')
    .oneOf([yup.ref('password')], 'miss_match_pass'),
  surname: yup.string().required('req_surname'),
  // gender: yup.string().required('req_gender'),
  // country_code: yup.string().required('req_country_code'),
  // house_name: yup.string().required('req_house_name'),
  // first_line_of_address: yup.string().required('req_first_line_of_address'),
  // postal_code: yup.string().required('req_postal_code'),
  // city: yup.string().required('req_city'),
  // cnic: yup.number().min(13, 'invalid_cnic'),
  // dob: yup.string().required('req_dob'),
});

export const updatePasswordValidation = yup.object().shape({
  confirm_password: yup
    .string()
    .required('New Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match') // Check if it matches 'password'
    .min(8, 'New weak_pass'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Weak password'),
});
// export const updateProfileFormValidation = yup.object().shape({
//   name: yup.string().required('req_name'),
//   // last_name: yup.string().required('req_first_name'),
//   email: yup.string().email('invalid_email').required('req_email'),
//   phone: yup
//     .number()
//     .typeError('invalid_phone')
//     .positive('invalid_phone')
//     .integer('invalid_phone')
//     .min(8, 'invalid_phone')
//     .required('Phone is required'),

//   doc_cat_id: yup.string().required('req_cat'),
//   zip_code: yup.string().required('req_zip_code'),
//   city: yup.string().required('req_city'),
//   state: yup.string().required('req_state'),
//   price: yup.string().required('req_price'),
//   experience: yup.string().required('req_experience'),
// });
// export const updateProfileFormValidation = yup.object().shape({
//   first_name: yup.string().required('req_first_name'),
//   // last_name: yup.string().required('req_first_name'),
//   email: yup.string().email('invalid_email').required('req_email'),
//   phone: yup
//     .number()
//     .typeError('invalid_phone')
//     .positive('invalid_phone')
//     .integer('invalid_phone')
//     .min(8, 'invalid_phone')
//     .required('Phone is required'),
// });

export const updateProfileFormValidation = yup.object().shape({
  firstname: yup.string().required('req_name'),
  email: yup.string().email('invalid_email').required('req_email'),
  phone: yup
    .string()
    .test('is-ten-digits', 'Phone must be exactly 10 digits', (value: any) => {
      if (!value) return true; // Allow empty values
      return value.length <= 15 && !isNaN(value); // Check for 10 digits and numeric characters
    })
    .required('Phone is required'),
    password: yup.string().required('req_pass').min(8, 'weak_pass'),

});
export const updatePasswordFormValidation = yup.object().shape({
  password: yup.string().required('req_pass').min(8, 'weak_pass'),
  confirm_password: yup
    .string()
    .required('req_pass')
    .oneOf([yup.ref('password')], 'miss_match_pass'),
});
export const addReimbursementFormValidation = yup.object().shape({
  date: yup.date()
    .required('Request date is required')
    .nullable(),
    reimbursementType: yup.mixed()
    .required('Reimbursement Type  is required'),
    reimbursementDate: yup.date()
    .required('Request date is required')
    .nullable(),
  amount: yup.number()
    .required('Amount is required')
    .typeError('Amount must be a number')
    .min(0, 'Amount cannot be negative'),
  advancedPaid: yup.number()
    .required('Advanced Paid is required')
    .typeError('Advance Paid must be a number')
    .min(0, 'Advance Paid cannot be negative'),
  document: yup.mixed()
    .required('Document is required')
    .nullable(),
  reason: yup.string()
    .required('Reason is required')
    .min(10, 'Reason must be at least 10 characters long'),
});
// export const addTodoFormValidation = yup.object().shape({
//   leaveType: yup.mixed()
//     .required('Leave Type is required'),
//     date_from: yup.date()
//     .required('date is required')
//     .nullable(),
//     date_to: yup.date()
//     .required('date is required')
//     .nullable(),
//     reason: yup.string()
//     .required('Reason is required')
//     .min(10, 'Reason must be at least 10 characters long'),
//     // document: yup.mixed()
//     // .required('Document is required')
//     // .nullable(),
// });
export const addLeaveFormValidation = yup.object().shape({
  leaveType: yup.mixed()
    .required('Leave Type is required'),
    date_from: yup.date()
    .required('date is required')
    .nullable(),
    date_to: yup.date()
    .required('date is required')
    .nullable(),
    reason: yup.string()
    .required('Reason is required')
    .min(10, 'Reason must be at least 10 characters long'),
    // document: yup.mixed()
    // .required('Document is required')
    // .nullable(),
});
export const addLoanFormValidation = yup.object().shape({
  request_date: yup.date()
    .required('date is required')
    .nullable(),
    amount: yup.number()
    .required('Amount is required')
    .nullable()
    .min(0, 'Amount cannot be negative'),
    installments: yup.number()
    .required('Installments number required')
    .nullable()
    .min(1, 'Installments must be greater than 0'),
    deduction_month: yup.date()
    .required('deduction date is required')
    .nullable(),
    reason: yup.string()
    .required('Reason is required')
    .min(10, 'Reason must be at least 10 characters long'),
   
});
// export const addAtdCorrectionFormValidation = yup.object().shape({
//   request_date: yup.date()
//     .required('date is required')
//     .nullable(),
//     correction_date: yup.date()
//     .required('date is required')
//     .nullable(),
//     chIn_time: yup.time()
//     .required('time is required')
//     .nullable(),
//     chOut_time: yup.date()
//     .required('time is required')
//     .nullable(),
//     advanceAmount: yup.number()
//     .required('Amount is required')
//     .nullable()
//     .min(0, 'Amount cannot be negative'),
//     reason: yup.string()
//     .required('Reason is required')
//     .min(10, 'Reason must be at least 10 characters long'),
   
// });
export const addAdvanceFormValidation = yup.object().shape({
  request_date: yup.date()
    .required('date is required')
    .nullable(),
    advanceAmount: yup.number()
    .required('Amount is required')
    .nullable()
    .min(0, 'Amount cannot be negative'),
    reason: yup.string()
    .required('Reason is required')
    .min(10, 'Reason must be at least 10 characters long'),
   
});
export const addCompliantFormValidation = yup.object().shape({
  complainType: yup.mixed()
    .required('complain type is required')
    .nullable(),
    // departList: yup.mixed()
    // .required('department is required'),
    reason: yup.string()
    .required('Reason is required')
    .min(10, 'Reason must be at least 10 characters long'), 
});
export const addWFHFormValidation = yup.object().shape({
  categoryType: yup.mixed()
    .required('category type is required')
    .nullable(),
    // departList: yup.mixed()
    // .required('department is required'),
    date_from: yup.date()
    .required('date is required')
    .nullable(), 
    date_to: yup.date()
    .required('date is required')
    .nullable(), 
});
export const addOvertimeFormValidation = yup.object().shape({
    request_date: yup.date()
    .required('date is required')
    .nullable(), 
    time_from: yup.date()
    .required('date is required')
    .nullable(), 
    time_to: yup.date()
    .required('date is required')
    .nullable(), 
});
