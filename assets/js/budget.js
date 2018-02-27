// income type table
$(document).ready(function(){

    $('[data-toggle="tooltip"]').tooltip();

    $(document).on("click", "#add_new_income", function() {


        $("#income_year").find("option").each(function (i, e) {

            var current_year = new Date().getFullYear();

            if ($(e).val() == current_year) {

                $("#income_year").prop('selectedIndex', i);

            }

        });

        $("#income_month").find("option").each(function (i, e) {

            var current_month = new Date().getMonth();

            if ($(e).val() == (current_month + 1)) {

                $("#income_month").prop('selectedIndex', i);

            }

        });

        $("#income_date").find("option").each(function (i, e) {

            var current_date = new Date().getDate();

            if ($(e).val() == current_date ) {
                $("#income_date").prop('selectedIndex', i);
            }
        });

        readIncomeTable();
        update_Income_number();
        update_Income_amount_and_type();

    });


    $(document).on("click", "#add_new_item", function() {


        $("#item_year").find("option").each(function (i, e) {

            var current_year = new Date().getFullYear();

            if ($(e).val() == current_year) {

                $("#item_year").prop('selectedIndex', i);

            }

        });

        $("#item_month").find("option").each(function (i, e) {

            var current_month = new Date().getMonth();

            if ($(e).val() == (current_month + 1)) {

                $("#item_month").prop('selectedIndex', i);

            }

        });

        $("#item_date").find("option").each(function (i, e) {

            var current_date = new Date().getDate();

            if ($(e).val() == current_date ) {
                $("#item_date").prop('selectedIndex', i);
            }
        });

        readItemTable();
        update_item_number();
        update_item_amount_and_type();

    });


    $(document).on("click", "#search_action", function() {
        readIncomeManageTable();
        readItemManageTable();
    });



    // view row on view button click
    $(document).on("click", ".income_view", function(){

        var income_number = $(this).parents("tr").find('td:first-child').first().text();
        var income_name = $(this).parents("tr").find('td:nth-last-child(5)').first().text();
        var income_date = $(this).parents("tr").find('td:nth-last-child(4)').first().text();
        var income_amount = $(this).parents("tr").find('td:nth-last-child(3)').first().text();
        var income_type = $(this).parents("tr").find('td:nth-last-child(2)').first().text();

        document.getElementById('view_income_number').value = income_number;
        document.getElementById('view_income_name').value = income_name;
        document.getElementById('view_income_date').value = income_date;
        document.getElementById('view_income_amount').value = income_amount;
        document.getElementById('view_income_type').value = income_type;
        var date = income_date.split("/");
        viewIncome(income_number,date[0],date[1]);

    });

    // view row on view button click
    $(document).on("click", ".item_view", function(){

        var item_number = $(this).parents("tr").find('td:first-child').first().text();
        var item_name = $(this).parents("tr").find('td:nth-last-child(5)').first().text();
        var item_date = $(this).parents("tr").find('td:nth-last-child(4)').first().text();
        var item_amount = $(this).parents("tr").find('td:nth-last-child(3)').first().text();
        var item_type = $(this).parents("tr").find('td:nth-last-child(2)').first().text();

        document.getElementById('view_item_number').value = item_number;
        document.getElementById('view_item_name').value = item_name;
        document.getElementById('view_item_date').value = item_date;
        document.getElementById('view_item_amount').value = item_amount;
        document.getElementById('view_item_type').value = item_type;
        var date = item_date.split("/");
        viewItem(item_number,date[0],date[1]);

    });



    // Delete row on delete button click
    $(document).on("click", ".income_delete", function(){

        var income_number = $(this).parents("tr").find('td:first-child').first().text();
        var income_date = $(this).parents("tr").find('td:nth-last-child(4)').first().text();
        var date = income_date.split("/");
        removeIncome(income_number,date[0],date[1]);

    });


    $(document).on("click", ".item_delete", function(){

        var item_number = $(this).parents("tr").find('td:first-child').first().text();
        var item_date = $(this).parents("tr").find('td:nth-last-child(4)').first().text();
        var item_amount = $(this).parents("tr").find('td:nth-last-child(3)').first().text();
        var date = item_date.split("/");
        removeItem(item_number,date[0],date[1],date[2],item_amount);

    });




    $("#income_name").change(function() {
        update_Income_amount_and_type();
    });

    $("#income_year" ).change(function() {
        update_Income_number();
    });

    $("#income_month" ).change(function() {
        update_Income_number();
    });


    $("#item_name").change(function() {
        update_item_amount_and_type();
    });

    $("#item_year" ).change(function() {
        update_item_number();
    });

    $("#item_month" ).change(function() {
        update_item_number();
    });



    $("#search_year").find("option").each(function (i, e) {

        var current_year = new Date().getFullYear();

        if ($(e).val() == current_year) {

            $("#search_year").prop('selectedIndex', i);

        }

    });

    $("#search_month").find("option").each(function (i, e) {

        var current_month = new Date().getMonth();

        if ($(e).val() == (current_month + 1)) {

            $("#search_month").prop('selectedIndex', i);

        }


    });

    $("#search_date").find("option").each(function (i, e) {

        var current_date = new Date().getDate();

        if ($(e).val() == current_date ) {
            $("#search_date").prop('selectedIndex', i);
        }
    });

    readIncomeManageTable();
    readItemManageTable();
    setup();
});


