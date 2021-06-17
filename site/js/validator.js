// Cách 1:
// Đối tương Validator
function Validator(options) {
    
    function getParent(element, selector){
        while (element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    var selectorRules = {};
    // Hàm thực hiên Validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;
        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];
        // Lặp qua từng rule & và kiểm tra
        // Nếu có lỗi thì dừng việc kiểm tra 
        for (var i = 0; i < rules.length; ++i) {
            switch(inputElement.type){
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'));
                    break;
                default: errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid')
        }
        else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }
        return !errorMessage

    }
    // Lấy Element của form cần Validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // Khi submit form
        formElement.onsubmit = function (e){
            e.preventDefault();

            var isFormValid = true;
            // Lặp qua từng rules và validate luôn
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector); 
                var isValid = validate(inputElement,rule);
                if(!isValid){
                    isFormValid = false
                }

            });
            
            if(isFormValid){
                // Submit với Javascript
               if(typeof options.onSubmit === 'function' ){
                var  enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                var  formValues    = Array.from(enableInputs).reduce(function(values,input){

                    switch(input.type){
                        case 'radio':
                            values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                        break;
                        case 'checkbox': 
                            if(!input.matches(':checked')){
                                values[input.name] ='';
                                return values;
                            } 
                            if(!Array.isArray(values[input.name])) {
                                values[input.name]=[];
                            }
                            values[input.name].push(input.value);
                        break;
                        case 'file':
                            values[input.name] = input.files;

                        break;
                        default:
                            values[input.name] = input.value;
                    }
                    return values;
    
                },{});
                   options.onSubmit(formValues)
               }
                // Submit với hành vi mặc định
                else{
                    formElement.submit();
                }
            }
        }
        // Xử lý lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input,.....)
        options.rules.forEach(function (rule) {

            //Lưu lại các rules cho mỗi input
            //Khi chưa gán vào nó là undefined do selectorRules là object rỗng
            // console.log(selectorRules [rule.selector]);
            // Khi nó là undefined mình sẽ gán nó là cái mảng
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);

            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            // selectorRules [rule.selector] = rule.test;
            var inputElements = formElement.querySelectorAll(rule.selector);
            
            Array.from(inputElements).forEach(function(inputElement){
                inputElement.onblur = function () {
                    // value: inputElement.value
                    // test func: rules.test    
                    validate(inputElement, rule);
                }
                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    // đang gõ sẽ xóa bỏ đi invalid
                    var errorMessage = rule.test(inputElement.value);
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');

                }
            })
        })
    }
}
// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra messae lỗi
// 2. Khi không có lỗi => Không trả(undefined)
Validator.isRequired2 = function (selector, message) {
    // dùng cho checkbox, radio, file
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'Vui lòng nhập trường này'
            r
        }
    }
}
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
            r
        }
    }
}
Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    }
}
Validator.maxLength = function (selector, max, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length <= max ? undefined : message || `Vui lòng nhập tối đa ${max} kí tự`;
        }
    }
}
Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác'

        }
    }

}
Validator.isPhone = function (selector,message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /(\+84|0)+(3[2-9]|5[6|8|9]|9\d(?!5)|8[1-9]|7[0|6-9])+([0-9]{7})\b/g;
            return regex.test(value) ? undefined : message || 'Trường này không phải là phone';

        }
    }

}
Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email';

        }
    }

}



// Cách 2:

// function Validator(formSelector){
//     // không gán sẽ lấy nhầm cái form POST
//     // this chính là form
//     var _this = this;
//     var formRules = {};

//     //  đi lấy form-group
//     function getParent(element,selector){
        
        // while(element.parentElement){
//             if(element.parentElement.matches(selector)){
//                 return element.parentElement;
//             }else{
//                 element=element.parentElement;
//             }
//         }
//     }
//     var validatorRules = {
//         /**
//          * Quy ước tạo rule:
//          * -Nếu có lỗi thì return lại cái `errorMessage`
//          * -Nếu không có lỗi thì return `undefined`
//          */
        
//         required: function(value){
//             return value.trim() ? undefined : 'Vui lòng nhập trường này';
//         },
//         required2: function(value){
//             return value ? undefined : 'Vui lòng nhập trường này'
//         },
//         isEmail: function(value){
//             var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//             return regex.test(value) ? undefined : 'Email không đúng định dạng';
//         },
//         // mong muốn số 6 truyền vào min
//         min: function(min){
//             return function(value){
//                 return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} ký tự`;
//             }
//         },
//         max: function(max){
//             return function(value){
//                 return value.length <= max ? undefined : `Vui lòng nhập tối đa ${max} ký tự`;
//             }
//         },
//         isConfirmed: function getConfirmValue(value){
//             var text = document.querySelector('#form-1 #password').value;
//             return value === text ?  undefined : 'Giá trị nhập vào không chính xác';

//         },
//         isPhone: function(value){
//             var regex = /(\+84|0)+(3[2-9]|5[6|8|9]|9\d(?!5)|8[1-9]|7[0|6-9])+([0-9]{7})\b/g;
//             return regex.test(value) ? undefined : 'Số điện thoại không đúng'
//         }
       

//     };
//     // đi lấy form element trong DOM theo `formSelector`
// var formElement = document.querySelector(formSelector);

// // KT Xử lý khi có element trong DOM
// if(formElement){
//     // đi lấy tất cả các input có Attribute là name và rules nằm trong form
//    var inputs = formElement.querySelectorAll('[name][rules]');

//    for(var input of inputs){
//     // dùng split tách dấu '|' đưa từ string về mảng 
//     var  rules = input.getAttribute('rules').split('|');
//     // nhận đc mảng r
//     for(var rule of rules){

//         var isRuleHasValue = rule.includes(':');
//         var ruleInfo;

//         if(isRuleHasValue){
//             ruleInfo = rule.split(':')
//             // console.log(ruleInfo);
//             // tách chữ min từ pt thứ 1
//             rule = ruleInfo[0];
//             // nếu nó là array sẽ push thêm rule vào đây
//             // mới đầu nó không là mảng , nên nó vô giá trị else
//             // console.log(validatorRules[rule](ruleInfo[1]));
//         }
//         var ruleFunc = validatorRules[rule];

//         if(isRuleHasValue){
//             ruleFunc = ruleFunc(ruleInfo[1])
//         }

//         if(Array.isArray(formRules[input.name])){
//             formRules[input.name].push(ruleFunc)
              

//         }else{
//             formRules[input.name] = [ruleFunc];
//         }
//     }
//     // Lắng nghe sự kiện để validate(blur,change,...)
//     input.onblur = handleValidate;
//     input.oninput= handleClearError;

//    }
//     // Hàm thực hiện validate
//    function handleValidate(event){
//        var rules = formRules[event.target.name];
//     //  rule chính à required, email , min ,max 
//        var errorMessage;  
//        for (var rule of rules){
//         errorMessage = rule(event.target.value);
//         if(errorMessage) break;
//        }
      
//     //    Nếu có lỗi thì hiển thị message lỗi
//        if(errorMessage){
//         var formGroup = getParent(event.target,'.form-group');
//         if(formGroup){
//             formGroup.classList.add('invalid');
//             var formMessage = formGroup.querySelector('.form-message')
//             if(formMessage){
//                 formMessage.innerText = errorMessage;
//             }
//         }

//        }
//        return !errorMessage;
//        console.log(formMessage)

//    }
// //    Hàm clear message lỗi
//    function handleClearError(event){
//     var formGroup = getParent(event.target,'.form-group');
//     if(formGroup.classList.contains('invalid')){
//         formGroup.classList.remove('invalid');
//         var formMessage = formGroup.querySelector('.form-message')
//             if(formMessage){
//                 formMessage.innerText = '';
//             }
//         }
//     }
//     // console.log(formRules);
// }
// // Xử lý hành vi submit form 
// formElement.onsubmit = function(event){
//     event.preventDefault();
//     var inputs = formElement.querySelectorAll('[name][rules]');
//     var isValid = true;

//    for(var input of inputs){
//        if(!handleValidate({target: input})){
//            isValid = false;
//        }
//    };
   
// //  Khi không có lỗi thì submit form 
//        if(isValid){
//             // Submit với Javascript
//            if(typeof _this.onSubmit === 'function' ){
//             var  enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
//             var  formValues    = Array.from(enableInputs).reduce(function(values,input){

//                 switch(input.type){
//                     case 'radio':
//                         values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
//                     break;
//                     case 'checkbox': 
//                         if(!input.matches(':checked')){
//                             values[input.name] ='';
//                             return values;
//                         } 
//                         if(!Array.isArray(values[input.name])) {
//                             values[input.name]=[];
//                         }
//                         values[input.name].push(input.value);
//                     break;
//                     case 'file':
//                         values[input.name] = input.files;

//                     break;
//                     default:
//                         values[input.name] = input.value;
//                 }
//                 return values;

//             },{});
//                _this.onSubmit(formValues)
//            }
//         }
//        } 
//    }  

















































































































































