using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAO
{
    public class SqlOperation
    {
        public string ProcedureName { get; set; }
        public List<SqlParameter> parameters { get; set; }

        public SqlOperation()
        {
            parameters = new List<SqlParameter>();

        }

        public void AddVarcharParam(string name, string value)
        {
            parameters.Add(new SqlParameter("@" + name, value));
        }
        public void AddIntegerParam(string name, int value)
        {
            parameters.Add(new SqlParameter("@" + name, value));
        }

        public void AddDoubleParam(string name, double value)
        {
            parameters.Add(new SqlParameter("@" + name, value));
        }
        public void AddDecimalParam(string name, decimal value)
        {
            parameters.Add(new SqlParameter("@" + name, value));
        }

        public void AddDateTimeParam(string name, DateTime value)
        {
            parameters.Add(new SqlParameter("@" + name, value));
        }

        public void AddBinaryParam(string name, byte[] value)
        {
            parameters.Add(new SqlParameter("@" + name, value));
        }

        internal void AddIntegerParam(string v, string iD)
        {
            throw new NotImplementedException();
        }

        internal void AddVarcharParam(string v, int iD)
        {
            throw new NotImplementedException();
        }
    }
}
