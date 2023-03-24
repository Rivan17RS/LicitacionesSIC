using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.DAO;

namespace DataAccess.MAPPER
{
    public interface ICrudStatements
    {
        SqlOperation GetCreateStatement(BaseEntity entyDTO);

        SqlOperation GetUpdateStatement(BaseEntity entyDTO);

        SqlOperation GetDeleteStatement(BaseEntity entyDTO);

        SqlOperation GetRetrieveAllStatement();

        SqlOperation GetRetrieveByIDStatement(int ID);

    }
}
