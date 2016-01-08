/* global document */

var CE = document.getElementById("bCE");
var AC = document.getElementById("bAC");
var result = document.getElementById("b=");
var quote = document.getElementById("b.");

var calculator = {
    total: null,
    out: "",
    calculationId: 0,
    resultRender: false,

    populateDisplayWithHtml : function (out) {
        var element = document.getElementById("output");
        element.innerHTML = out;
    },

    renderDigitsButtons : function (upperBound) {
       for(var i=0; i<upperBound;i++){
           this.buttonDigitsHandler("b"+i, i);
       }
    },

    buttonDigitsHandler : function (id, digit) {
        var button = document.getElementById(id);
        button.onclick = function() {
            calculator.display(digit);
        };
    },

    display : function (input) {
        if (calculator.out === "0") { calculator.out = "";}
        if (calculator.resultRender) {
            calculator.out = "";
            calculator.resultRender = false;
        }
        calculator.out += input;
        calculator.populateDisplayWithHtml(calculator.out);
    },

    renderCalculationButtons : function (upperBound) {
       for(var i=1; i<=upperBound;i++){
           this.buttonCalculationHandler("c"+i, i);
       }
    },

    buttonCalculationHandler : function (id, calculationId) {
        var button = document.getElementById(id);
        button.onclick = function() {
            if (calculator.calculationId !== 0 && calculator.out === "") {
                calculator.calculationId = calculationId;
                return false;
            }
            calculator.compute();
            calculator.calculationId = calculationId;
        };
    },

    compute : function () {

        var parsedOut = parseFloat(calculator.out);
        switch (calculator.calculationId) {
            case 0:
                calculator.total = parsedOut;
                calculator.out = "";
                break;
            case 1:
                calculator.total += parsedOut;
                calculator.out = "";
                break;
            case 2:
                calculator.total -= parsedOut;
                calculator.out = "";
                break;
            case 3:
                calculator.total = calculator.total * parsedOut;
                calculator.out = "";
                break;
            case 4:
                calculator.total = Math.pow(calculator.total, parsedOut);
                calculator.out = "";
                break;
            case 5:
                calculator.total = calculator.total / parsedOut;
                calculator.out = "";
                break;
            case 6:
                calculator.total = calculator.total % parsedOut;
                calculator.out = "";
                break;
        }
        calculator.total = Math.round(calculator.total*1000000000000)/1000000000000;
        calculator.populateDisplayWithHtml(calculator.total);
    }


};

calculator.renderDigitsButtons(10);
calculator.renderCalculationButtons(6);


result.onclick = function () {
    if(calculator.out === "") {return false;}
    calculator.compute();
    calculator.out = calculator.total.toString();
    calculator.total = null;
    calculator.calculationId = 0;
    calculator.resultRender = true;
};

quote.onclick = function () {
    if(calculator.out.indexOf(".") === -1) {
        calculator.display(".");
    }
};

CE.onclick = function () {
    calculator.out = "";
    calculator.display("");
};

AC.onclick = function () {
    CE.onclick();
    calculator.total = null;
    calculator.calculationId = 0;
};





