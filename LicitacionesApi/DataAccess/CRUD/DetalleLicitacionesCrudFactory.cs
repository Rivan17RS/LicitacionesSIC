using DataAccess.DAO;
using DataAccess.MAPPER;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.CRUD
{
    public class DetalleLicitacionesCrudFactory : CrudFactory
    {
        private DetalleLicitacionesMapper mapper;

        public DetalleLicitacionesCrudFactory() : base()
        {
            mapper = new DetalleLicitacionesMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseEntity entityDto)
        {
            var sqlOper = mapper.GetCreateStatement(entityDto);
            dao.ExecuteStoreProcedure(sqlOper);
        }

        public override void Delete(BaseEntity entityDto)
        {
            var sqlOper = mapper.GetDeleteStatement(entityDto);
            dao.ExecuteStoreProcedure(sqlOper);
        }

        public override List<T> RetrieveAll<T>()
        {
            var lstResult = new List<T>();
            var dataResult = dao.ExecuteQueryProcedureWithQuery(mapper.GetRetrieveAllStatement());
            if (dataResult.Count > 0)
            {
                var objPO = mapper.BuildObjects(dataResult);
                foreach (var po in objPO)
                {
                    lstResult.Add((T)Convert.ChangeType(po, typeof(T)));
                }
            }
            return lstResult;
        }

        public override T RetrieveByID<T>(int Id)
        {
            var data = dao.ExecuteQueryProcedureWithQuery(mapper.GetRetrieveByIDStatement(Id));
            if (data.Count > 0)
            {
                var Obj = mapper.BuildObject(data[0]);
                return (T)Convert.ChangeType(Obj, typeof(T));
            }
            return default(T);
        }

        public override T RetrieveByIdent<T>(string Id)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveByLicitacion<T>(int Id)
        {
            var lstResult = new List<T>();
            var dataResult = dao.ExecuteQueryProcedureWithQuery(mapper.GetRetrieveByIDLicStatement(Id));
            if (dataResult.Count > 0)
            {
                var objPO = mapper.BuildObjects(dataResult);
                foreach (var po in objPO)
                {
                    lstResult.Add((T)Convert.ChangeType(po, typeof(T)));
                }
            }
            return lstResult;
        }

        public override void Update(BaseEntity entityDto)
        {
            var sqlOper = mapper.GetUpdateStatement(entityDto);
            dao.ExecuteStoreProcedure(sqlOper);
        }
    }
}