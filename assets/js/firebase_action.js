var config = {
    apiKey: "AIzaSyDMYuNLmKUckpXmOWsDsZgtR5m-nuWDOjc",
    authDomain: "budgetmanager-online.firebaseapp.com",
    databaseURL: "https://budgetmanager-online.firebaseio.com",
    projectId: "budgetmanager-online",
    storageBucket: "budgetmanager-online.appspot.com",
    messagingSenderId: "945814180085"
};


firebase.initializeApp(config);

//////////////////////////////////////////////////////////---------LOGIN/REGISTER---------/////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function register() {
    var email = document.getElementById('register_email').value;
    var password = document.getElementById('register_password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (user) {
            document.getElementById('success-bar').style.display="block";
            // document.getElementById('register_modal').style.display='none';
            // firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                var message = "The password is too weak.";
            } else {
                var message = errorMessage;
            }
            document.getElementById('register-error').innerHTML="<Strong>Error: <Strong>" + message;
            document.getElementById('error-bar').style.display="block";
        });

}

function login(){
    var email = document.getElementById("signin_email").value;
    var password = document.getElementById("signin_psw").value;

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function() {

            return firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function (user) {
                    document.getElementById('login_modal').style.display='none';

                })
                .catch(function(error) {
                    var errorMessage = error.message;
                    document.getElementById('login-error').innerHTML = "<Strong>Error: <Strong>" + errorMessage;
                    document.getElementById('login-error-bar').style.display="block";

                });
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });

}

function sendEmailVerification() {
    firebase.auth().currentUser.sendEmailVerification().then(function() {
        alert("Your Email Verification Sent!! Before to active your account, you need to verify your email.");
    });
}

function signout(){
    firebase.auth().signOut().then(function() {
        // alert("sign out");
    }).catch(function(error) {
        var errorMessage = error.message;
        alert(errorMessage);
    });
}


firebase.auth().onAuthStateChanged(function(user){
    if(user){
        var user = firebase.auth().currentUser;
        if(user != null){

            var email_verified = user.emailVerified;


            if(! email_verified){

                sendEmailVerification();

                alert("Your Email Verification Sent!! Before to active your account, you need to verify your email.");

                signout();

            }else{
                // go to home overview page
                // alert("Email verify account user");
                window.sessionStorage.setItem("uid",user.uid);
                if(window.location != "https://budgetmanager-online.firebaseapp.com/layouts/home.html" &&
                    window.location != "https://budgetmanager-online.firebaseapp.com/layouts/customize.html" &&
                    window.location != "https://budgetmanager-online.firebaseapp.com/layouts/budget.html" &&
                    window.location != "https://budgetmanager-online.firebaseapp.com/layouts/export.html"

                ){

                    window.location.href = "https://budgetmanager-online.firebaseapp.com/layouts/home.html";
                }

            }
        }else{
             window.location.replace("https://budgetmanager-online.firebaseapp.com/index.html");
            // go to home page
        }


    }else{

        if(window.location != "https://budgetmanager-online.firebaseapp.com/index.html"){
            window.location.replace("https://budgetmanager-online.firebaseapp.com/index.html");
        }
    }

});


//////////////////////////////////////////////////////////---------INCOME TYPE---------/////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function writeIncomeType() {

    var uid =  window.sessionStorage.getItem('uid');
    var type = document.getElementById('source_type').value.trim();
    var desc = document.getElementById('type_description').value.trim();
    if(type === null){
        swal("Important !", "Source Type can not be empty", "warning");
    }else{
        firebase.database().ref('users/'+uid+'/IncomeType/'+type).set({Description: desc});
        swal("Action Completed Successfully", "Income Type: '" +type+"' was added !", "success");
    }
}

function readIncomeTypeTable(){
    var uid =  window.sessionStorage.getItem('uid');
    var query = firebase.database().ref('users/'+uid+'/IncomeType/').orderByKey();
    query.on("value",function(snapshot) {

        var table = document.getElementById('source_type_table');
        var selectlist = document.getElementById('income_source_type');


        // clear up old data to reduce duplication
        table.innerHTML = "";
        selectlist.innerHTML = "";

        snapshot.forEach(function(childSnapshot) {
            var table = document.getElementById('source_type_table');
            // key will be "ada" the first time and "alan" the second time
            var sourcetype = childSnapshot.key;
            var Data = childSnapshot;
            var desc = Data.child("Description").val();
            var row = '<tr>' +
                '<td>'+sourcetype+'</td>' +
                '<td>'+desc+'</td>' +
                '<td><a class="source_type_add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>'+
                '<a class="source_type_edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
                '<a class="source_type_none" title="NAN" data-toggle="tooltip"><i class="material-icons"></i></a>' +
                '<a class="source_type_delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></td>' +
                '</tr>';

            table.innerHTML += row;

            var selectlist = document.getElementById('income_source_type');
            var select_choice = '<option>' + sourcetype + '</option>';
            selectlist.innerHTML += select_choice;
        });
    });
}

function updateIncomeType(type,desc){

    var uid =  window.sessionStorage.getItem('uid');
    firebase.database().ref('users/'+uid+'/IncomeType/'+type).set({Description: desc});

}

function removeIncomeType(type){
    var uid =  window.sessionStorage.getItem('uid');
    firebase.database().ref('users/'+uid+'/IncomeType/'+type).remove();
}

//////////////////////////////////////////////////////////---------INCOME SOURCE---------/////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function update_income_source_number(){

    var uid =  window.sessionStorage.getItem('uid');

    var query = firebase.database().ref('users/'+uid+'/IncomeSource/').orderByKey().limitToLast(1);

    query.on("value",function(snapshot) {

        if(snapshot.val() !== null){

            snapshot.forEach(function(childSnapshot) {

                var number = childSnapshot.key;

                document.getElementById('income_source_number').value = Number(number) + 1;

            });

        }else{

            document.getElementById('income_source_number').value = 1;
        }

    });

}


function writeIncomeSource() {

    var uid =  window.sessionStorage.getItem('uid');

    var income_number = document.getElementById('income_source_number').value;

    var income_name = document.getElementById('income_source_name').value.trim();

    var income_amount = document.getElementById('income_amount').value.trim();

    var income_source_type = document.getElementById('income_source_type').value.trim();

    var income_source_description = document.getElementById('income_source_description').value.trim();

    firebase.database().ref('users/'+uid+'/IncomeSource/'+income_number).set({Name: income_name, Amount: income_amount, Type: income_source_type, Description: income_source_description});

    swal("Action Completed Successfully", "Income Source: '" +income_name+"' was added !", "success");

}

function readIncomeSourceTable(){

    var uid =  window.sessionStorage.getItem('uid');

    var query = firebase.database().ref('users/'+uid+'/IncomeSource/').orderByKey();

    query.on("value",function(snapshot) {

        var table = document.getElementById('income_source_table');

        // clear up old data to reduce duplication
        table.innerHTML = "";

        snapshot.forEach(function(childSnapshot) {
            var table = document.getElementById('income_source_table');
            // key will be "ada" the first time and "alan" the second time
            var income_number = childSnapshot.key;
            var Data = childSnapshot;
            var name = Data.child("Name").val();
            var type = Data.child("Type").val();
            var amount = Data.child("Amount").val();
            var desc = Data.child("Description").val();
            var row = '<tr>' +
                '<td>'+income_number+'</td>' +
                '<td>'+name+'</td>' +
                '<td>'+amount+'</td>' +
                '<td>'+type+'</td>' +
                '<td>'+desc+'</td>' +
                '<td><a class="income_source_add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>'+
                '<a class="income_source_edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
                '<a class="income_source_none" title="NAN" data-toggle="tooltip"><i class="material-icons"></i></a>' +
                '<a class="income_source_delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></td>' +
                '</tr>';

            table.innerHTML += row;

        });
    });
}


function updateIncomeSource(number,name,amount,type) {

    var uid =  window.sessionStorage.getItem('uid');

    firebase.database().ref('users/'+uid+'/IncomeSource/'+number).update({Name:name, Amount: amount, Type: type});

}

function removeIncomeSource(type){

    var uid =  window.sessionStorage.getItem('uid');

    firebase.database().ref('users/'+uid+'/IncomeSource/'+type).remove();

}

//////////////////////////////////////////////////////////---------ITEM TYPE---------/////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function writeItemType() {

    var uid =  window.sessionStorage.getItem('uid');

    var type = document.getElementById('item_type').value.trim();

    var desc = document.getElementById('item_type_description').value.trim();

    if(type === null){

        swal("WARNING!", "Item type can not be empty", "warning");

    }else{

        firebase.database().ref('users/'+uid+'/ItemType/'+type).set({Description: desc});

        swal("Action Completed Successfully", "Item Type: '" +type+"' was added !", "success");

    }
}


function readItemTypeTable(){

    var uid =  window.sessionStorage.getItem('uid');

    var query = firebase.database().ref('users/'+uid+'/ItemType/').orderByKey();

    query.on("value",function(snapshot) {

        var table = document.getElementById('item_type_table');
        var selectlist = document.getElementById('item_source_type');

        // clear up old data to reduce duplication
        table.innerHTML = "";
        selectlist.innerHTML = "";

        snapshot.forEach(function(childSnapshot) {

            var table = document.getElementById('item_type_table');
            var sourcetype = childSnapshot.key;
            var Data = childSnapshot;
            var desc = Data.child("Description").val();
            var row = '<tr>' +
                '<td>'+sourcetype+'</td>' +
                '<td>'+desc+'</td>' +
                '<td><a class="item_type_add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>'+
                '<a class="item_type_edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
                '<a class="item_type_none" title="NAN" data-toggle="tooltip"><i class="material-icons"></i></a>' +
                '<a class="item_type_delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></td>' +
                '</tr>';

            table.innerHTML += row;

            var selectlist = document.getElementById('item_source_type');
            var select_choice = '<option>' + sourcetype + '</option>';
            selectlist.innerHTML += select_choice;
        });
    });
}

function updateItemType(type,desc){

    var uid =  window.sessionStorage.getItem('uid');

    firebase.database().ref('users/'+uid+'/ItemType/'+type).set({Description: desc});

}

function removeItemType(type){

    var uid = firebase.auth().currentUser.uid;

    firebase.database().ref('users/'+uid+'/ItemType/'+type).remove();
}


//////////////////////////////////////////////////////////---------ITEM SOURCE---------/////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function update_item_source_number(){

    var uid =  window.sessionStorage.getItem('uid');
    var query = firebase.database().ref('users/'+uid+'/ItemSource/').orderByKey().limitToLast(1);

    query.on("value",function(snapshot) {

        if(snapshot.val() !== null){

            snapshot.forEach(function(childSnapshot) {

                var number = childSnapshot.key;

                document.getElementById('item_source_number').value = Number(number) + 1;

            });

        }else{

            document.getElementById('item_source_number').value = 1;
        }

    });

}

function writeItemSource() {

    var uid =  window.sessionStorage.getItem('uid');

    var item_number = document.getElementById('item_source_number').value;

    var item_name = document.getElementById('item_source_name').value.trim();

    var item_amount = document.getElementById('item_amount').value.trim();

    var item_source_type = document.getElementById('item_source_type').value.trim();

    var item_source_description = document.getElementById('item_source_description').value.trim();

    firebase.database().ref('users/'+uid+'/ItemSource/'+item_number).set({Name: item_name,Amount: item_amount, Type: item_source_type, Description: item_source_description});

    swal("Action Completed Successfully", "Item Source: '" +item_name+"' was added !", "success");

}




function readItemSourceTable(){
    var uid =  window.sessionStorage.getItem('uid');
    var query = firebase.database().ref('users/'+uid+'/ItemSource/').orderByKey();
    query.on("value",function(snapshot) {

        var table = document.getElementById('item_source_table');

        // clear up old data to reduce duplication
        table.innerHTML = "";

        snapshot.forEach(function(childSnapshot) {
            var table = document.getElementById('item_source_table');
            // key will be "ada" the first time and "alan" the second time
            var item_number = childSnapshot.key;
            var Data = childSnapshot;
            var name = Data.child("Name").val();
            var type = Data.child("Type").val();
            var amount = Data.child("Amount").val();
            var desc = Data.child("Description").val();
            var row = '<tr>' +
                '<td>'+item_number+'</td>' +
                '<td>'+name+'</td>' +
                '<td>'+amount+'</td>' +
                '<td>'+type+'</td>' +
                '<td>'+desc+'</td>' +
                '<td><a class="item_source_add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>'+
                '<a class="item_source_edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
                '<a class="item_source_none" title="NAN" data-toggle="tooltip"><i class="material-icons"></i></a>' +
                '<a class="item_source_delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></td>' +
                '</tr>';

            table.innerHTML += row;

        });
    });
}


function updateItemSource(number,name,amount,type) {

    var uid =  window.sessionStorage.getItem('uid');

    firebase.database().ref('users/'+uid+'/ItemSource/'+number).update({Name: name, Amount: amount, Type: type });

}


function removeItemSource(type){
    var uid =  window.sessionStorage.getItem('uid');
    firebase.database().ref('users/'+uid+'/ItemSource/'+type).remove();
}


//////////////////////////////////////////////////////////---------ADD INCOME---------/////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function readIncomeTable(){
    var uid =  window.sessionStorage.getItem('uid');
    var query = firebase.database().ref('users/'+uid+'/IncomeSource/').orderByKey();
    query.on("value",function(snapshot) {

        var income_name_selection = document.getElementById('income_name');

        // clear up old data to reduce duplication
        income_name_selection.innerHTML = "<option></option>";

        snapshot.forEach(function(childSnapshot) {
            var income_name_selection = document.getElementById('income_name');

            var source_number = childSnapshot.key;
            var income_name = childSnapshot.child('Name').val();

            income_name_selection.innerHTML += '<option>['+source_number+']-'+income_name+'</option>';

        });
    });
}


function update_Income_amount_and_type(){

    var uid =  window.sessionStorage.getItem('uid');
    var income_name = document.getElementById('income_name').value;


    if(income_name == ""){
        document.getElementById('income_amount').value = 0;
        document.getElementById('income_type').value = "";
    }else {

        var source_number = income_name.split('-',1)[0];
        source_number = source_number.slice(1, source_number.length-1);

        firebase.database().ref('users/' + uid + '/IncomeSource/' + source_number).once('value').then(function (snapshot) {

            var type = snapshot.val().Type;
            var amount = snapshot.val().Amount;

            var income_amount = document.getElementById('income_amount');
            var income_type = document.getElementById('income_type');

            income_amount.value = amount;
            income_type.value = type;

        });

    }
}


function update_Income_number(){

    var uid =  window.sessionStorage.getItem('uid');
    var year = document.getElementById('income_year').value;
    var month = document.getElementById('income_month').value;


    var query = firebase.database().ref('users/'+uid+'/Records/'+year+'/'+month+'/Income').orderByKey().limitToLast(1);


    // query.once('value').then(function (snapshot) {

    query.on("value",function(snapshot) {

        var income_number = document.getElementById('income_number').value;


        if(snapshot.val() !== null){

            snapshot.forEach(function(childSnapshot) {

                var number = childSnapshot.key;
                var Data = childSnapshot;
                // var type = Data.child("Type").val();

                document.getElementById('income_number').value = Number(number) + 1;

            });


        }else{
            document.getElementById('income_number').value = 1;
        }

    });

}



/*write add new income to DB */
function writeAddIncome() {

    var uid =  window.sessionStorage.getItem('uid');
    var number = document.getElementById('income_number').value;
    var year = document.getElementById('income_year').value;
    var month = document.getElementById('income_month').value;
    var date = document.getElementById('income_date').value;
    date = year+'/'+month+'/'+date;
    var income_name = document.getElementById('income_name').value;
    var income_amount = document.getElementById('income_amount').value;
    var income_type = document.getElementById('income_type').value;
    var income_description = document.getElementById('income_description').value.trim();

    firebase.database().ref('users/'+uid+'/Records/'+year+'/'+month+'/Income/'+ number).set({Name: income_name, Amount:income_amount,Type: income_type, Date:date,Description: income_description});

    swal("Action Completed Successfully", "Income# " +number+ " In "+month+"/"+ year+" was added !", "success");

}



function readIncomeManageTable(){

    var uid =  window.sessionStorage.getItem('uid');

    var year = document.getElementById('search_year').value;

    var month = document.getElementById('search_month').value;

    var query = firebase.database().ref('users/'+uid+'/Records/'+year+'/'+month+'/Income').orderByKey();

    query.on("value",function(snapshot) {

        var table = document.getElementById('income_table');
        var income_total = document.getElementById('income_total');


        // clear up old data to reduce duplication
        table.innerHTML = "";
        income_total.innerHTML = 0;


        snapshot.forEach(function(childSnapshot) {

            var table = document.getElementById('income_table');
            var income_total = document.getElementById('income_total');

            var number = childSnapshot.key;
            var Data = childSnapshot;
            var name = Data.child("Name").val();
            var date = Data.child("Date").val();
            var amount = Data.child("Amount").val();
            var type = Data.child("Type").val();

            var row = '<tr>' +
                '<td>'+number+'</td>' +
                '<td>'+name+'</td>' +
                '<td>'+date+'</td>' +
                '<td>'+amount+'</td>' +
                '<td>'+type+'</td>' +
                '<td><a class="income_view" onclick="document.getElementById(\'view_income_modal\').style.display=\'block\'" title="View Details" data-toggle="tooltip"><i class="material-icons">&#xE5C8;</i></a>'+
                '<a class="income_delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE5C9;</i></a></td>' +
                '</tr>';

            income_total.innerHTML =  Number(income_total.innerHTML) + Number(amount);

            table.innerHTML += row;

        });

        firebase.database().ref('users/'+uid+'/Records/'+year+'/'+month+'/Total').update({Income:income_total.innerHTML});
    });
}

function removeIncome(number,year,month){
    var uid =  window.sessionStorage.getItem('uid');
    firebase.database().ref('users/'+uid+'/Records/'+year+'/'+month+'/Income/'+number).remove();
}

function viewIncome(number,year,month){
    var uid =  window.sessionStorage.getItem('uid');
    var query = firebase.database().ref('users/'+uid+'/Records/'+year+'/'+month+'/Income/'+number).orderByKey();

    query.once('value').then(function (snapshot) {
            document.getElementById('view_income_description').value = snapshot.child("Description").val();
    });
}


//////////////////////////////////////////////////////////---------ADD ITEM---------/////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function readItemTable(){
    var uid =  window.sessionStorage.getItem('uid');
    var query = firebase.database().ref('users/'+uid+'/ItemSource/').orderByKey();
    query.on("value",function(snapshot) {

        var item_name_selection = document.getElementById('item_name');

        // clear up old data to reduce duplication
        item_name_selection.innerHTML = "<option></option>";

        snapshot.forEach(function(childSnapshot) {
            var item_name_selection = document.getElementById('item_name');

            var source_number = childSnapshot.key;
            var item_name = childSnapshot.child('Name').val();

            item_name_selection.innerHTML += '<option>['+source_number+']-'+item_name+'</option>';

        });
    });
}



function update_item_amount_and_type(){

    var uid =  window.sessionStorage.getItem('uid');
    var item_name = document.getElementById('item_name').value;

    if(item_name == ""){

        document.getElementById('item_amount').value = 0;
        document.getElementById('item_type').value = "";

    }else {


        var source_number = item_name.split('-',1)[0];
        source_number = source_number.slice(1, source_number.length-1);

        firebase.database().ref('users/' + uid + '/ItemSource/' + source_number).once('value').then(function (snapshot) {

            var type = snapshot.val().Type;
            var amount = snapshot.val().Amount;

            var item_amount = document.getElementById('item_amount');
            var item_type = document.getElementById('item_type');

            item_amount.value = amount;
            item_type.value = type;

        });

    }
}


function update_item_number(){

    var uid =  window.sessionStorage.getItem('uid');
    var year = document.getElementById('item_year').value;
    var month = document.getElementById('item_month').value;


    var query = firebase.database().ref('users/'+uid+'/Records/'+year+'/'+month+'/Item').orderByKey().limitToLast(1);


    // query.once('value').then(function (snapshot) {

    query.on("value",function(snapshot) {

        var income_number = document.getElementById('item_number').value;


        if(snapshot.val() !== null){

            snapshot.forEach(function(childSnapshot) {

                var number = childSnapshot.key;
                var Data = childSnapshot;
                // var type = Data.child("Type").val();

                document.getElementById('item_number').value = Number(number) + 1;

            });


        }else{
            document.getElementById('item_number').value = 1;
        }

    });

}


/*write add new item to DB */
function writeAddItem() {

    var uid =  window.sessionStorage.getItem('uid');
    var number = document.getElementById('item_number').value;
    var year = document.getElementById('item_year').value;
    var month = document.getElementById('item_month').value;
    var date = document.getElementById('item_date').value;
    var full_date = year+'/'+month+'/'+date;
    var item_name = document.getElementById('item_name').value;
    var item_amount = document.getElementById('item_amount').value;
    var item_type = document.getElementById('item_type').value;
    var item_description = document.getElementById('item_description').value.trim();

    firebase.database().ref('users/'+uid+'/Records/'+year+'/'+month+'/Item/'+ number).set({Name: item_name, Amount:item_amount,Type: item_type, Date: full_date,Description: item_description});

    updateDailyTotal(uid,year,month,date,item_amount,'add');

    swal("Action Completed Successfully", "Item# " +number+ " In "+month+"/"+ year+" was added !", "success");

}

function updateDailyTotal(uid,year,month,date,addOn,type){

    var query = firebase.database().ref('users/'+uid+'/Records/'+year+'/'+month+'/Daily').orderByKey();

    query.once('value').then(function (snapshot) {

        if(type == 'add') {


            if (snapshot.val() != null) {

                var total = Number(snapshot.child(date).child('Total').val()) + Number(addOn);

                firebase.database().ref('users/' + uid + '/Records/' + year + '/' + month + '/Daily/' + date).update({Total: total});


            } else {

                firebase.database().ref('users/' + uid + '/Records/' + year + '/' + month + '/Daily/' + date).set({Total: addOn});

            }

        }else if(type=='delete'){

            var total = Number(snapshot.child(date).child('Total').val()) - Number(addOn);

            firebase.database().ref('users/' + uid + '/Records/' + year + '/' + month + '/Daily/' + date).update({Total: total});

        }

    });

}


function readItemManageTable(){

    var uid =  window.sessionStorage.getItem('uid');

    var year = document.getElementById('search_year').value;

    var month = document.getElementById('search_month').value;


    var query = firebase.database().ref('users/'+uid+'/Records/'+year+'/'+month+'/Item').orderByKey();

    query.on("value",function(snapshot) {

        var table = document.getElementById('item_table');
        var item_total = document.getElementById('item_total');


        // clear up old data to reduce duplication
        table.innerHTML = "";
        item_total.innerHTML = 0;

        snapshot.forEach(function(childSnapshot) {

            var table = document.getElementById('item_table');
            var item_total = document.getElementById('item_total');


            var number = childSnapshot.key;
            var Data = childSnapshot;
            var name = Data.child("Name").val();
            var date = Data.child("Date").val();
            var amount = Data.child("Amount").val();
            var type = Data.child("Type").val();

            var row = '<tr>' +
                '<td>'+number+'</td>' +
                '<td>'+name+'</td>' +
                '<td>'+date+'</td>' +
                '<td>'+amount+'</td>' +
                '<td>'+type+'</td>' +
                '<td><a class="item_view" onclick="document.getElementById(\'view_item_modal\').style.display=\'block\'" title="View Details" data-toggle="tooltip"><i class="material-icons">&#xE5C8;</i></a>'+
                '<a class="item_delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE5C9;</i></a></td>' +
                '</tr>';


            item_total.innerHTML =  Number(item_total.innerHTML) + Number(amount);
            table.innerHTML += row;

        });

        firebase.database().ref('users/'+uid+'/Records/'+year+'/'+month+'/Total').update({Item:item_total.innerHTML});

    });
}


function removeItem(number,year,month,date,amount){
    var uid =  window.sessionStorage.getItem('uid');
    firebase.database().ref('users/'+uid+'/Records/'+year+'/'+month+'/Item/'+number).remove();
    updateDailyTotal(uid,year,month,date,amount,'delete');

}

function viewItem(number,year,month){
    var uid =  window.sessionStorage.getItem('uid');
    var query = firebase.database().ref('users/'+uid+'/Records/'+year+'/'+month+'/Item/'+number).orderByKey();
    query.once('value').then(function (snapshot) {
        document.getElementById('view_item_description').value = snapshot.child("Description").val();
    });
}



//////////////////////////////////////////////////////////---------EXPORT TABLES---------/////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function readExportTable(){


    var uid =  window.sessionStorage.getItem('uid');

    var year = document.getElementById('search_year').value;

    var month = document.getElementById('search_month').value;


    var query = firebase.database().ref('users/'+uid+'/Records/'+year+'/'+month).orderByKey();

    // query.once('value').then(function (snapshot) {

    query.on("value",function(snapshot) {


        // clear up old data to reduce duplication
        var table = $('#export_table').DataTable();
        table.clear().draw();

        snapshot.forEach(function(childSnapshot) {

            var source = childSnapshot.key;
            var Data = childSnapshot;


            if(source == "Income") {

                Data.forEach(
                    function (childSnapshot) {


                        var data = childSnapshot;
                        var name = data.child('Name').val();
                        var date = data.child('Date').val();
                        var type = data.child('Type').val();
                        var amount = data.child('Amount').val();
                        var source = "Income";

                        var table = $('#export_table').DataTable();
                        table.row.add([ name, date, amount,type,source ]).draw();


                    });

            }else if(source == "Item"){

                Data.forEach(
                    function (childSnapshot) {

                        var data = childSnapshot;
                        var name = data.child('Name').val();
                        var date = data.child('Date').val();
                        var type = data.child('Type').val();
                        var amount = data.child('Amount').val();
                        var source = "Expense";

                        var table = $('#export_table').DataTable();
                        table.row.add([ name, date, amount,type,source ]).draw();

                    });

            }


        });
    });

}
//////////////////////////////////////////////////////////---------Overview Analysis---------/////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function update_budget_bar_chart(){

    var uid =  window.sessionStorage.getItem('uid');
    var year = document.getElementById('search_year').value;

    var query = firebase.database().ref('users/'+uid+'/Records/'+year).orderByKey();

    // query.once('value').then(function (snapshot) {

    query.on("value",function(snapshot) {

        document.getElementById('max_expense_value').innerHTML = 0;
        document.getElementById('expense_value_list').innerHTML = "";
        document.getElementById('month_value_list').innerHTML = "";

        if(snapshot.val() !== null){

            snapshot.forEach(function(childSnapshot) {

                var month = childSnapshot.key;
                var Data = childSnapshot;
                var total = Data.child('Total');
                var income_total = total.child('Income').val();
                var expense_total = total.child('Item').val();



                var max_expense = document.getElementById('max_expense_value').innerHTML;

                if(expense_total > Number(max_expense)){

                    document.getElementById('max_expense_value').innerHTML = Number(expense_total);

                }


                document.getElementById('expense_value_list').innerHTML += expense_total+",";

                document.getElementById('month_value_list').innerHTML += month+",";

            });

            var expense_array = [0,0,0,0,0,0,0,0,0,0,0,0];


            var month_value_list = document.getElementById('month_value_list').innerHTML;
            var month_value_array = month_value_list.slice(0, month_value_list.length-1).split(',');

            var expense_value_list = document.getElementById('expense_value_list').innerHTML;
            var expense_value_array = expense_value_list.slice(0,expense_value_list.length-1).split(',');



            for(var i = 0; i < expense_value_array.length; i++){
                expense_array[Number(month_value_array[i])-1] = expense_value_array[i];
            }

            var max_expense = Number(document.getElementById('max_expense_value').innerHTML);

            var label_value = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

            myBarChart.destroy();
            updateBudgetBarChart(label_value,expense_array,Math.ceil(max_expense/10)*10);

            document.getElementById('barChartFooter').innerHTML = "";
            document.getElementById('barChartFooter').innerHTML = year;

        }else{

            var label_value = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
            var expense_array = [0,0,0,0,0,0,0,0,0,0,0,0];
            myBarChart.destroy();
            updateBudgetBarChart(label_value,expense_array,100);

            document.getElementById('barChartFooter').innerHTML = "";
            document.getElementById('barChartFooter').innerHTML = year;

        }

    });

}


function update_budget_area_chart(){

    var uid =  window.sessionStorage.getItem('uid');
    var year = document.getElementById('search_year').value;
    var month = document.getElementById('search_month').value;

    var query = firebase.database().ref('users/'+uid+'/Records/'+year +'/'+month).orderByKey();

    query.on("value",function(snapshot) {


        document.getElementById('date_value_list').innerHTML = "";
        document.getElementById('daily_expense_list').innerHTML = "";
        document.getElementById('max_expense_value').innerHTML = 0;


        if(snapshot.val() !== null){


            snapshot.child('Daily').forEach(function (childSnapshot) {

                var date = childSnapshot.key;
                var Data = childSnapshot;
                var total = Data.child('Total').val();


                var max_expense = document.getElementById('max_expense_value').innerHTML;

                if(total > Number(max_expense)){

                    document.getElementById('max_expense_value').innerHTML = Number(total);

                }

                document.getElementById('date_value_list').innerHTML += date+',';
                document.getElementById('daily_expense_list').innerHTML += total+',';

            });


            if(month == 02){

                var label = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
                var daily_expense_array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

            }else if(month==01 || month==03 || month==05 || month==07 || month==08 || month==10 || month==12){

                var label = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
                var daily_expense_array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

            }else{

                var label = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
                var daily_expense_array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

            }


            var date_value_list = document.getElementById('date_value_list').innerHTML;
            var date_value_array = date_value_list.slice(0, date_value_list.length-1).split(',');

            var daily_expense_list = document.getElementById('daily_expense_list').innerHTML;
            var expense_value_array = daily_expense_list.slice(0,daily_expense_list.length-1).split(',');

            for(var i = 0; i < date_value_array.length; i++){
                daily_expense_array[Number(date_value_array[i])-1] = expense_value_array[i];
            }

            var max_expense = Number(document.getElementById('max_expense_value').innerHTML);

            myAreaChart.destroy();
            updateBudgetAreaChart(label,daily_expense_array,Math.ceil(max_expense/10)*10);

            document.getElementById('areaChartFooter').innerHTML = "";
            var month_list = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
            var month_value = month_list[Number(month)-1];
            document.getElementById('areaChartFooter').innerHTML = month_value;


        }else{

            if(month == 02){

                var label = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
                var daily_expense_array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

            }else if(month==01 || month==03 || month==05 || month==07 || month==08 || month==10 || month==12){

                var label = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
                var daily_expense_array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

            }else{

                var label = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
                var daily_expense_array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

            }

            myAreaChart.destroy();
            updateBudgetAreaChart(label,daily_expense_array,10);

            document.getElementById('areaChartFooter').innerHTML = "";
            var month_list = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
            var month_value = month_list[Number(month)-1];
            document.getElementById('areaChartFooter').innerHTML = month_value;

        }

    });

}



function update_budget_Pie_chart(){

    var uid =  window.sessionStorage.getItem('uid');
    var year = document.getElementById('search_year').value;
    var month = document.getElementById('search_month').value;

    var query = firebase.database().ref('users/'+uid+'/Records/'+year +'/'+month).orderByKey();

    query.on("value",function(snapshot) {

        if(snapshot.val() !== null){

            var income = snapshot.child('Total').child('Income').val();
            var expense = snapshot.child('Total').child('Item').val();

            myPieChart.destroy();
            updateBudgetPieChart(expense,income-expense);


            document.getElementById('pieChartFooter').innerHTML = "";
            var month_list = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
            var month_value = month_list[Number(month)-1];
            document.getElementById('pieChartFooter').innerHTML = month_value;

        }else{

            myPieChart.destroy();
            updateBudgetPieChart(0,100);

            document.getElementById('pieChartFooter').innerHTML = "";
            var month_list = ['Jan','Feb','March','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];
            var month_value = month_list[Number(month)-1];
            document.getElementById('pieChartFooter').innerHTML = month_value;
            
        }

    });

}

///////////////////////////////////////////////////////////// Contact Section/////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function contact(name,email,message){

    var date = new Date().toUTCString();

    firebase.database().ref('message/'+date).set({Name: name, Email: email, Message: message});

    swal("Message Sent !", "Your message sent successfully!", "success");


}

function resetPassword(email){

    var auth = firebase.auth();

    auth.sendPasswordResetEmail(email).then(function() {
        // Email sent.
        swal("Email Sent","Your password reset requestion link has been sent to your email: "+email);

    }).catch(function(error) {
        alert(error);
    });

}


var timeoutID;
function setup() {
    this.addEventListener("mousemove", resetTimer, false);
    this.addEventListener("mousedown", resetTimer, false);
    this.addEventListener("keypress", resetTimer, false);
    this.addEventListener("DOMMouseScroll", resetTimer, false);
    this.addEventListener("mousewheel", resetTimer, false);
    this.addEventListener("touchmove", resetTimer, false);
    this.addEventListener("MSPointerMove", resetTimer, false);
    startTimer();
}


function startTimer() {
    // wait 15 minus before calling goInactive
    timeoutID = window.setTimeout(goInactive, 900000);
}

function resetTimer(e) {
    window.clearTimeout(timeoutID);
    goActive();
}

function goInactive() {
    if(firebase.auth().currentUser != null) {
        alert("Time out: your are no active within 15 minus!");
        signout();
    }
}

function goActive() {
    startTimer();
}
