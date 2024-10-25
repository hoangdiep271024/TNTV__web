import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'web_phim', // Tên database
    'root', // username
    'Toiladat@1', // password
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3307
    }
);

sequelize.authenticate().then(() => {
    console.log('Kết nối DB thành công');
}).catch((error) => {
    console.error('Kết nối DB thất bại: ', error);
});

export default sequelize;