using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MODEL;
using DAL;
using System.Data;

namespace BLL
{
    public class Manager
    {
        public static DataTable table()
        {
            return Service.Selecttable();
        }
    }
}
