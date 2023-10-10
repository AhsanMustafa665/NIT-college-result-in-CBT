// Data load
let results = [];
const loadingResult = () => {
  fetch("./result.json")
    .then((res) => res.json())
    .then((data) => {
      results = data;
    });
};
loadingResult();

const rollInput = document.getElementById("rollInput");
const resultOutput = document.getElementById("result-output");
const compareOutput = document.getElementById("compare-output");
const gpaOutput = document.getElementById("gpa-output");
const std1Input = document.getElementById("std1-input");
const std2Input = document.getElementById("std2-input");
const maxInput = document.getElementById("max-input");
const minInput = document.getElementById("min-input");
const totalStd = document.getElementById("total-std");

// Get Result
document.getElementById("submit-btn").addEventListener("click", function () {
  const convertRoll = Number(rollInput.value);
  // console.log(convertRoll);
  if (rollInput.value === "") {
    resultOutput.innerHTML = `<h5 class="text-danger">Please Enter a Roll Number</h5>`;
  } else {
    resultOutput.innerHTML = `<h5 class="text-danger">Please Enter a Valid Roll Number</h5>`;
  }
  const findResult = results.find((result) => result.roll === convertRoll);
  // console.log(singleResult);
  resultOutput.innerHTML = `
  <h5>Roll: ${findResult.roll}</h5>
  <h5>GPA: ${findResult.gpa}</h5>
  `;
  rollInput.value = "";
});

// Compare result between two students
document.getElementById("compare-btn").addEventListener("click", function () {
  const std1ConvertNum = Number(std1Input.value);
  const std2ConvertNum = Number(std2Input.value);

  for (let result of results) {
    if (result.roll !== std1ConvertNum || result.roll !== std2ConvertNum) {
      compareOutput.innerHTML = `
      <h5 class="text-danger">Enter the roll number of two students correctly</h5>`;
    }
    if (std1Input.value === "" || std2Input.value === "") {
      compareOutput.innerHTML = `
      <h5 class="text-danger">Enter the roll number in the input box of two students</h5>
      `;
    }
  }
  const findResult1 = results.find((result) => result.roll === std1ConvertNum);
  const findResult2 = results.find((result) => result.roll === std2ConvertNum);
  const std1Result = parseFloat(findResult1.gpa);
  const std2Result = parseFloat(findResult2.gpa);
  if ((std1Result > 4 || std1Input < 0) && (std2Result > 4 || std2Input < 0)) {
    compareOutput.innerHTML = `
    <h5 class="text-danger">Two students failed the exam</h5>
    `;
  } else if (std1Result > 4 || std1Result < 0) {
    compareOutput.innerHTML = `
    <h5 class="text-danger">${std1Input} failed the exam but ${std2Input} got ${std2Result} </h5>
    `;
  } else if (std2Result > 4 || std2Result < 0) {
    compareOutput.innerHTML = `
    <h5 class="text-danger">${std2Input} failed the exam but ${std1Input} got ${std1Result} </h5>
    `;
  } else if (std1Result > std2Result) {
    compareOutput.innerHTML = `<h5><span class="text">${std1ConvertNum}</span>(${std1Result}) done  ${
      (25 * std1Result).toFixed(2) - (25 * std2Result).toFixed(2)
    }%   beter result than <span class="text">${std2ConvertNum}</span>(${std2Result})</h5>`;
  } else if (std1Result < std2Result) {
    compareOutput.innerHTML = `<h5><span class="text">${std2ConvertNum}</span>(${std2Result}) done  ${
      (25 * std2Result).toFixed(2) - (25 * std1Result).toFixed(2)
    }%   beter result than <span class="text">${std1ConvertNum}</span>(${std1Result})</h5>`;
  } else if (std1Result == std2Result) {
    compareOutput.innerHTML = `<h5><span class="text">${std2ConvertNum}</span>(${std2Result}) and <span class="text">${std2ConvertNum}</span>(${std1Result}) both have same GPA</h5>`;
  }
  std1Input.value = "";
  std2Input.value = "";
});

// Max and Min result
document.getElementById("details-btn").addEventListener("click", function () {
  const min = parseFloat(maxInput.value);
  const max = parseFloat(minInput.value);
  if (maxInput.value === "" || minInput.value === "") {
    gpaOutput.innerHTML = `
      <h5 class="text-danger">Please Enter the Min and Max GPA value</h5>
      `;
  } else {
    let change = 0;
    for (const result of results) {
      if (parseFloat(result.gpa) >= min && parseFloat(result.gpa) <= max) {
        change++;
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `<p>Roll No: ${result.roll} & GPA: ${result.gpa}</p>`;
        gpaOutput.appendChild(div); /* console.log(result.roll + result.gpa) */
      }
      maxInput.value = "";
      minInput.value = "";
      totalStd.innerHTML = ` <h5 class="text-success">Total Students are: ${change}</h5>`;
    }
  }
});
