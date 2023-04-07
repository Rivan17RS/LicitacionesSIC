class DataTableLogic {
    constructor(tablaHTMLId, JsonTable) {

        this.tablaHTMLId = $(tablaHTMLId).DataTable();

        this.JsonTable = JsonTable;
    }

    // Crea la tabla en el HTML
    crearTabla(columnsJson, columnsTable) {
        $.each(this.JsonTable, function (index, data) {
            
        })
    }

    anadirFila(fila) {
        this.tablaHTMLId.row.add(fila).draw();
    }

    eliminarFila(row) {
        tablaHTML.row(row).remove().draw();
    }

    editarFila(row, data, id=0) {

    }
}