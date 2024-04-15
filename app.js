const dialog = document.querySelector("dialog");
const calcBtn = document.querySelector(".calc-btn");
const closeBtn = document.querySelector("dialog button");
const taxAmountElement = document.querySelector("#tax");
const warning = document.querySelectorAll(".warning");

calcBtn.addEventListener("click", () => {
  let grossIncome = document
    .querySelector("#gross-annual-income")
    .value.trim();
  let extraIncome = document.querySelector("#extra-income").value.trim();
  let deductions = document.querySelector("#total-deductions").value.trim();
  let ageGroup = document.querySelector("#age-group").value.trim();
  
  grossIncome = parseFloat(grossIncome);
  extraIncome = parseFloat(extraIncome);
  deductions = parseFloat(deductions);


  console.log("Gross Income:", grossIncome);
  console.log("Extra Income:", extraIncome);
  console.log("Deductions:", deductions);
  console.log("Age Group:", ageGroup);
  
  if (validateForm()) {
    calculateTax(grossIncome, extraIncome, deductions, ageGroup);
    dialog.showModal();
  }
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

function calculateTax(grossIncome, extraIncome, deductions, ageGroup) {
  // Convert input values to numbers
  grossIncome = parseFloat(grossIncome);
  extraIncome = parseFloat(extraIncome);
  deductions = parseFloat(deductions);

  // Calculate total income after deductions
  const totalIncome = grossIncome + extraIncome - deductions;

  // Initialize tax amount
  let taxAmount = 0;

  // Check if total income is greater than 8 Lakhs
  if (totalIncome > 800000) {
    // Calculate taxable amount
    const taxableAmount = totalIncome - 800000;

    // Determine tax rate based on age group
    if (ageGroup === "<40") {
      taxAmount = taxableAmount * 0.3; // 30% tax rate
    } else if (ageGroup === ">=40 & <60") {
      taxAmount = taxableAmount * 0.4; // 40% tax rate
    } else if (ageGroup === ">=60") {
      taxAmount = taxableAmount * 0.1; // 10% tax rate
    }
  }

  totalAmountAfterTax = totalIncome - taxAmount

  // Display the tax amount in the dialog
  taxAmountElement.textContent = totalAmountAfterTax.toFixed(2);
}

// Validate form fields before calculating tax
function validateForm() {
  const grossIncome = document
    .querySelector("#gross-annual-income")
    .value.trim();
  const extraIncome = document.querySelector("#extra-income").value.trim();
  const deductions = document.querySelector("#total-deductions").value.trim();
  const ageGroup = document.querySelector("#age-group").value.trim();
  let isValid = true;

  // Reset warning icons
  warning.forEach((icon) => (icon.style.visibility = "hidden"));

  // Validate gross annual income
  if (isNaN(grossIncome) || grossIncome <= 0) {
    isValid = false;
    warning[0].style.visibility = "visible";
  }

  // Validate extra income
  if (isNaN(extraIncome) || extraIncome <= 0) {
    isValid = false;
    warning[1].style.visibility = "visible";
  }

  // Validate total deductions
  if (isNaN(deductions) || deductions <= 0) {
    isValid = false;
    warning[2].style.visibility = "visible";
  }

  // Validate age group
  if (ageGroup === "") {
    isValid = false;
  }

  return isValid;
}
