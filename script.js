"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKVERSE APP
console.log("Hi");

// Data
const account1 = {
  owner: "KAUSHAL PANDIT",
  movements: [
    200.5, 100.6, -100.66555, 3000.75, -50, 921.63, 13000, -600, 360, 852,
  ],
  interestRate: 2, // in %
  pin: 1235,
};

// Data
const account2 = {
  owner: "CHANDAN RAJ",
  movements: [1800, 5000, -1000, 960, 125, -2000, 636, 1280, -800, 400],
  interestRate: 1.5, // in %
  pin: 1000,
};
// Data
const account3 = {
  owner: "AMAN RAJ",
  movements: [50000, 25000, -5600, 9600, -9631, 9632, -10000, 20000, -50000],
  interestRate: 1.1, // in %
  pin: 1719,
};
const account4 = {
  owner: "RASHMI KUMARI",
  movements: [60, 65, -400, 250, 200, 900, 1000, -960, -800, 1950],
  interestRate: 1.9, // in %
  pin: 1636,
};

const accounts = [account1, account2, account3, account4];

//Label Elements
const labelWelcome = document.querySelector(".welcome1");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance_value");
const lableSumIn = document.querySelector(".summary_value_in");
const lableSumOut = document.querySelector(".summary_value_out");
const lableSumInterest = document.querySelector(".summary_value_interest");
const labelTimer = document.querySelector(".timer");
const getDate = document.querySelector(".date");
//main app element
const LoginPage = document.querySelector(".container");
const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

//Form button elements
const btnTransfer = document.querySelector(".form_btn_transfer");
const btnLoan = document.querySelector(".form_btn_loan");
const btnClose = document.querySelector(".form_btn_close");
const btnLogin = document.querySelector(".login_btn");
const reLogin = document.querySelector(".goback");
//sort button
const btnSort = document.querySelector(".btn_sort");
//inputs for sending and recieving funds
const inputTransferTo = document.querySelector(".form_input_to");
const inputTransferAmount = document.querySelector(".form_input_amount");
const inputLoanAmont = document.querySelector(".form_input_loan");
const inputCloseUsername = document.querySelector(".form_input_user");
const inputClosePin = document.querySelector(".form_input_pin");
//login user_name and pin inputs
const inputUserName = document.querySelector(".user_input");
const inputUserPin = document.querySelector(".user_pin");
const authMessage = document.querySelector(".auth");

//////////////////////////////////////////////////////////////////////
/* Main Functionalities*/
//Here sort argument is changing true or false based on which movements copy is sorted and displayed
const displayMovements = function (movementsArray, sort) {
  containerMovements.innerHTML = "";
  //slice method will actually create a copy and does not affect the actual movements array
  const movs = sort
    ? movementsArray.slice().sort((a, b) => a - b)
    : movementsArray;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const htmlEl = `
    <div class="movements_row">
          <div class="movements_type movements_${type}">${i + 1} ${type}</div>
          <div class="movements_date">3 days ago</div>
          <div class="movements_value">&#8377;${Math.abs(mov.toFixed(2))}</div>
        </div>
      `;
    containerMovements.insertAdjacentHTML("afterbegin", htmlEl);
    //we can use beforeend instead of afterbegin will reverse the order
  });
};

// displayMovements(account1.movements);

//------------------------------------------------------------
// Adding username to each objects
const user = "KAUSHAL PANDIT"; // username : kp
//.split() function returns an array
// accs is the parameter of accounts array which consists of account1,account2,account3,account4

const creatuserName = function (accs) {
  //accs is looped over each accounts object and accessing its keys and assigning a new attribute as username in each object
  accs.forEach(function (acc) {
    //Here we adding a new attribute as username in each object account1,account2,account3,account4
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

//Write a function to print total balance for all the accoutns
const calcTotalBalance = function (account) {
  //Here we are adding a new attribute in the object named balance which will update total amount value
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance.toFixed(2)}`;
};

//Defining calcDisplaySummary() function
const calcDisplaySummary = function (account) {
  //Adding funds
  const movement = account.movements;
  const incomes = movement
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => mov + acc, 0);
  lableSumIn.textContent = incomes.toFixed(2);
  //Withdrawing funds
  const out = movement
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => mov + acc, 0);
  lableSumOut.textContent = Math.abs(out.toFixed(2));
  //Showing interests on each deposits ie; 2% AND if interest on each deposits are >= 10rs
  const interest = movement
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 10;
    })
    .reduce((acc, int) => acc + int, 0);
  lableSumInterest.textContent = interest.toFixed(2);
};

//Use accounts array to include and mainpulate the objects inside it
creatuserName(accounts);

//Print accounts array and see a new username key will be updated with a username value in each object
console.log(accounts);

//Call calcTotalBalance() function to find total balance for an account
// calcTotalBalance(account1.movements);

//call calcDisplaySummary()
// calcDisplaySummary(account1);
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
//Event handlers
//Update UI which consists of Display movements array, calculate and Display Total Balance and Display Summary
const updateUI = function (account) {
  //Display movements
  displayMovements(account.movements);
  //Display Balance
  calcTotalBalance(account);

  //Display Summary
  calcDisplaySummary(account);
};
let currentAccount;
//------------------------------------------------
// Login in to page
btnLogin.addEventListener("click", function (event) {
  //preventDefault() function will prevent form from submitting
  event.preventDefault();
  // console.log("LOGGED IN");
  //Here we need to verify for newly create object that is username not owner
  currentAccount = accounts.find((acc) => acc.username === inputUserName.value);
  //This will return currentAccount object which consists of particular object
  console.log(currentAccount);
  //Here one of the error may exits if some user enters the username and pin that doesn't exist in the accounts array then
  // currentAccount will return undefined object and for accessing below pin will return error as cannot read undefined property
  //To avoid this we can use this as if (currentAccount?.pin === Number(inputUserPin.value)) which is similar to  if(currentAccount && currentAccount.pin === Number(inputUserPin.value))
  //means if currentAccount exists and with respective username and pin
  if (currentAccount?.pin === Number(inputUserPin.value)) {
    console.log("LOGIN");

    //Display UI and message
    labelWelcome.textContent = `Welcome  back ${
      currentAccount.owner.split(" ")[0]
    }`;
    //Logging in to the main app
    LoginPage.style.display = "none";
    containerApp.style.display = "grid";
    //Update UI ie; Display movements, Display balance and Display summary
    updateUI(currentAccount);
  } else {
    authMessage.style.display = "block";
    authMessage.textContent = `You are not authorised\nPlease Register your account first to login`;
  }
});
//------------------------------------------
//--------------------------------------------
//Transfer functionality
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  //it will return the object to which amount is to be transferred
  const recieverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";
  console.log(amount, recieverAcc);
  //write the condition for valid transfer amount to someone
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    //Doing the transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});
//---------------------------------------
//Loan functionality
//Here approve the loan if the user have greater than 10% of deposits in any transactions
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmont.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
    console.log("Loan Approved");
  }
  inputLoanAmont.value = "";
});
//---------------------------------------
//Close Account event
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    //Delete account
    accounts.splice(index, 1);
    //Going back to login page
    containerApp.style.display = "none";
    LoginPage.style.display = "block";
  }
  inputCloseUsername.value = inputClosePin.value = "";
});
//--------------------------------------
//Button sort eventlistener
let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  //This will change false sorted to true for toggling the sort button
  sorted = !sorted;
});
//---------------------------------------------
//Timeout
//-----------------------------------------
//Relogin --> When user clicks this button then login page will show again without losing the previous operations in the app
reLogin.addEventListener("click", function (e) {
  e.preventDefault();
  containerApp.style.display = "none";
  LoginPage.style.display = "block";
});

//--------------------------------------------------------
//All the global variable and functionalities
containerApp.style.display = "none";
//Show current date to current balance
let dt = new Date().toJSON().slice(0, 10);
getDate.textContent = dt;
//--------------------------------------------------------
console.log("/////////////////////////////////////////////////////");
console.log("/////////////////////////////////////////////////////");
//----------end of main part
//////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
//Tutorial part
//map(), filter(), split() function all returns an array of elements
const currencies = new Map([
  ["USD", "United States Dollar"],
  ["INR", "Indian Rupees"],
]);

const movements = [200, 100, -100, 3000, -50, 921, 13000, -600, 360, 852];
const usdToInr = 75;
//---------------------------------------------
// map() function
//map function used same as forEach loop
//Using map function to get the usdToInr value from an array
const movementsToINR = movements.map(function (mov) {
  return usdToInr * mov;
});

console.log(movements);
console.log(movementsToINR);

//Using arrow function
const movementsToinr = movements.map((mov) => mov * usdToInr);
console.log(movementsToinr);

const movementsToINRFor = [];
for (const mov of movements) {
  movementsToINRFor.push(usdToInr * mov);
}

console.log(movementsToINRFor);

//Create a manipulated new movements array which will show deposited or withdrew using map function
const newMovements = movements.map((mov, i) => {
  if (mov > 0) return `Movement ${i + 1} : You deposited : ${mov}<br>`;
  else return `Movement ${i + 1} : You withdrew : ${Math.abs(mov)}<br>`;
});
console.log(newMovements);
//----------------------------------------------
//--------------------------------------------
//filter() funciton
//make an array of deposits consists of only +ve values using filter() function and forof loop
const deposits = movements.filter((mov) => mov > 0);
console.log(deposits);
//Using map() function we used to just update the value not the filter
const depositsMap = movements.map((mov) => mov * 1);
console.log("Using map : " + depositsMap);
//Using forof loop
const depositsForOf = [];
for (const mov of movements) {
  if (mov > 0) depositsForOf.push(mov);
}
console.log(depositsForOf);

//make an array of withdrawals consists of only -ve values using filter() function and forof loop
const withdrawals = movements.filter((mov) => mov < 0);
console.log(withdrawals);
//------------------------------------------------
//-----------------------------------------------
// reduce() function used to boil down all the array elements into one single value
console.log(movements);
//reduce() function takes four parameters that are (acc -> accumulator like a snowball that keeps accumulating values that we want to return)
//  curr -> current element of the array
//  i ->index of the array
// arr -> array argument
//second argument of reduce function is the initial value of acc from which acc value will loop through
/*
 const balance = movements.reduce(function (acc, curr, i, arr) {
  console.log("Iteration " + i + " value " + acc);
  return acc + curr;
}, 10);
//This can be done same as
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);
*/
//Same above can be done as
const balance = movements.reduce((acc, curr) => acc + curr, 10);
console.log(balance);

//Find maximum value from movements array using reduce function
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  return mov;
}, movements[0]);

console.log("Maximum element is : " + max);
//---------------------------------------------------
//---------------------------------------------------
//Chaining --> It is a method of manipulating an array with different functionality at a time like filter(), map(), reduce() etc.
// eg :
const inrToUsd = 0.013;

//Calculating total inr values
const sumAll = movements.reduce((mov, acc) => mov + acc, 0);
console.log(
  "Total movements value in inr including deposits and withdrawals : " + sumAll
);

//Calculating total Usd Value
const mapped = movements
  .map((mov) => mov * inrToUsd)
  .reduce((mov, acc) => mov + acc, 0);
console.log(mapped);

//Calculating USD value for all the deposits only values
const totalINR = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * inrToUsd)
  .reduce((acc, mov) => mov + acc, 0);
console.log(totalINR);

//---------------------------------------------------
//---------------------------------------------------
//find() method loops over an array and retrieves the element
//Find 1st withdrawal
const firstWithdrawal = movements.find((mov) => mov < 0);
console.log(firstWithdrawal);
//Finding the object with certain name
console.log(accounts);
//This concept will helpful in logging in to the website
const account = accounts.find((acc) => acc.owner == "KAUSHAL PANDIT");
console.log(account);

//--------------------------------------------------------------------
//some() and any() function
console.log(movements);
//We can check if any element is present in array or not by .includes() function. It returns true or false
//includes() checks for equality
console.log(movements.includes(200));
//.some() checks for condition
console.log(movements.some((mov) => mov === -120));

//.some can be used for multiple conditions
const anyDeposits = movements.some((mov) => mov > 1500);
console.log(anyDeposits);
//----------------
//For equality use includes method
//For conditions use .some method
//Every method --> If all the elements satisfies the condition then returns true
console.log(movements.every((mov) => mov > 0));

//-------------------------------------------------------------------
//Flat and flatMap() method
const arr = [[1, 2, 3, 4, 5], [4, 5, 6, 7, 8], 8, 6, 9];
console.log("Flattened array is " + arr.flat());

const arrDeep = [
  [[1, 6, 6, 3], 5],
  [5, 3, 6, 9],
];
//Here arg 2 means it goes inside two levels and flattens
console.log(arrDeep.flat(2));
//If we want to calculate total amount from all the users account1,acount2 .......
//then we can use flat() method like
//Store all the 4 arrays in new accountMovements array
const accountMovements = accounts.map((acc) => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);

const totalFunds = allMovements.reduce((acc, mov) => mov + acc, 0);
console.log("Total funds in this app = " + totalFunds.toFixed(3));

//Above same thing can be done from chaining
const overAllBal = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log("Overall Balance using chaining shows : " + overAllBal.toFixed(3));
//Flat map was introduced to join flat and map together
const overAllBal1 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log("Using FlatMap method()  : " + overAllBal1);

//--------------------------------------------------------------------
//Sorting in array
//Sorting performed in javascript based on string
console.log(movements);
//Here we will get wrong result because of sorting is done based on string
console.log(movements.sort());
//To sort correctly in ascending order we need to write in the function
//This will sort all the elements inside in ascending order
movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
console.log("Ascending order" + movements);
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});
console.log("Descending order" + movements);
//One liner function to sort

movements.sort((a, b) => a - b);
console.log("SOrted in one line " + movements);
//-------------------------------------------
//Generate arrays programticaly
const x = new Array(7);
console.log(x);
//We can't use map method in array directly
// x.fill(1);
// console.log(x);
//fill the array elements after 3
// x.fill(1, 3);
// console.log(x);
//Fill 1 from index 3 to (5-1) = 4
// x.fill(1, 3, 5);
// console.log(x);
//We can also fill the array element at an index
// x.fill(12, 5);
// console.log(x);
const y = Array.from({ length: 7 }, () => 1);
console.log("Y is " + y);
//Fill array elements sequentially
const z = Array.from({ length: 10 }, (_, i) => i + 1);
console.log(z);
//--------------------
//We can read data from the html elements preserved
//Like in movements html array we are going to store in a movementsUi and print in the console
labelBalance.addEventListener("click", function () {
  const movementsUI = Array.from(
    document.querySelector(".movements_value", (el) =>
      Number(el.textContent.replace("", " "))
    )
  );
  console.log(movementsUI);
  const movementsUI2 = [...document.querySelectorAll(".movements_value")];
  console.log(movementsUI2);
});
//---------------------
