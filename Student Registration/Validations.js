const form = document.querySelector("form");
const submitBtn = document.querySelector(".submit-button");
const SHEET_LINK =
  "https://script.google.com/macros/s/AKfycbyz4Z2AGys7o9_M6RDNkWDKS8rt8Ci3l0GzTvS8QNot233p4WzTUKr8uPoAoV-HkA_4kQ/exec";
const errorBorderStyle = "1.2px solid red";
const normalBorderStyle = "1.2px solid #dee2e6";

function validateCGPA(field) {
  if (field.value < 0 || field.value > 10 || field.value === "") {
    setBorderWithMessage(field, null, errorBorderStyle, "");
    return false;
  } else {
    setBorderWithMessage(field, null, normalBorderStyle, "");
    return true;
  }
}

function validatePercentage(field) {
  if (field.value < 0 || field.value > 100 || field.value === "") {
    setBorderWithMessage(field, null, errorBorderStyle, "");
    return false;
  } else {
    setBorderWithMessage(field, null, normalBorderStyle, "");
    return true;
  }
}

const qualificationCheckboxes = singleCheckboxTick(
  document.querySelectorAll(".Qualifications input")
);

function checkSpecialCharacters(field, fieldErr) {
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
  if (
    Array.from(field.value).some((char) => specialCharacters.includes(char))
  ) {
    setBorderWithMessage(
      field,
      fieldErr,
      errorBorderStyle,
      "Name Includes Special Characters"
    );
    return false;
  } else {
    setBorderWithMessage(field, fieldErr, normalBorderStyle, "");
    return true;
  }
}

function setBorderWithMessage(field, fieldErr, borderStyle, content) {
  field.style.borderBottom = borderStyle;
  if (fieldErr !== null) fieldErr.innerHTML = content;
}

function singleCheckboxTick(checkboxes) {
  checkboxes.forEach((item) => {
    item.addEventListener("change", function () {
      if (this.checked) {
        checkboxes.forEach((otherItem) => {
          if (otherItem !== this) otherItem.checked = false;
        });
      }
    });
  });
  return checkboxes;
}

function checkEmptyLength(field, fieldErr) {
  const isEmpty = field.value.trim().length === 0;
  const borderStyle = isEmpty ? errorBorderStyle : normalBorderStyle;
  const message = isEmpty ? "Required" : "";
  setBorderWithMessage(field, fieldErr, borderStyle, message);
  return !isEmpty;
}

function checkMobile(mobileField, mobileFieldErr) {
  if (mobileField.value.trim().length !== 10) {
    setBorderWithMessage(
      mobileField,
      mobileFieldErr,
      errorBorderStyle,
      "10 Digits Expected"
    );
    return false;
  } else {
    setBorderWithMessage(mobileField, mobileFieldErr, normalBorderStyle, "");
    return true;
  }
}

function checkboxCheck(checkboxes, error = null, message = null) {
  const notChecked = Array.from(checkboxes).every(
    (checkbox) => !checkbox.checked
  );
  if (notChecked) {
    if (error !== null)
      error.innerText = message !== null ? message : "Select One Of Option";
    return false;
  }
  if (!notChecked) {
    if (error !== null) error.innerText = "";
    return true;
  }
}

function checkEmail(emailField, emailFieldErr) {
  const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  if (!emailPattern.test(emailField.value)) {
    setBorderWithMessage(
      emailField,
      emailFieldErr,
      errorBorderStyle,
      "Invalid Email Format"
    );
    return false;
  } else {
    setBorderWithMessage(emailField, emailFieldErr, normalBorderStyle, "");
    return true;
  }
}

function checkNumbers(field, fieldErr) {
  if (/\d/.test(field.value)) {
    setBorderWithMessage(
      field,
      fieldErr,
      errorBorderStyle,
      "Only Characters allowed"
    );
    return false;
  } else {
    setBorderWithMessage(field, fieldErr, normalBorderStyle, "");
    return true;
  }
}

function checkEmptySpecialCharNumbers(field, fieldErr) {
  return (
    checkEmptyLength(field, fieldErr) &&
    checkSpecialCharacters(field, fieldErr) &&
    checkNumbers(field, fieldErr)
  );
}

function validateSoftSkills() {
  const oralSkills = document.querySelectorAll("#oral-skills input");
  const commSkills = document.querySelectorAll("#communication-skills input");
  const criticalSkills = document.querySelectorAll("#critical-skills input");
  const timeManagement = document.querySelectorAll("#time-management input");
  const writtenSkills = document.querySelectorAll("#written-skills input");
  const probSolving = document.querySelectorAll("#problem-solving input");
  const checksErr = document.querySelector(".checks-err");
  return (
    checkboxCheck(oralSkills, checksErr, "Mark All The Above Skills") &&
    checkboxCheck(commSkills, checksErr, "Mark All The Above Skills") &&
    checkboxCheck(criticalSkills, checksErr, "Mark All The Above Skills") &&
    checkboxCheck(timeManagement, checksErr, "Mark All The Above Skills") &&
    checkboxCheck(writtenSkills, checksErr, "Mark All The Above Skills") &&
    checkboxCheck(probSolving, checksErr, "Mark All The Above Skills")
  );
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {};
  const [_, __, firstName, lastName, phone, email] =
    document.querySelectorAll(".stu-details input");
  const [firstNameErr, lastNameErr, phoneErr, emailErr] =
    document.querySelectorAll(".stu-details .error");

  const [
    school,
    intermediate,
    ug,
    mba,
    schoolPercentage,
    intermediatePercentage,
    ugCGPA,
    mbaCGPA,
  ] = document.querySelectorAll(".education input");
  const [schoolYear, intermediateYear, ugYear, mbaYear] =
    document.querySelectorAll(".education select");

  const techSkills = document.querySelectorAll(".tech-skills input");

  const bools = [];
  bools.push(checkEmptySpecialCharNumbers(firstName, firstNameErr));
  bools.push(checkEmptySpecialCharNumbers(lastName, lastNameErr));
  bools.push(checkMobile(phone, phoneErr));
  bools.push(checkEmail(email, emailErr));
  bools.push(
    checkboxCheck(
      qualificationCheckboxes,
      document.querySelector(".qualification-error")
    )
  );
  bools.push(checkEmptySpecialCharNumbers(school, null));
  bools.push(checkEmptySpecialCharNumbers(intermediate, null));
  bools.push(checkEmptySpecialCharNumbers(ug, null));
  bools.push(checkEmptySpecialCharNumbers(mba, null));
  bools.push(checkEmptyLength(schoolPercentage, null));
  bools.push(checkEmptyLength(intermediatePercentage, null));
  bools.push(checkEmptyLength(ugCGPA, null));
  bools.push(checkEmptyLength(mbaCGPA, null));
  bools.push(validatePercentage(schoolPercentage));
  bools.push(validatePercentage(intermediatePercentage));
  bools.push(validateCGPA(ugCGPA));
  bools.push(validateCGPA(mbaCGPA));
  bools.push(validateSoftSkills());
  bools.push(checkboxCheck(techSkills, document.querySelector(".tech-error")));

  if (bools.every((val) => val === true)) {
    const formData = new FormData(form);
    formData.forEach((val, key) => {
      data[key] = val;
    });

    let arr = [];
    for (let cb of techSkills) {
      if (cb.checked) {
        arr.push(cb.value);
      }
    }
    data["Technical Skills"] = arr.join(", ");
    data["College Name"] = "Mother Theressa Engineering College";
    data["Branch"] = "Master Of Business Administration";

    const { Communication, Critical, Oral, Problem, Time, Written } = data;
    delete data.Communication;
    delete data.Critical;
    delete data.Oral;
    delete data.Problem;
    delete data.Time;
    delete data.Written;

    data["Soft Skills"] = [
      `Communication - ${Communication}`,
      `Critical Thinking - ${Critical}`,
      `Oral - ${Oral}`,
      `Problem Solving - ${Problem}`,
      `Time Management - ${Time}`,
      `Written Skills - ${Written}`,
    ].join("; ");

    const tempFormData = new FormData();
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        tempFormData.append(key, data[key]);
      }
    }
    try {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Submitting... <div class="spinner-border spinner-border-sm" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;
      const response = await fetch(SHEET_LINK, {
        method: "POST",
        body: tempFormData,
      });
      const res = await response.json();
      alert("Thank you for submitting the form!");
      window.location.reload();
    } catch (e) {
      console.log("Error!", e.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit";
    }
  }
});
