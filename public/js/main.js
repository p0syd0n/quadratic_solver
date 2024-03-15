const perfectSquares = [
  4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400,
  441, 484, 529, 576, 625, 676, 729, 784, 841, 900, 961, 1024, 1089, 1156, 1225, 1296, 1369, 1444, 1521, 1600,
  1681, 1764, 1849, 1936, 2025, 2116, 2209, 2304, 2401, 2500, 2601, 2704, 2809, 2916, 3025, 3136, 3249, 3364, 3481, 3600,
  3721, 3844, 3969, 4096, 4225, 4356, 4489, 4624, 4761, 4900, 5041, 5184, 5329, 5476, 5625, 5776, 5929, 6084, 6241, 6400,
  6561, 6724, 6889, 7056, 7225, 7396, 7569, 7744, 7921, 8100, 8281, 8464, 8649, 8836, 9025, 9216, 9409, 9604, 9801, 10000
]

perfectSquares.reverse()
var devMode = false;

var nativeAlert = window.alert;
// Override the alert function
window.alert = function(msg) {
  // Console logging
  console.log(msg);
 
  // alerting if dev mode is on
  if (devMode) {
    nativeAlert(msg);
  }
 };

document.getElementById('input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.code === 'Enter' || e.keyCode === 13) {
     e.preventDefault(); // Prevent the default form submission
     go(); // Call the go function
  }
 });
 
 document.addEventListener('keydown', function(e) {
  if (e.key === 'k' || e.code === 'k' || e.keyCode === 75) {
      e.preventDefault(); // Prevent the default form submission
      devMode = !devMode;
      if (devMode) {
       document.body.style.backgroundColor = "beige"; // Corrected line
      }
  }
 });
 

function findCommonAndSort(list1, list2, list3) {
  // Phind ai code haha
  let common = [];
  let i = 0, j = 0, k = 0;

  while (i < list1.length && j < list2.length && k < list3.length) {
      if (list1[i] === list2[j] && list2[j] === list3[k]) {
          common.push(list1[i]);
          i++;
          j++;
          k++;
      } else if (list1[i] < list2[j]) {
          i++;
      } else if (list2[j] < list3[k]) {
          j++;
      } else {
          k++;
      }
  }

  // Sort the common elements in descending order
  common.sort((a, b) => b - a);

  return common;
}

function factor(number) {
  var factors = [];
  const og = number;
  number = Math.abs(number);
  for (let i = 1; i <= number; i++) {
     if (number % i === 0) {
       factors.push(i);
     }
  }
  alert(`factors of ${og}: ${factors}`);
  return factors;
 }
 

function go() {
  alert('GOING')
  const inputElement = document.getElementById('input');
  const input = inputElement.value
  const results = document.getElementById('results');
  const splitInput = input.split(' ');
  
  const a = splitInput[0];
  const b = splitInput[1];
  const c = splitInput[2];
  alert(`${a} ${b} ${c}`)
  const response = solve(a, b, c);
  alert(response)
  results.innerHTML = response;
  inputElement.select()
}

function solve(a, b, c) {
  let discriminantIsNegative = false;
  let discriminant = (b**2 - 4*a*c);
  let denominator = 2*a
  var beforeSquareRoot = 1
  let negativeB = (-b)
  if (discriminant < 0) {
    discriminant *= -1;
    discriminantIsNegative = true;
  }

  for (let square of perfectSquares) {
    if (discriminant % square == 0) {
      alert(`The discriminant of ${discriminant} is divisible by the sqaure ${square}`)
      beforeSquareRoot *= Math.sqrt(square);
      discriminant /= square;
    }
  }

  alert(` before square root: ${beforeSquareRoot}`)



  if (beforeSquareRoot != 1) {
    const negativeBFactors = factor(negativeB);

    const beforeSquareRootFactors = factor(beforeSquareRoot);
    const denominatorFactors = factor(denominator);
    const factorsOfAll = findCommonAndSort(negativeBFactors, beforeSquareRootFactors, denominatorFactors);
    negativeB /= factorsOfAll[0];
    alert(`NEGATIVE B IS NOW ${negativeB}`)
    beforeSquareRoot /= factorsOfAll[0];
    denominator /= factorsOfAll[0];
  }

  alert(`AFTER SIMPLIFYING: BEFORE SQUARE ROOT IS ${beforeSquareRoot}`)
  if (beforeSquareRoot == 1) {
    beforeSquareRoot = '';
  }

  if (discriminantIsNegative) {
    alert(`negative discriminant, but before discriminant is ${beforeSquareRoot}`)
    const html = `
    <div class="fraction-container">
    <span class="numerator">${negativeB}&#177; ${beforeSquareRoot}<i>i<i/><math><msqrt><mn>${discriminant}</mn></msqrt></math></span>
    <span class="denominator">${denominator}</span>
   </div>
  
  
   <style>
    .fraction-container {
   display: inline-block;
   position: relative;
   text-align: center;
  }
  
  .numerator, .denominator {
   display: block;
   padding: 0 5px; /* Adjust padding as needed */
  }
  
  .fraction-container::before {
   content: "";
   position: absolute;
   top: 50%; /* Adjust position as needed */
   left: 0;
   width: 100%;
   border-top: 2px solid black; /* Adjust border style as needed */
  }
  </style>    
    
    
    `
    return html;
  }



  numeratorPositive = (-b + (beforeSquareRoot)*Math.sqrt(discriminant));
  numeratorNegative = (-b - (beforeSquareRoot)*Math.sqrt(discriminant));
  
  const numbers = `${numeratorPositive/denominator} <br> ${numeratorNegative/denominator}`
  const fraction = `
  
  <div class="fraction-container">
  <span class="numerator">${negativeB}&#177; ${beforeSquareRoot}<math><msqrt><mn>${discriminant}</mn></msqrt></math></span>
  <span class="denominator">${denominator}</span>
 </div>


 <style>
  .fraction-container {
 display: inline-block;
 position: relative;
 text-align: center;
}

.numerator, .denominator {
 display: block;
 padding: 0 5px; /* Adjust padding as needed */
}

.fraction-container::before {
 content: "";
 position: absolute;
 top: 50%; /* Adjust position as needed */
 left: 0;
 width: 100%;
 border-top: 2px solid black; /* Adjust border style as needed */
}
</style>    
  `

  return (`<strong>${numbers}</strong> <br> ${fraction}`);
}