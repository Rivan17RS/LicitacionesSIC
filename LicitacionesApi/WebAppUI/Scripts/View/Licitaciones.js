function Licitaciones() {

    this.initView = function () {

        this.LoadLicitacionesTable();
    }

    this.LoadLicitacionesTable() {
        var arrayColumns = [];
        arrayColumns[0] = { 'data': 'IdAnalista' };
        arrayColumns[1] = { 'data': 'Titulo' };
        arrayColumns[2] = { 'data': 'Descripcion' };
        arrayColumns[3] = { 'data': 'LugarEntrega' };
        arrayColumns[4] = { 'data': 'FechaCierreOfertas' };
        arrayColumns[5] = { 'data': 'MontoPresupuestado' };
        arrayColumns[6] = { 'data': 'Estado' };
        arrayColumns[7] = { 'data': 'DetalleLicitaciones.IdLicitacion' };
        arrayColumns[8] = { 'data': 'DetalleLicitaciones.Idproducto' };
        arrayColumns[9] = { 'data': 'DetalleLicitaciones.Cantidad' };

        alert('cargando tabla');
         
    }


}