using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DAO;
using DTO;


namespace DataAccess.CRUD
{
    public abstract class CrudFactory
    {
        protected SqlDao dao;
        public abstract void Create(BaseEntity entityDto);
        public abstract void Update(BaseEntity entityDto);
        public abstract void Delete(BaseEntity entityDto);
        public abstract List<T> RetrieveAll<T>();
        public abstract T RetrieveByID<T>(int Id);

        public abstract T RetrieveByIdent<T>(String Id);
        public abstract List<T> RetrieveByLicitacion<T>(int Id);

    }
}
