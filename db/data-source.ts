import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
        type: 'postgres',
        url: "postgres://postgres:123@db:5432/nest",
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
        
}; 
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;