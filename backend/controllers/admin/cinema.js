import sequelize from "../../models/SQLConnection.js";

// [GET] /admin/films
export const index = async (req, res) => {
    // SELECT * FROM cinemas;

    // // Lọc theo trạng thái
    // const status = req.query.status;
    // let filmType = '(film_type = 1 OR film_type = 0)';

    // if(status) {
    //     if(status == "Showing") filmType = 'film_type = 1';
    //     else if(status == "Coming") filmType = 'film_type = 0';
    // }
    // // Hết lọc theo trạng thái

    // Tìm kiếm
    const keyword = req.query.keyword ? `%${req.query.keyword}%` : '%'; // Nếu không có từ khóa, tìm tất cả
    // Hết Tìm kiếm

    // Phân trang
    let limitItems = 5;
    if(req.query.limitItems) {
        limitItems = parseInt(`${req.query.limitItems}`);
    }

    let page = 1;
    if(req.query.page) {
        page = parseInt(`${req.query.page}`);
    }

    const skip = (page - 1) * limitItems;
    // Hết phân trang

    // Sắp xếp theo tiêu chí

    const sortKey = req.query.sortKey || "cinema_name";
    const sortValue = req.query.sortValue === "desc" ? "DESC" : "ASC";

    // Hết Sắp xếp theo tiêu chí

    const cinemas = await sequelize.query(
        `SELECT * FROM cinemas
        WHERE cinema_name LIKE :keyword 
        ORDER BY ${sortKey} ${sortValue}
        LIMIT :limitItems
        OFFSET :skip`,
        {
            type: sequelize.QueryTypes.SELECT,
            raw: true,
            replacements: {
                keyword,
                limitItems,
                skip,
            }
        }
    );
  
    res.json(cinemas);
};

// [GET] /admin/cinemas/detail/:cinemaId
export const detail = async (req, res) => {
    try {
        const cinemaId = parseInt(req.params.cinemaId);

        const cinemaInfo = {};
    
        cinemaInfo.cinema = await sequelize.query(`Select * from cinemas where cinemas.cinema_id = :cinemaId`,
            {
            replacements: { cinemaId },
            type: sequelize.QueryTypes.SELECT,
            }
        );

        cinemaInfo.clusters = await sequelize.query(
                            `Select cc.cluster_id,cc.cluster_name
                            from cinema_clusters as cc
                            inner join cinemas as c on cc.cluster_id = c.cluster_id
                            where c.cinema_id = :cinemaId`,
                            {
                                replacements: { cinemaId },
                                type: sequelize.QueryTypes.SELECT,
                            }
                        );

        cinemaInfo.regions = await sequelize.query(
                            `Select r.region_id,r.region_name
                            from regions as r
                            inner join cinemas as c on r.region_id = c.region_id
                            where c.cinema_id = :cinemaId`,
                            {
                                replacements: { cinemaId },
                                type: sequelize.QueryTypes.SELECT,
                            }
                        );
        
        res.json(cinemaInfo);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Not Found"
        });
    }
}

// [POST] /admin/cinemas/create
export const create = async (req, res) => {
    const { cinema_name, cluster_name, region_name, address } =  req.body;

    const countResult = await sequelize.query(
        `SELECT COUNT(*) as count FROM cinemas`,
        {
            type: sequelize.QueryTypes.SELECT,
        }
    );
    const totalCinemas = countResult[0].count;
    const cinemaId =  totalCinemas + 1;

    // Truy vấn cluster_id từ cluster_name
    const clusterInfo = await sequelize.query(
        `SELECT cluster_id FROM cinema_clusters WHERE cluster_name = :clusterName`,
        {
            replacements: {  clusterName: cluster_name },
            type: sequelize.QueryTypes.SELECT,
        }
    );
    const clusterId = clusterInfo[0].cluster_id;

    // Truy vấn region_id từ region_name
    const regionInfo = await sequelize.query(
        `SELECT region_id FROM regions WHERE region_name = :regionName`,
        {
            replacements: {  regionName: region_name },
            type: sequelize.QueryTypes.SELECT,
        }
    );
    const regionId = regionInfo[0].region_id;

    // Lưu data vào bảng cinemas
    const cinema = await sequelize.query(
        `INSERT INTO cinemas 
        VALUES (:cinemaId, :cinema_name, :clusterId, :regionId, :address)`,
        {
            replacements: { cinemaId, cinema_name, clusterId, regionId, address },

            type: sequelize.QueryTypes.INSERT,
        }
    );

    // Kiểm tra xem bản ghi có được tạo thành công không
    if (cinema) {
        res.status(201).json({
            message: "Cinema created successfully",
            cinemaId: cinema[0], // ID của bản ghi mới được tạo
        });
    } else {
        res.status(500).json({
            message: "Error creating cinema",
        });
    }
}

// [PATCH] /admin/films/edit/:cinemaId
export const edit = async (req, res) => {
    try {
        const cinemaId = parseInt(req.params.cinemaId);
  
        const { cinema_name, cluster_name, region_name, address } =  req.body;

        // Truy vấn cluster_id từ cluster_name
        const clusterInfo = await sequelize.query(
            `SELECT cluster_id FROM cinema_clusters WHERE cluster_name = :clusterName`,
            {
                replacements: {  clusterName: cluster_name },
                type: sequelize.QueryTypes.SELECT,
            }
        );
        const clusterId = clusterInfo[0].cluster_id;

        // Truy vấn region_id từ region_name
        const regionInfo = await sequelize.query(
            `SELECT region_id FROM regions WHERE region_name = :regionName`,
            {
                replacements: {  regionName: region_name },
                type: sequelize.QueryTypes.SELECT,
            }
        );
        const regionId = regionInfo[0].region_id;

        await sequelize.query(
            `UPDATE cinemas
            SET cinema_name = :cinema_name, cluster_id = :clusterId, region_id = :regionId, address = :address
            WHERE cinema_id = :cinemaId`,
            {
                replacements: { cinema_name, clusterId,  regionId, address, cinemaId },
                type: sequelize.QueryTypes.UPDATE,
            }
        )
        res.status(200).json({
            message: "Cinema updated successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Not Found",
            error: error.message
        });
    }
}

// [PATCH] /admin/cinemas/delete/:cinemaId
export const deleteItem = async (req, res) => {
    try {
        const cinemaId = req.params.id;
    
        await sequelize.query(
            `DELETE FROM cinemas WHERE cinema_id = :cinemaId`,
            {
                replacements: { cinemaId },
                type:  sequelize.QueryTypes.DELETE,
            }
        );

        res.status(200).json({
            message: "Cinema and related records deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error deleting cinema",
            error: error.message,
        });
    }
}