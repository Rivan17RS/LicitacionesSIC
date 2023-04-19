using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DAO;
using DataAccess.MAPPER;
using DTO;

namespace DataAccess.CRUD
{
    public class PremiumCrudFactory : CrudFactory
    {
        private PremiumMapper mapper;

        public PremiumMapper() : base()
        {
            mapper = new PremiumMapper();
            dao = SqlDao.GetInstance();
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


        public override void Update(BaseEntity entityDto)
        {
            var sqlOper = mapper.GetUpdateStatement(entityDto);
            dao.ExecuteStoreProcedure(sqlOper);
        }

    }
}
