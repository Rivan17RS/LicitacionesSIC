using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class AdjudicacionEmail
    {
        public string Email { get; set; }
        public int IdLicitacion { get; set; }
        public DateTime FechaAdjudicacion { get; set; }
        public DateTime FechaEntrega { get; set; }
        public string LugarEntrega { get; set; }
        public DetalleLicitaciones[] DetallesLicitaciones { get; set; }
    }
}


/* <!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Adjudicación de Licitación</title>
	<style>
		body {
			font-family: Arial, Helvetica, sans-serif;
			font-size: 16px;
			line-height: 1.6;
			color: #222222;
			background-color: #f7f7f7;
			margin: 0;
			padding: 0;
		}
		.container {
			max-width: 600px;
			margin: 0 auto;
			padding: 20px;
			background-color: #ffffff;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		}
		h1 {
			font-size: 24px;
			margin-bottom: 30px;
			text-align: center;
		}
		p {
			margin-bottom: 20px;
		}
		table {
			width: 100%;
			margin-bottom: 30px;
			border-collapse: collapse;
			border-spacing: 0;
			background-color: #ffffff;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		}
		th, td {
			padding: 10px;
			text-align: left;
			vertical-align: top;
			border-bottom: 1px solid #dddddd;
		}
		th {
			background-color: #f7f7f7;
			font-weight: bold;
		}
		.producto {
			font-weight: bold;
		}
	</style>
</head>
<body>
	<div class="container">
		<h1>Adjudicación de Licitación</h1>
		<p>Me complace informarle que su empresa ha obtenido la adjudicación de la siguiente licitación:</p>
		<table>
			<tr>
				<th>Licitación</th>
				<td>[IdLicitacion]</td>
			</tr>
			<tr>
				<th>Fecha de Adjudicación</th>
				<td>[FechaAdjudicacion]</td>
			</tr>
			<tr>
				<th>Fecha de Entrega</th>
				<td>[FechaEntrega]</td>
			</tr>
			<tr>
				<th>Lugar de Entrega</th>
				<td>[LugarEntrega]</td>
			</tr>
		</table>
		<p>Debe entregar los siguientes productos:</p>
		<table>
			<tr>
				<th>Producto</th>
				<th>Cantidad</th>
			</tr>
			[DetalleLicitaciones]
		</table>
		<p>Por favor, póngase en contacto con nosotros para coordinar los detalles de entrega.</p>
		<p>Atentamente,</p>
		<p>SIC</p>
	</div>
</body>
</html>*/