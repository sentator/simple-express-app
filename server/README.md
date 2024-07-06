relations of entities:
one executor - many projects
one project - one executor
one project - many architects
many architects - many projects

<!-- package.json scripts -->

1. If you want to generate a migration, don't forget to provide a name:
   `NAME=your_migration_name POSTGRES_HOST=localhost npm run migration:generate`.
2. If you want start the app without docker: `POSTGRES_HOST=localhost npm run dev`.
