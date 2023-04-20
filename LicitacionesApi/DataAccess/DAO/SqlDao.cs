using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace DataAccess.DAO
{
    public class SqlDao
    {
        private string ConnectionString = string.Empty;

        private static SqlDao instance = new SqlDao();

        public SqlDao()
        {
            ConnectionString = ConfigurationManager.ConnectionStrings["LicitacionesAppDB"].ConnectionString;

            //nuguet connectionMnager, y creacion en web.config string
        }

        public static SqlDao GetInstance()
        {
            if (instance == null)
                instance = new SqlDao();
            return instance;

        }

        public void ExecuteStoreProcedure(SqlOperation operation)
        {
            using(var connection = new SqlConnection(ConnectionString))
            {
                var command = new SqlCommand();

                command.Connection = connection;
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = operation.ProcedureName;

                foreach (var p in operation.parameters)
                {
                    command.Parameters.Add(p);
                }

                connection.Open();

                command.ExecuteNonQuery();
            }
           
        }

        public List<Dictionary<string, object>> ExecuteQueryProcedureWithQuery(SqlOperation operation)
        {
            List<Dictionary<string, Object>> lstResults = new List<Dictionary<string, Object>>();


            using (var connection = new SqlConnection(ConnectionString))
            {

                connection.Open();

                var command = new SqlCommand();

                command.Connection = connection;
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = operation.ProcedureName;

                foreach (var p in operation.parameters)
                {
                    command.Parameters.Add(p);
                }


                //Ejecuta el SP en la base de datos
                //Nos devuelve que tenemos que procesar para mostrar en pantalla
                var reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        var dicc = new Dictionary<string, object>();
                        // se recorre el dataset y se obtiene un diccionario por cada linea de datos
                        for (var fieldCounter = 0; fieldCounter < reader.FieldCount; fieldCounter++)
                        {
                            dicc.Add(reader.GetName(fieldCounter), reader.GetValue(fieldCounter));
                        }
                        //Se agrega a la lista
                        lstResults.Add(dicc);
                    }
                }
                return lstResults;
            }
        }
    }
}
