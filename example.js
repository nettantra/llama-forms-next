let l1 = [
    schema={
        type: 'object',
        properties: {
            email: {
                type: 'string',
                required: true,
                enum:"",
            },
            password:{
                type: 'string',
                required: true,
                enum:"",
            }
        }
    },
    options = {
        type: 'object',
        fields:{
            email: {
                type: 'email',
                label: 'Name',
                placeholder:"Enter your name",
                description: "This is email field",
            },
            password:{
                type: 'password',
                label: 'Password',
                placeholder:"Enter your password",
                description: "This is passsword field",
            }
        }
    },
    data={
        email: 'NetTantra',
        password: '123456'
    }
]

let l2 = [
    schema={
        wizard: true,
        fields:{
            email:{
                type: 'text',
                label: 'Email',
                value: 'nettantra@nettantra.net',
                placeholder:"Enter your email",
                validationRegex:"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
                errorMessage:"Please enter a valid email address",
                step:1
            },
            password:{
                type: 'password',
                label: 'Password',
                value: '123456',
                placeholder:"Enter your password",
                validationRegex:"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})",
                errorMessage:"Please enter a valid password",
                step:2
            }
        }
    }
]
let schema=[{
    {
      title: "Login Form",
      description: "Description About this form",
      action: "",
      // autocomplete: true,
      // novalidate: true,
      wizard: true,
      fieldSet: {
        1: ["email", "date", "image"],
        2: ["details", "image", "color"],
      },
      type: "object",
      fields: {
        email: {
          // step: 2,
          type: "email",
          label: "Email",
          value: "asvga@gmail.com",
          description: "This is email field",
          placeholder: "example@example.com",
          required: false,
          // validationRegax:"^[a-z0-9]+@[a-z]+\.[a-z]{2,3}",
          errorMessage: "",
          readOnly: false,
          maxLength: 30,
          autoFocus: true,
          autoComplete: true,
          // style:{color:"red"}
        },
        details: {
          step: 1,
          type: "textarea",
          label: "Details",
          value: "",
          description: "This is details field",
          placeholder: "Write......",
          // required: true,
          errorMessage: "",
          readOnly: false,
          autoFocus: true,
          autoComplete: true,
          // style:{color: 'red'},
        },
        color: {
          step: 3,
          type: "color",
          label: "Color",
          description: "This is email field",
          // required: true,
          readOnly: false,
          // style:{color:"red",hight:"200px"}
        },
        range: {
          step: 1,
          type: "range",
          label: "Range",
          value: 80,
          // required: true,
          errorMessage: "",
          readOnly: false,
          maxLength: 30,
          autoFocus: true,
          autoComplete: true,
          // style:{color:"red"},
          min: 0,
          max: 200,
        },
        date: {
          step: 3,
          type: "date",
          label: "Date",
          value: "1997-02-01",
          // required: true,
          errorMessage: "",
          readOnly: false,
          autoFocus: true,
          autoComplete: true,
          // style:{color:"red"},
          min: "2000-01-01",
          max: "2000-01-02",
        },
        image: {
          step: 1,
          type: "file",
          label: "Upload Image",
          description: "This is file field",
          // required: true,
          errorMessage: "Please input jpg,png,jpeg only",
          readOnly: false,
          maxFileSize: 10000,
          minFileSize: 1,
          // style:{color:"red"},
          accept: ["jpg", "png", "jpeg"],
        },
        gender: {
          step: 5,
          type: "dropdown",
          label: "Gender",
          value: "",
          description: "Select Your Gender",
          placeholder: "Select Your Gender",
          autofocus: true,
          readOnly: false,
          values: {
            Male: 'male',
            Female: 'female',
            Unknown: 'unknown'
          }
        },
        question: {
          step: 4,
          type: "radio",
          label: "Is this ok ?",
          value: "no",
          description: "No this is not ok",
          readOnly: false,
          required: true,
          values: ['yes', 'no', 'I dont know']
        },
        think: {
          step: 3,
          type: "checkbox",
          value: { "You are good": true },
          label: "What do you think ?",
          values: ["You are good", "You have a good sense", "Maybe", "Also I am confused"],
          description: "This is a checkbox"
        },
        time: {
          step: 4,
          type: "time",
          label: "Time",
          description: "This is a time field",
          readOnly: false,
          // required: true,
          autoFocus: true,
          autoComplete: true,
        }
      },
      buttons: {
        login: {
          title: "Login",
          fn: login_test
        },
        reset: {
          title: "Reset",
          fn: reset_test
        }
      }
    }
  ]



  for (let key in options) {
    //check if the key is in the schema

    // console.log(key)
    if (schema[key]) {
        //check if the key is in the value
        if (value[key]) {
            fields[key] = {value:value[key]}
        } else {
            fields[key] = {value:""}
        }
        fields[key].type = options[key].type
    } else {
        alert("The key " + key + " is not in the schema")
    }
}
