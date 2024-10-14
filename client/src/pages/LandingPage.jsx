import React from 'react'
import DarkModeSwitcher from '../components/DarkModeSwitcher'
// import the  formik libary 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Swal from 'sweetalert2'
import { json } from 'react-router-dom';


const LandingPage = () => {
  return (
    <div className='w-full min-h-[100vh] py-[2rem] dark:bg-black dark:text-white flex gap-3 flex-col items-center justify-center' >
      <h1 className="heading-l flex gap-4 items-center">
        Form validation
        <DarkModeSwitcher />
      </h1>
      <Formik
        initialValues={{
          fname: '',
          email: '',
          phoneNo: '',
          date: '',
          gender: '',
          password: '',
          Cpassword: '',
          textArea: '',
          country: '',
          term: '',
          image: null // Add this line
        }}
        validate={values => {
          const errors = {};
          console.log("Validation Errors: ", errors);
          //  function for the checking whether the full name field is empty 
          if (!values.fname) {
            errors.fname = 'The full name is required'

          } else if (values.fname.length < 3) {
            errors.fname = 'The full name have to be alteast 3 character'
          }
          //  function for email authentication 
          if (!values.email) {
            errors.email = 'The email is required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          //  functions for phone number validication
          if (values.phoneNo.length == 0) {
            errors.phoneNo = 'The phone number is required';
          } else if (!/^\d{10}$/.test(values.phoneNo)) {
            errors.phoneNo = 'Invalid phone number. It should be 10 digits long.';
          }
          // function for checking weather the age of person is abovve 18
          if (!values.date) {
            errors.date = 'The date of birth is required'
          } else {
            const birthDate = new Date(values.date);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();

            if (age < 18) {
              errors.date = 'You must be at least 18 years old';
            }
          }
          // Functions for gender validication
          if (!values.gender) {
            errors.gender = 'Please select your gender';
          }

          // function for the password authentication
          if (!values.password) {
            errors.password = "The password is required"
          } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)) {
            errors.password = "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character";
          }
          // function for the confirm password
          if (!values.Cpassword) {
            errors.Cpassword = "The confirmation of password"
          } else if (values.password !== values.Cpassword) {
            errors.Cpassword = "incorrect password"
          }
          // Address validation (corrected)
          if (!values.textArea) {
            errors.textArea = 'The address is required';
          }
          // country validation
          if (!values.country) {
            errors.country = 'The country is required'
          }
          if (!values.image) {
            errors.image = 'profile photo is required'
          }
          // term and services validation 
          if (!values.term) {
            errors.term = 'You need to agree terms and condition.'
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("Form submitted with values: ", values);

          // const data = JSON.stringify(values)
          // const userimg = JSON.stringify(values.image)
          // console.log(userimg);

          // Convert the image to base64
          const convertBase64 = (file) => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
            });
          };

          let base64Image = null;
          if (values.image) {
            base64Image = await convertBase64(values.image);
          }

          // Store the form values in localStorage, including the base64-encoded image
          const userData = { ...values, image: base64Image };
          localStorage.setItem('user', JSON.stringify(userData));


          // localStorage.setItem("user", data)
          // localStorage.setItem("userImg", userimg)
          // console.log(data);


          Swal.fire({
            icon: 'success',
            title: "success",
            text: "Created the user",

          });

          setTimeout(() => {
            window.location="/home"
          }, 2000)

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className='w-[20rem] md:w-[30rem] flex gap-2 flex-col border-2 border-dotted border-black dark:border-white px-[2rem] py-[1.5rem] rounded-md shadow-2xl'>
            {/* full name */}
            <div className='flex flex-col gap-1'>
              <span className='font-bold text-[1.2rem]'>Full name</span>
              <Field className="txtField" type="text" name="fname" placeholder={'Enter the full name'} />
              <ErrorMessage className="errorMsg" name="fname" component="div" />
            </div>
            {/* email address */}
            <div className='flex flex-col gap-1'>
              <span className='font-bold text-[1.2rem]'>Email</span>
              <Field className="txtField" type="email" name="email" placeholder={'Enter the Email'} />
              <ErrorMessage className="errorMsg" name="email" component="div" />
            </div>
            {/* phone number */}
            <div className='flex flex-col gap-1'>
              <span className='font-bold text-[1.2rem]'>Phone number</span>
              <Field className="txtField number-input" type="number" name="phoneNo" placeholder={'Enter the Phone number'} />
              <ErrorMessage className="errorMsg" name="phoneNo" component="div" />
            </div>
            {/* Date of birth */}
            <div className='flex flex-col gap-1'>
              <span className='font-bold text-[1.2rem]'>DOB</span>
              <Field className="txtField " type="date" name="date" />
              <ErrorMessage className="errorMsg" name="date" component="div" />
            </div>
            {/* Gender */}
            <div className='flex flex-col gap-1'>
              <span className='font-bold text-[1.2rem]'>Gender</span>
              <label htmlFor="gender" className='flex items-center gap-2'>
                <Field className="txtField" type="radio" name="gender" value="male" /> Male
                <Field className="txtField" type="radio" name="gender" value="female" /> Female
                <Field className="txtField" type="radio" name="gender" value="others" /> Others
              </label>
            </div>
            <ErrorMessage className="errorMsg" name="gender" component="div" />
            {/* password */}
            <div className='flex flex-col gap-1'>
              <span className='font-bold text-[1.2rem]'>password</span>
              <Field className="txtField" type="text" name="password" placeholder={'Enter the password'} />
              <ErrorMessage className="errorMsg" name="password" component="div" />
            </div>
            {/* confirm password */}
            <div className='flex flex-col gap-1'>
              <span className='font-bold text-[1.2rem]'>Confirm password</span>
              <Field className="txtField" type="password" name="Cpassword" placeholder={'Confirm the password'} />
              <ErrorMessage className="errorMsg" name="Cpassword" component="div" />
            </div>
            {/* address */}
            <div className='flex flex-col gap-1'>
              <span className='font-bold text-[1.2rem]'>Address</span>
              <Field as="textarea" className="txtField resize-none " name="textArea" placeholder={'Enter your address'} />
              <ErrorMessage className="errorMsg" name="textArea" component="div" />
            </div>
            {/* Country */}
            <div className='flex flex-col gap-1'>
              <span className='font-bold text-[1.2rem]'>Country</span>
              <Field as="select" className="txtField" name="country">
                <option value="" label="Select your country" />
                <option value="India" label="India" />
                <option value="USA" label="USA" />
                <option value="Canada" label="Canada" />
              </Field>
              <ErrorMessage className="errorMsg" name="country" component="div" />
            </div>
            {/* upload the user image */}
            <div className='flex flex-col gap-1'>
              <span className='font-bold text-[1.2rem]'>Upload profile pic</span>
              <Field name="image">
                {({ form }) => (
                  <input
                    type="file"
                    onChange={(event) => {
                      form.setFieldValue("image", event.currentTarget.files[0]);
                    }}
                    className="txtField"
                  />
                )}
              </Field>
              <ErrorMessage className="errorMsg" name="image" component="div" />
            </div>
            {/* term and condition */}
            <div className='flex items-center gap-3'>
              <Field className="txtField" type="checkbox" name="term" />
              <span className='font-bold text-[.8rem]'>I accept the terms and conditions</span>
            </div>
            <ErrorMessage className="errorMsg" name="term" component="div" />

            {/* button section */}
            <button className='h-[3rem] bg-black text-white dark:bg-slate-600' type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>

    </div>
  )
}

export default LandingPage