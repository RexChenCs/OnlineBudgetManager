// income type table
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    // Add row on add button click
    $(document).on("click", ".source_type_add", function(){
        var empty = false;
        var input = $(this).parents("tr").find('input[type="text"]');
        input.each(function(){
            if(!$(this).val()){
                $(this).addClass("error");
                empty = true;
            } else{
                $(this).removeClass("error");
            }
        });
        $(this).parents("tr").find(".error").first().focus();

        var type_source = $(this).parents("tr").find('input[type="text"]').first().val();
        var des = ($(this).parents("tr").find('input[type="text"]').last().val());

        if(!empty){
            input.each(function(){
                $(this).parent("td").html($(this).val());
            });
            $(this).parents("tr").find(".source_type_add, .source_type_edit").toggle();
            $(this).parents("tr").find(".source_type_none, .source_type_delete").toggle();

            //firebase database update
            updateIncomeType(type_source,des);

        }
    });

    // Edit row on edit button click
    $(document).on("click", ".source_type_edit", function(){

        // $(this).parents("tr").find("td:not(:last-child)").each(function(){
        //     $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
        // });

        $(this).parents("tr").find("td:first-child").each(function(){
            $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '" readonly>');
        });

        $(this).parents("tr").find("td:nth-last-child(2)").each(function(){
            $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
        });

        $(this).parents("tr").find(".source_type_add, .source_type_edit").toggle();
        $(this).parents("tr").find(".source_type_delete, .source_type_none").toggle();


    });
    // Delete row on delete button click
    $(document).on("click", ".source_type_delete", function(){

        $(this).parents("tr").find("td:first-child").each(function () {
            removeIncomeType($(this).text());
        });

        $(this).parents("tr").remove();

    });
});

// income source table
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    // Add row on add button click
    $(document).on("click", ".income_source_add", function(){
        var empty = false;
        var input = $(this).parents("tr").find('input');
        var select = $(this).parents("tr").find('select');
        input.each(function(){
            if(!$(this).val()){
                $(this).addClass("error");
                empty = true;
            } else{
                $(this).removeClass("error");
            }
        });

        $(this).parents("tr").find(".error").first().focus();



        if(!empty){

            var income_number = $(this).parents("tr").find('input[type="number"]').first().val();
            var income_name = $(this).parents("tr").find('input[type="text"]').first().val();
            var income_amount = $(this).parents("tr").find('input[type="number"]').last().val();
            var income_type = $(this).parents("tr").find('input[type="text"]').last().val();

            input.each(function(){
                $(this).parent("td").html($(this).val());
            });

            $(this).parents("tr").find(".income_source_add, .income_source_edit").toggle();
            $(this).parents("tr").find(".income_source_none, .income_source_delete").toggle();

            //firebase update
            updateIncomeSource(income_number,income_name,income_amount,income_type);

        }
    });

    // Edit row on edit button click
    $(document).on("click", ".income_source_edit", function(){


        $(this).parents("tr").find("td:first-child").each(function(){
            $(this).html('<input type="number" class="form-control" value="' + $(this).text() + '" readonly>');
        });

        $(this).parents("tr").find("td:nth-last-child(5)").each(function(){
            $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
        });

        $(this).parents("tr").find("td:nth-last-child(4)").each(function(){
            $(this).html('<input type="number" class="form-control" min="0" step=".01" value="' + $(this).text() +'">');
        });

        $(this).parents("tr").find("td:nth-last-child(3)").each(function(){
            $(this).html('<input type="text" class="form-control"  value="' + $(this).text()+'">');

        });

        $(this).parents("tr").find(".income_source_add, .income_source_edit").toggle();
        $(this).parents("tr").find(".income_source_delete, .income_source_none").toggle();


    });
    // Delete row on delete button click
    $(document).on("click", ".income_source_delete", function(){

        $(this).parents("tr").find("td:first-child").each(function () {
            removeIncomeSource($(this).text());
        });

        $(this).parents("tr").remove();

    });
});




// item type table
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    // Add row on add button click
    $(document).on("click", ".item_type_add", function(){
        var empty = false;
        var input = $(this).parents("tr").find('input[type="text"]');
        input.each(function(){
            if(!$(this).val()){
                $(this).addClass("error");
                empty = true;
            } else{
                $(this).removeClass("error");
            }
        });
        $(this).parents("tr").find(".error").first().focus();

        var type_source = $(this).parents("tr").find('input[type="text"]').first().val();
        var des = ($(this).parents("tr").find('input[type="text"]').last().val());

        if(!empty){
            input.each(function(){
                $(this).parent("td").html($(this).val());
            });
            $(this).parents("tr").find(".item_type_add, .item_type_edit").toggle();
            $(this).parents("tr").find(".item_type_none, .item_type_delete").toggle();

            //firebase database update
            updateItemType(type_source,des);

        }
    });

    // Edit row on edit button click
    $(document).on("click", ".item_type_edit", function(){


        $(this).parents("tr").find("td:first-child").each(function(){
            $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '" readonly>');
        });

        $(this).parents("tr").find("td:nth-last-child(2)").each(function(){
            $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
        });

        $(this).parents("tr").find(".item_type_add, .item_type_edit").toggle();
        $(this).parents("tr").find(".item_type_delete, .item_type_none").toggle();


    });
    // Delete row on delete button click
    $(document).on("click", ".item_type_delete", function(){

        $(this).parents("tr").find("td:first-child").each(function () {
            removeItemType($(this).text());
        });

        $(this).parents("tr").remove();

    });
});



// item source table
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    // Add row on add button click
    $(document).on("click", ".item_source_add", function(){
        var empty = false;
        var input = $(this).parents("tr").find('input');
        var select = $(this).parents("tr").find('select');
        input.each(function(){
            if(!$(this).val()){
                $(this).addClass("error");
                empty = true;
            } else{
                $(this).removeClass("error");
            }
        });

        $(this).parents("tr").find(".error").first().focus();


        if(!empty){


            var item_number = $(this).parents("tr").find('input[type="number"]').first().val();
            var item_name = $(this).parents("tr").find('input[type="text"]').first().val();
            var item_amount = $(this).parents("tr").find('input[type="number"]').last().val();
            var item_type = $(this).parents("tr").find('input[type="text"]').last().val();

            input.each(function(){
                $(this).parent("td").html($(this).val());
            });

            $(this).parents("tr").find(".item_source_add, .item_source_edit").toggle();
            $(this).parents("tr").find(".item_source_none, .item_source_delete").toggle();

            //firebase update
            updateItemSource(item_number,item_name,item_amount,item_type);

        }
    });

    // Edit row on edit button click
    $(document).on("click", ".item_source_edit", function(){


        $(this).parents("tr").find("td:first-child").each(function(){
            $(this).html('<input type="number" class="form-control" value="' + $(this).text() + '" readonly>');
        });

        $(this).parents("tr").find("td:nth-last-child(5)").each(function(){
            $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
        });


        $(this).parents("tr").find("td:nth-last-child(4)").each(function(){
            $(this).html('<input type="number" class="form-control" min="0" step=".01" value="' + $(this).text() + '">');
        });

        $(this).parents("tr").find("td:nth-last-child(3)").each(function(){
            $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
        });

        $(this).parents("tr").find(".item_source_add, .item_source_edit").toggle();
        $(this).parents("tr").find(".item_source_delete, .item_source_none").toggle();


    });
    // Delete row on delete button click
    $(document).on("click", ".item_source_delete", function(){

        $(this).parents("tr").find("td:first-child").each(function () {
            removeItemSource($(this).text());
        });

        $(this).parents("tr").remove();

    });
});

$(document).ready(function() {
    readIncomeTypeTable();
    readIncomeSourceTable();
    readItemTypeTable();
    readItemSourceTable();
    update_item_source_number();
    update_income_source_number();
    setup();
});
