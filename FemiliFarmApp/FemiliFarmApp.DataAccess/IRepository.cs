using System;
using System.Collections.Generic;
using System.Text;

namespace FemiliFarmApp.DataAccess
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();
        void Insert(T entity);
        void Update(T entity);
        void Remove(T entity);

    }
}
