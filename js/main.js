var $calculator;
var $buttons;
var $display;
var currentValue = 0;
var currentOperator = "";
var currentInput = "";
var lastInput ="";
var operators = [ "+", "-", "*", "/"];
var lastPress = "";
var hasOperated = false;
var hasInput = false;
var hasCalculated = false;

$ (document).ready(function() {
 	$calculator = $(".calculator");
 	$buttons = $(".button");
 	$display = $(".display");
 	
 	$calculator.on("click", ".button", onButtonClick);

 	reset();

 });
 	
 	function onButtonClick (event) {
 		var $target  = $(event.target);
 		var buttonValue = $target.text().toLowerCase();
 		var buttonCharCode = buttonValue.charCodeAt(0);
 		
 		if (buttonCharCode === 247) {
 		buttonValue = "/";
 		}  
 		if (buttonCharCode === 215) {
 		buttonValue = "*";
 		}  
 		
 		if (buttonValue === "c") {
 			reset();

 		}else if (buttonValue === "=") {
 			calculateValue();

 		} else if (operators.indexOf(buttonValue) > -1) {
 			setOperator(buttonValue);
 		} else {
 			appendInput(buttonValue);
		}
 		
 	}

 	function reset() {
 		currentValue  = 0;
 		currentOperator ="";
 		currentInput ="";
 		lastInput ="";

 		lastPress = "";
 		hasOperated = false;
 		hasInput = false;
 		hasCalculated = false;

 
 		updateDisplay(currentValue);
 	}

 	function appendInput(input) {

 		if (input === "." && currentInput.indexOf(".") > -1) {
 			return;
 		}
 
 		if (lastPress === "operator") {
 			currentInput = input;

 		}else {
 			currentInput += input;

 		}

 		if(currentInput.length > 1 && currentInput.slice(0,1) === "0" && currentInput.slice(1,1)  !== ".") {
 			currentInput = currentInput.slice(1, currentInput.length);

 		}

 		if(currentInput.slice(0,1) === ".") {
 				currentInput = "0" + currentInput;

 		}
  
 			lastPress = "digit";
 			hasInput = true;
 			hasCalculated =false;

 		
 		
 		updateDisplay(currentInput);
 	}

 	function setOperator(operator){
 		if (hasOperated && lastPress!== "operator") {
 			calculateValue();
		}

 		currentOperator = operator;
 		currentValue = parseFloat(currentInput);

 		if (isNaN(currentValue)) {
 			currentValue = 0;
 		}


 		lastPress = "operator";
 		hasOperated = true;
 		hasInput = false;
 		hasCalculated =false;
 
 	}

 	function calculateValue(){
 		var input;

 		if (hasCalculated) {
 			input = parseFloat(lastInput);
 		}else{
 			input = parseFloat(currentInput);
 			lastInput = input;
 		}



 		var input = parseFloat(currentInput);

 		lastInput = input;

 		switch (currentOperator) {
 			case "+":
 				currentValue += input;
 				break;
 			case "-":
 				currentValue -= input;
 				break;
 			case "*":
 				currentValue *= input;
 				break;
 			case "/":
 				currentValue /= input;
 				break;
 			default:
 				break;
 		}

 		lastPress = "operator";
 		hasInput = false;
 		hasCalculated = true;


 		updateDisplay (currentValue);
 		currentInput = currentValue.toString();
 	}

 	function updateDisplay(value) {
 		$display.val(value);
 	}
 	