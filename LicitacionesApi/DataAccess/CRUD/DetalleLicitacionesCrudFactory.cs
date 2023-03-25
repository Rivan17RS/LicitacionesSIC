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
        public override void Create(BaseEntity entityDto)
        {
            throw new NotImplementedException();
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
