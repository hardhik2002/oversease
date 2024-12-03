const form = document.querySelector("form");
const tickBoxes = singleCheckboxTick(document.querySelectorAll(".test-box"))
const testDetails = document.querySelector(".test-details")

const errorBorderStyle = "1.2px solid red";
const normalBorderStyle = "1.2px solid #dee2e6";
const specialCharacters = [
  "!",
  '"',
  "#",
  "$",
  "%",
  "&",
  "'",
  "(",
  ")",
  "*",
  "+",
  ",",
  "-",
  ".",
  "/",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "@",
  "[",
  "\\",
  "]",
  "^",
  "_",
  "`",
  "{",
  "|",
  "}",
  "~",
  "©",
  "®",
  "™",
  "°",
  "±",
  "§",
  "€",
  "£",
  "¥",
  "¤",
  "©",
  "∞",
  "≠",
  "÷",
  "×",
  "≡",
  "≤",
  "≥",
  "π",
  "μ",
  "√",
  "∑",
  "≈",
];

function singleCheckboxTick(checkboxes) {
    checkboxes.forEach(item => {
        item.addEventListener('change', function() {
          if(this.checked) {
            checkboxes.forEach(otherItem => {
              if(otherItem !== this) otherItem.checked = false;
            })
          }
        })
      })
    return checkboxes;
}


for(const tickBox of tickBoxes) {
    tickBox.addEventListener("click", e => {
        const isHidden = tickBox.value !== "yes";
        testDetails.classList.toggle('hidden', isHidden);
    })
}

function setBorderWithMessage(field, fieldErr, borderStyle, content) {
  field.style.border = borderStyle;
  fieldErr.innerHTML = content;
}

function setBottomBorder(field, borderStyle) {
  field.style.borderBottom = borderStyle;
}

function setFullBorder(field, borderStyle) {
  field.style.border = borderStyle;
}


function checkEmptyLength(field, fieldErr = null, fullBorder = false) {
  const isEmpty = field.value.trim().length === 0;
  const borderStyle = isEmpty ? errorBorderStyle : normalBorderStyle;
  const message = isEmpty ? "Required" : "";

  if (fieldErr === null) {
      if (fullBorder) {
          setFullBorder(field, borderStyle);
      } else {
          setBottomBorder(field, borderStyle);
      }
  } else {
      setBorderWithMessage(field, fieldErr, borderStyle, message);
  }

  return !isEmpty;
}


function checkEmail(emailField, emailFieldErr) {
    const emailPattern =
  /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  if(!emailPattern.test(emailField.value)) {
    setBorderWithMessage(email, emailFieldErr, errorBorderStyle, "Invalid Email Format");
    return false;
  } else {
    setBorderWithMessage(email, emailField, normalBorderStyle, "");
    return true;
  }
}

function checkMobile(mobileField, mobileFieldErr) {
  if(mobileField.value.trim().length !== 10) {
    setBorderWithMessage(mobileField, mobileFieldErr, errorBorderStyle, "10 Digits Expected");
    return false;
  } else {
    setBorderWithMessage(mobileField, mobileFieldErr, normalBorderStyle, "");
    return true;
  }
}

function checkSpecialCharacters(field, fieldErr) {
  if(Array.from(field.value).some((char) =>
    specialCharacters.includes(char)
  )) {
    setBorderWithMessage(field, fieldErr, errorBorderStyle, "Name Includes Special Characters");
    return false;
  } else {
    setBorderWithMessage(field, fieldErr, normalBorderStyle, "");
    return true;
  }
}

function checkNumbers(field, fieldErr) {
  if (/\d/.test(field.value)) {
    setBorderWithMessage(field, fieldErr, errorBorderStyle, "Only Characters allowed")
    return false;
  } else {
    setBorderWithMessage(field, fieldErr, normalBorderStyle, "");
    return true;
  }
}

function checkMobile(mobField, mobFieldErr) {
  if (mobField.value.trim().length !== 10) {
    setBorderWithMessage(mobField, mobFieldErr, errorBorderStyle, "10 Digits Required");
    return false;
  } else {
    setBorderWithMessage(mobField, mobFieldErr, normalBorderStyle,  "");
    return true;
  }
}

function checkboxCheck(checkboxes, error) {
  const notChecked = Array.from(checkboxes).every(
    (checkbox) => !checkbox.checked
  );
  if(notChecked) {
      error.innerText = "Select One Of Option";
      return false;
  } 
  if(!notChecked) {
    error.innerText = "";
    return true;
  }
}


form.addEventListener('submit', e => {
    e.preventDefault();

    const [college, fullName, branch, email, mobile] = document.querySelectorAll(".user_details input");
    const [collegeErr, fullNameErr, branchErr, emailErr, mobileErr] = document.querySelectorAll(".error")
    const [school, inter, bachelors, year10_1, year10_2, yearInter_1, yearInter_2, btechInter_1, btechInter_2, perc10, percInter, percBachelor] = document.querySelectorAll(".education input");
    const examSelectCheckBoxes = document.querySelectorAll(".exam-select input")

    const internationalTests = document.querySelectorAll(".test-box");
    const admissionTarget = document.querySelectorAll(".adm")
    const countries = document.querySelectorAll(".country");

    const [IELTS, TOEFL, DUOLINGO, PTE, GRE, GMAT, SAT] = document.querySelectorAll(".test-scores input");
    const intendedCourses = document.querySelectorAll(".intended_courses input");

    let isValid = false;
    isValid = checkEmptyLength(college, collegeErr);
    isValid = checkEmptyLength(fullName, fullNameErr) && (checkSpecialCharacters(fullName, fullNameErr) && checkNumbers(fullName, fullNameErr));
    isValid = checkEmptyLength(branch, branchErr);
    isValid = checkEmptyLength(email, emailErr);
    isValid = checkEmail(email, emailErr);
    isValid = checkMobile(mobile, mobileErr);
    isValid = checkEmptyLength(school)
    isValid = checkEmptyLength(inter)
    isValid = checkEmptyLength(bachelors)
    isValid = checkEmptyLength(year10_1)
    isValid = checkEmptyLength(year10_2)
    isValid = checkEmptyLength(yearInter_1)
    isValid = checkEmptyLength(yearInter_2)
    isValid = checkEmptyLength(btechInter_1)
    isValid = checkEmptyLength(btechInter_2)
    isValid = checkEmptyLength(perc10)
    isValid = checkEmptyLength(percInter)
    isValid = checkEmptyLength(percBachelor)

    const selectedExams = [];

    for(var examSelect of examSelectCheckBoxes) {
      if(examSelect.checked) {
        selectedExams.push(examSelect.value);
      }
    }
    
    for(const exam of selectedExams) {
      switch(exam) {
        case "ielts" : 
          isValid = checkEmptyLength(IELTS, null, true);
          break;
        case "toefl" :
          isValid = checkEmptyLength(TOEFL, null, true);
          break;

        case "duolingo" : 
          isValid = checkEmptyLength(DUOLINGO, null, true);
          break;

        case "pte" : 
          isValid = checkEmptyLength(PTE, null, true);
          break;
        case "gre" : 
          isValid = checkEmptyLength(GRE, null, true);
          break;
        case "gmat" : 
          isValid = checkEmptyLength(GMAT, null, true);
          break;
        case "sat" : 
          isValid = checkEmptyLength(SAT, null, true);
          break;
        default: 
          break;
      }
    }

    
    
    
    
    const internationalCheck = document.querySelector(".international-check")
    const admError = document.querySelector(".adm-error");
    const countryError = document.querySelector('.country-error');
    const intendedError = document.querySelector(".int-error");
    const examError = document.querySelector(".exam-error");

    isValid = checkboxCheck(intendedCourses, intendedError);
    isValid = checkboxCheck(internationalTests, internationalCheck)
    isValid = checkboxCheck(admissionTarget, admError);
    isValid = checkboxCheck(countries, countryError);
    isValid = checkboxCheck(examSelectCheckBoxes, examError);


})