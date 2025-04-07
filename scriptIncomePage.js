document.getElementById("incomePage").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission
    validateForm();
    makeRequest();
});

// Validate Source Name
function validateSourceName(name) {
    if (!name) {
        return "Source name is required.";
    }
    if (name.length < 3) {
        return "Source name must be at least 3 characters long.";
    }
    return "";
}

// Validate Amount
function validateAmount(amountInput) {
    let amount = parseFloat(amountInput.value.trim());

    if (!amount || amount <= 0) {
        return "Amount must be a number greater than 0.";
    }

    // Round amount to 2 decimal places and update input field
    amountInput.value = amount.toFixed(2);
    return "";
}

// Validate Frequency
function validateFrequency(freq) {
    const validOptions = ["one-time", "monthly", "bi-weekly", "yearly"];
    if (!validOptions.includes(freq)) {
        return "Please select a valid frequency.";
    }
    return "";
}

// Main Form Validation Function
function validateForm() {
    const sourceInput = document.getElementById("incomeSourceName");
    const amountInput = document.getElementById("amount");
    const frequencyInput = document.getElementById("frequency");

    const sourceError = document.getElementById("incomeSourceNameError");
    const amountError = document.getElementById("amountError");
    const frequencyError = document.getElementById("frequencyError");

    // Clear previous error messages
    sourceError.textContent = "";
    amountError.textContent = "";
    frequencyError.textContent = "";

    let isValid = true;

    // Validate each field
    const sourceValidationMessage = validateSourceName(sourceInput.value.trim());
    const amountValidationMessage = validateAmount(amountInput);
    const frequencyValidationMessage = validateFrequency(frequencyInput.value);

    if (sourceValidationMessage) {
        sourceError.textContent = sourceValidationMessage;
        isValid = false;
    }

    if (amountValidationMessage) {
        amountError.textContent = amountValidationMessage;
        isValid = false;
    }

    if (frequencyValidationMessage) {
        frequencyError.textContent = frequencyValidationMessage;
        isValid = false;
    }

    if (isValid) {
        console.log("Form is valid! Submitting...");
        document.getElementById("incomePage").submit();
    }
}

function makeRequest() {
    const sourceInput = document.getElementById("incomeSourceName");
    const amountInput = document.getElementById("amount");
    const frequencyInput = document.getElementById("frequency");
    
    let url = "https://webhook-test.com/26750d93166c4646856ea4969f6d3c9b";
    let data = new FormData();
    data.append("sourceInput", sourceInput.value); // repeat for as many params as necessary
    data.append("amountInput", amountInput.value);
    data.append("frequencyInput", frequencyInput.value);

    fetch(url, {method: "POST", body: data})
    .then(statusCheck)
    .then(resp => resp.json()) // or res.text() based on response
    .then(handleResponse)
    .catch(handleError);


}


