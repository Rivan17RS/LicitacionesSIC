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
    public class LicitacionCrudFactory : CrudFactory
    {
        private LicitacionMapper mapper;

        public LicitacionCrudFactory() : base()
        {
            mapper = new LicitacionMapper();
            dao = SqlDao.GetInstance();
        }
        public override void Create(BaseEntity entityDto)
        {
            var sqlOper = mapper.GetCreateStatement(entityDto);
            dao.ExecuteStoreProcedure(sqlOper);
        }

        public override void Delete(BaseEntity entityDto)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>()
        {
            throw new NotImplementedException();
        }

        public override T RetrieveByID<T>(int Id)
        {
            throw new NotImplementedException();
        }

        public override T RetrieveByIdent<T>(string Id)
        {
            throw new NotImplementedException();
        }

        public override void Update(BaseEntity entityDto)
        {
            throw new NotImplementedException();
        }
    }
}
