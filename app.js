// Budget Controller
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;
            //create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            //Create new item
            if (type === 'exp') {
                newItem = new Expense(IDBCursor, des, val);
            }
            else if (type === 'inc') {
                newItem = new Income(IDBCursor, des, val);

            }

            data.allItems[type].push(newItem);
            return newItem;
        },

        testing: function () {
            console.log(data);
        }
    };



})();

// UI Controller
var UIController = (function () {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        btnAdd: '.add__btn'
    }
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value, //inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            }

        },

        getDOMStrings: function () {
            return DOMStrings;
        }

    };

})();

// Global App Controller
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.btnAdd).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };


    var ctrlAddItem = function () {
        var input, newItem;
        //1. Get input date
        input = UICtrl.getInput();

        //2. Add the item to budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        //3. Add the item to UI
        //4. Calculate the budget
        //5. Display the budget on the UI 

    }

    return {
        init: function () {
            console.log('Application has been started...');
            setupEventListeners();
        }
    };



})(budgetController, UIController);

controller.init();

