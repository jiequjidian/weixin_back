using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MODEL;
using System.Data.SqlClient;
using System.Data;

namespace DAL
{
    public class Service{

    
     public static SqlConnection connection;
      
        public static SqlConnection Connection
        {
            get
            {
                if (connection == null)
                {
                    //远程连接数据库命令（前提远程数据库服务器已经配置好允许远程连接）
                    //string strConn = @"Data Source=172.18.72.158;Initial Catalog=WebKuangjia;User ID=sa;Password=LIwei123;Persist Security Info=True";

                    //连接本地数据库命令
                    string strConn = @"Data Source=qds106623297.my3w.com;Initial Catalog=qds106623297_db;User ID=qds106623297;Password=ysq071381061175;Persist Security Info=True";

                    connection = new SqlConnection(strConn);
                    connection.Open();
                }
                else if (connection.State == System.Data.ConnectionState.Closed)
                {
                    connection.Open();
                }
                else if (connection.State == System.Data.ConnectionState.Broken)
                {
                    connection.Close();
                    connection.Open();
                }
                return connection;
            }
        }

        //执行sql语句,返回被修改行数
        public static int ExecuteCommand(string commandText, CommandType commandType, SqlParameter[] para)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = Connection;
            cmd.CommandText = commandText;
            
            try
            {
                if (para != null)
                {
                    cmd.Parameters.AddRange(para);
                }
                return cmd.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                connection.Close();
                cmd.Dispose();
            }
        }

        //执行sql语句,返回数据库表
        public static DataTable GetDataTable(string commandText, CommandType commandType, SqlParameter[] para)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = Connection;
            cmd.CommandText = commandText;
            cmd.CommandType = commandType;
            try
            {
                if (para != null)
                {
                    cmd.Parameters.AddRange(para);
                }
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable temp = new DataTable();
                da.Fill(temp);
                return temp;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                connection.Close();
                cmd.Dispose();
            }
        }

   

        //查询数据库表
        public static DataTable Selecttable()
        {
            string sql = "select * from TESTVIEW order by id desc";
            return GetDataTable(sql, CommandType.Text, null);
        }

      
      
       


    }
}
