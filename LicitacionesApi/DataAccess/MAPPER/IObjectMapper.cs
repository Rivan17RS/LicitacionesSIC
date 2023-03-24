using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.MAPPER
{
    public interface IObjectMapper
    {
        BaseEntity BuildObject(Dictionary<string, object> row);

        List<BaseEntity> BuildObjects(List<Dictionary<string, object>> lstRows);
    }
}
