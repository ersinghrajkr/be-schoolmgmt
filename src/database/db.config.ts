import { DataSource } from "typeorm";
import path from "path";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "singhrajkr",
    password: "180010",
    database: "schoolmgmt",
    synchronize: false,
    logging: false,
    entities: [path.join(__dirname, "..", "/entities/../**/**.entity{.ts,.js}")],
    migrations: [/*...*/],
    migrationsTableName: "custom_migration_table",
});


export default AppDataSource;