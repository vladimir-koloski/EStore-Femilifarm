using FemiliFarmApp.DomainModels.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace FemiliFarmApp.DomainModels
{
    public class FemiliDbContext : DbContext
    {
        public FemiliDbContext(DbContextOptions opt)
            : base(opt)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItems> CartItems { get; set; }
        protected override  void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
               .Entity<Product>()
               .ToTable("Products")
               .HasKey(p => p.Id);

            modelBuilder
                .Entity<Product>()
                .Property(p => p.Name)
                .HasMaxLength(50)
                .IsRequired();

            modelBuilder
                .Entity<Product>()
                .Property(p => p.Description)
                .HasMaxLength(100)
                .IsRequired();

            modelBuilder
                .Entity<User>()
                .ToTable("Users")
                .HasKey(u => u.Id);            

            modelBuilder
                .Entity<Cart>()
                .ToTable("Carts")
                .HasKey(x => x.Id);            

            modelBuilder
                .Entity<CartItems>()
                .ToTable("CartItems")
                .HasKey(x => x.Id);          
        }
    }
}
