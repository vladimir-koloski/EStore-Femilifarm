using FemiliFarmApp.DataAccess;
using FemiliFarmApp.DomainModels;
using FemiliFarmApp.DomainModels.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace FemiliFarmApp.Services.Helpers
{
    public static class DiModule
    {
        public static IServiceCollection RegisterModule(IServiceCollection services,
                                                        string connectionString)
        //string npgSqlDatabase)
        {
            services.AddDbContext<FemiliDbContext>(x => x.UseSqlServer(connectionString));

            services.AddTransient<IRepository<Product>, ProductRepository>();
            services.AddTransient<IRepository<User>, UserRepository>();
            services.AddTransient<ICartRepository, CartRepository>();


            //services.AddDbContext<UserDbContext>(options =>
            //{
            //    options.UseNpgsql(npgSqlDatabase, o => o.SetPostgresVersion(new Version(9, 5)));
            //});

            //services.AddDefaultIdentity<User>()
            //    .AddRoles<IdentityRole>()
            //    .AddEntityFrameworkStores<UserDbContext>();


            return services;
        }
    }
}
