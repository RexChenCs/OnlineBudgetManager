$(document).ready(function() {

    // export action handler
    $(document).on("click", "#search_action", function(){
        readExportTable();
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

    readExportTable();

    $('#export_table').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });

    setup();

});

