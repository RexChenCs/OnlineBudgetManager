"use strict";


//index - register and login system validation
function RegistrationFormValidation() {
    var email = document.getElementById("register_email");
    var pass = document.getElementById("register_password");
    var cmpass = document.getElementById("register_cmpassword");
    document.getElementById('error-bar').style.display="none";
    document.getElementById('success-bar').style.display="none";


    if(validateEmail(email)){
        if(validatePass(pass)) {
            if (matchpass(pass, cmpass)) {
                document.getElementById('error-bar').style.display="none";
                register();
                return true;
            }
        }
    }

    return false;

}


function username_validation(username,mx,my)
{
    var username_len = username.value.length;
    if (username_len == 0 || username_len >= my || username_len < mx)
    {
        var message = "Input should not be empty / length be between "+mx+" to "+my;

        username.focus();
        return false;
    }
    return true;
}



function validateEmail(email)
{
    var email_len = email.value.length;
    if(email_len == 0)
    {
        var message= "Email address can not be empty!";
        document.getElementById('register-error').innerHTML="<Strong>Error: <Strong>" + message;
        document.getElementById('error-bar').style.display="block";
        email.focus();
        return false;
    }
    return true;

}

function validatePass(pwd){
    var re;
    var message;
    if(pwd.value.length < 6) {
        message = "Password must contain at least 6 characters!";
        document.getElementById('register-error').innerHTML="<Strong>Error: <Strong>" + message;
        document.getElementById('error-bar').style.display="block";
        pwd.focus();
        return false;
    }

    if(pwd.value.length > 24) {
        message = "Password must contain at most 24 characters!";
        document.getElementById('register-error').innerHTML="<Strong>Error: <Strong>" + message;
        document.getElementById('error-bar').style.display="block";
        pwd.focus();
        return false;
    }

    re = /[0-9]/;
    if(!re.test(pwd.value)) {
        message = "Password must contain at least one number (0-9)!";
        document.getElementById('register-error').innerHTML="<Strong>Error: <Strong>" + message;
        document.getElementById('error-bar').style.display="block";
        pwd.focus();
        return false;
    }

    re = /[a-z]/;
    if(!re.test(pwd.value)) {
        message="Password must contain at least one lowercase letter (a-z)!";
        document.getElementById('register-error').innerHTML="<Strong>Error: <Strong>" + message;
        document.getElementById('error-bar').style.display="block";
        pwd.focus();
        return false;
    }

    re = /[A-Z]/;
    if(!re.test(pwd.value)) {
        message="Password must contain at least one uppercase letter (A-Z)!";
        document.getElementById('register-error').innerHTML="<Strong>Error: <Strong>" + message;
        document.getElementById('error-bar').style.display="block";
        pwd.focus();
        return false;
    }
    return true;
}

function matchpass(pass1,pass2){

    if(pass1.value==pass2.value){
        return true;
    }
    else{
        var message = "Password does not match!";
        document.getElementById('register-error').innerHTML="<Strong>Error: <Strong>" + message;
        document.getElementById('error-bar').style.display="block";
        return false;
    }
}



function alphanumeric(name,message)
{
    var letters = /^[0-9a-zA-Z]+$/;
    if(name.value.match(letters))
    {
        return true;
    }
    else
    {
        swal("Important !", message, "warning");
        name.focus();
        return false;
    }
}


//customer - page validation
function Income_Type_validation()
{
    var sourcetype = document.getElementById('source_type');
    var sourcetype_value = sourcetype.value.trim();
    var type_len = sourcetype_value.length;

    var typedescription = document.getElementById('type_description');
    var typedescription_value = typedescription.value.trim();
    var description_len = typedescription_value.length;

    if (type_len == 0)
    {
        swal("Warning !", "Source Type can not be empty", "warning");
        sourcetype.focus();
        return false;

    }else if(description_len == 0)
    {
        swal("Warning !", "Source Type Description can not be empty", "warning");
        typedescription.focus();
        return false;

    }else
    {
        writeIncomeType();
    }

    return true;
}


function Income_source_validation()
{
    var income_name = document.getElementById('income_source_name');
    var income_name_value = income_name.value.trim();
    var income_name_len = income_name_value.length;

    var income_amount = document.getElementById('income_amount');
    var income_amount_value = income_amount.value.trim();
    var income_amount_len = income_amount_value.length;

    var income_source_type = document.getElementById('income_source_type');
    var income_source_type_value = income_source_type.value.trim();
    var income_source_type_len = income_source_type_value.length;

    var income_source_description = document.getElementById('income_source_description');
    var income_source_description_value = income_source_description.value.trim();
    var income_source_description_len = income_source_description_value.length;


    if (income_name_len == 0)
    {
        swal("Warning !", "Income source name can not be empty", "warning");
        income_name.focus();
        return false;

    }else if(income_amount_len == 0)
    {
        swal("Warning !", "Income amount is invalid", "warning");
        income_amount.focus();
        return false;

    }else if(income_source_type_len == 0)
    {
        swal("Warning !", "Please add Income type in Income Type Edition section first", "warning");
        income_source_type.focus();
        return false;

    }
    else if(income_source_description_len == 0)
    {
        swal("Warning !", "Income source description can not be empty", "warning");
        income_source_description.focus();
        return false;
    }
    else
    {
        writeIncomeSource();
    }

    return true;
}


function Item_Type_validation()
{
    var item_type = document.getElementById('item_type');
    var item_type_value = item_type.value.trim();
    var type_len = item_type_value.length;

    var type_description = document.getElementById('item_type_description');
    var type_description_value = type_description.value.trim();
    var description_len = type_description_value.length;

    if (type_len == 0)
    {
        swal("Warning !", "Item Type can not be empty", "warning");
        item_type.focus();
        return false;

    }else if(description_len == 0)
    {
        swal("Warning !", "Item Type Description can not be empty", "warning");
        type_description.focus();
        return false;

    }else
    {
        writeItemType();
    }

    return true;
}


function Item_source_validation()
{
    var item_name = document.getElementById('item_source_name');
    var item_name_value = item_name.value.trim();
    var item_name_len = item_name_value.length;

    var item_amount = document.getElementById('item_amount');
    var item_amount_value = item_amount.value.trim();
    var item_amount_len = item_amount_value.length;

    var item_source_type = document.getElementById('item_source_type');
    var item_source_type_value = item_source_type.value.trim();
    var item_source_type_len = item_source_type_value.length;

    var item_source_description = document.getElementById('item_source_description');
    var item_source_description_value = item_source_description.value.trim();
    var item_source_description_len = item_source_description_value.length;


    if (item_name_len == 0)
    {
        swal("Warning !", "Item source name can not be empty", "warning");
        item_name.focus();
        return false;

    }else if(item_amount_len == 0)
    {
        swal("Warning !", "Item amount is invalid", "warning");
        item_amount.focus();
        return false;

    }else if(item_source_type_len == 0)
    {
        swal("Warning !", "Please add Item type in Item Type Edition section first", "warning");
        item_source_type.focus();
        return false;

    }
    else if(item_source_description_len == 0)
    {
        swal("Warning !", "Item source description can not be empty", "warning");
        item_source_description.focus();
        return false;
    }
    else
    {
        writeItemSource();
    }

    return true;
}

//budget -  validation
function add_income_validation()
{

    var income_name = document.getElementById('income_name');
    var income_name_value = income_name.value.trim();
    var income_name_len = income_name_value.length;


    var income_description = document.getElementById('income_description');
    var income_description_value = income_description.value.trim();
    var income_description_len = income_description_value.length;


    if (income_name_len == 0)
    {
        swal("Warning !", "Income name can not be empty! If you do not have a select choice you wish, please go to Income Source Section in CUSTOMIZE SOURCE to add on!", "warning");
        income_name.focus();
        return false;

    }else if(income_description_len == 0)
    {
        swal("Warning !", "Income description cannot be empty!", "warning");
        income_description.focus();
        return false;

    }
    else
    {
        writeAddIncome();
    }

    return true;
}

function add_item_validation()
{

    var item_name = document.getElementById('item_name');
    var item_name_value = item_name.value.trim();
    var item_name_len = item_name_value.length;

    var item_description = document.getElementById('item_description');
    var item_description_value = item_description.value.trim();
    var item_description_len = item_description_value.length;


    if (item_name_len == 0)
    {
        swal("Warning !", "Item name can not be empty! If you do not have a select choice you wish, please go to Item Source Section in CUSTOMIZE SOURCE to add on!", "warning");
        item_name.focus();
        return false;

    }else if(item_description_len == 0)
    {
        swal("Warning !", "Item description cannot be empty!", "warning");
        item_description.focus();
        return false;

    }
    else
    {
        writeAddItem();
    }

    return true;
}

function contact_validation()
{

    var contact_name = document.getElementById('contact_name');
    var contact_name_value = contact_name.value.trim();
    var contact_name_len = contact_name_value.length;

    var contact_email = document.getElementById('contact_email');
    var contact_email_value = contact_email.value.trim();
    var contact_email_len = contact_email_value.length;


    var contact_message = document.getElementById('contact_message');
    var contact_message_value = contact_message.value.trim();
    var contact_message_len = contact_message_value.length;


    if (contact_name_len == 0)
    {
        swal("Warning !", "Your name can not be empty!", "warning");
        contact_name.focus();
        return false;

    }
    else if(contact_email_len == 0){

        swal("Warning !", "Your email can not be empty!", "warning");
        contact_email.focus();
        return false;

    }
    else if(contact_message_len == 0)
    {
        swal("Warning !", "Contact message content cannot be empty!", "warning");
        contact_message.focus();
        return false;

    }
    else
    {
        contact(contact_name_value,contact_email_value,contact_message_value);
    }

    return true;
}

function resetPasswordValidation() {
    var email = document.getElementById('signin_email').value;
    if(email.length == 0){
        swal("WARNING","please enter email address!","warning");
    }else{
        resetPassword(email);
    }
}
