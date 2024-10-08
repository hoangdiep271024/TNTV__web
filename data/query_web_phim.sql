-- các khu vực 
select region_name from regions;

-- phim đang chiếu 
find_films_by_type (1);

-- phim sắp chiếu 
find_films_by_type (2);

-- phim theo thang // khi click vao phim theo thang thi mac dinh nam se la nam hien tai
DELIMITER //
CREATE PROCEDURE find_films_by_month (IN x INT)
BEGIN
    select f.film_name , f.film_img , f.Release_date, fe.film_rate
    from films f
    inner join film_evaluate fe on f.film_id = fe.film_id
    WHERE MONTH(Release_date) = x and Year(Release_date) = YEAR(CURRENT_DATE);
END //
DELIMITER ;

-- phim theo thang -> nam
DELIMITER //
CREATE PROCEDURE find_films_by_month_year (IN x INT,in y int)
BEGIN
    select f.film_name , f.film_img , f.Release_date, fe.film_rate
    from films f
    inner join film_evaluate fe on f.film_id = fe.film_id
    WHERE MONTH(Release_date) = x and year(Release_date) = y;
END //
DELIMITER ;

-- phim theo thang -> nam -> the loai
DELIMITER //
CREATE PROCEDURE find_films_by_month_year_category(IN x INT,in y int,in z int)
BEGIN
    select f.film_name , f.film_img , f.Release_date, fe.film_rate
    from films f
    inner join film_evaluate fe on f.film_id = fe.film_id
    inner join category_film cf on cf.film_id = f.film_id
    WHERE MONTH(Release_date) = x and year(Release_date) = y and cf.category_id = z;
END //
DELIMITER ;

-- phim theo thang -> the loai // chua click nam thi nam cung mac dinh là thoi diem hien tai
DELIMITER //
CREATE PROCEDURE find_films_by_month_category (IN x INT,in y int)
BEGIN
    select f.film_name , f.film_img , f.Release_date, fe.film_rate
    from films f
    inner join film_evaluate fe on f.film_id = fe.film_id
    inner join category_film cf on cf.film_id = f.film_id
    WHERE MONTH(Release_date) = x and cf.category_id =y and Year(Release_date) = YEAR(CURRENT_DATE);
END //
DELIMITER ;

-- phim theo trang thai
CREATE PROCEDURE find_films_by_type(in x int)
BEGIN
    select f.film_name , f.film_img , f.Release_date, fe.film_rate
    from films f
    inner join film_evaluate fe on f.film_id = fe.film_id
    WHERE f.film_type = x;
END //
DELIMITER;



-- khi click vào chọn "phim Đang Chiếu" thì thanh thể loại mặc định là tất cả thể loại 
--thanh phổ biến và mới nhất thì sẽ mặc định là phổ biến

-- phim theo trang thai // mặc định phổ hiến // pho bien = top 16 phim co luot danh gia nhieu nhat va type = dang chieu
CREATE PROCEDURE find_films_by_type_popular()
BEGIN
    select f.film_name , f.film_img , f.Release_date, fe.film_rate, fe.sum_rate
    from films f
    inner join film_evaluate fe on f.film_id = fe.film_id
    WHERE f.film_type = 1
    ORDER BY fe.sum_rate DESC
    limit 16;
END //
DELIMITER;


-- phim theo trạng thái -> moi nhat // moi nhat = cac phim dang chieu va co thoi gian ra rap den time hien tai <= 30 
DELIMITER //
CREATE PROCEDURE find_films_by_type_new()
BEGIN
    select f.film_name , f.film_img , f.Release_date, fe.film_rate
    from films f
    inner join film_evaluate fe on f.film_id = fe.film_id
    WHERE f.film_type = 1 and DATEDIFF(CURRENT_DATE, f.Release_date) <= 30;
END //
DELIMITER ;


-- phim theo trang thái -> the loai //click chọn thể loại phim, lúc này pho biến vẫn đang đc cố định , 
CREATE PROCEDURE find_films_by_category_type_popular(in y int)
BEGIN
    select f.film_name , f.film_img , f.Release_date, fe.film_rate, fe.sum_rate
    from films f
    inner join film_evaluate fe on f.film_id = fe.film_id
    inner join category_film cf on cf.film_id = f.film_id
    WHERE cf.category_id = y and f.film_type = 1
    ORDER BY fe.sum_rate DESC
    limit 16;
END //
DELIMITER ;

-- phim theo trang thái -> the loai ->  moi nhat 
CREATE PROCEDURE find_films_by_category_type_new(IN x INT,in y int)
BEGIN
    select f.film_name , f.film_img , f.Release_date, fe.film_rate
    from films f
    inner join film_evaluate fe on f.film_id = fe.film_id
    inner join category_film cf on cf.film_id = f.film_id
    WHERE cf.category_id = y and f.film_type = x and DATEDIFF(CURRENT_DATE, f.Release_date) <= 30;
END //
DELIMITER ;

-- khi click vào "Sắp chiếu" không còn thanh chọn phổ biến và mới nhất 
Call find_films_by_type (2);
-- click chọn thể loại 
CREATE PROCEDURE find_films_by_category_type(in y int)
BEGIN
    select f.film_name , f.film_img , f.Release_date, fe.film_rate
    from films f
    inner join film_evaluate fe on f.film_id = fe.film_id
    inner join category_film cf on cf.film_id = f.film_id
    WHERE cf.category_id = y and f.film_type = 2
END //
DELIMITER ;



-- click vao khu vuc -> cum rap
DELIMITER //
CREATE PROCEDURE find_cluster_by_region(IN x INT)
BEGIN
    SELECT DISTINCT cc.cluster_id, cc.cluster_name
    FROM cinema_clusters cc
    JOIN cinemas c ON cc.cluster_id = c.cluster_id
    WHERE c.region_id = x;
END //
DELIMITER ;

-- click vao cum rap -> rap
DELIMITER //
CREATE PROCEDURE find_cluster_by_region(IN x INT,in y int)
BEGIN
    SELECT c.cinema_name
    FROM cinemas c
    JOIN cinema_clusters cc ON cc.cluster_id = c.cluster_id
    WHERE c.region_id = x and cc.cluster_id = y;
END //
DELIMITER ;



--khi click vào tên của đạo diễn 
DELIMITER //
CREATE PROCEDURE director(IN x INT)
BEGIN
    SELECT *
    FROM directors
    WHERE director_id = x;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE director_film(IN x INT)
BEGIN
    SELECT f.film_name , f.film_img , f.Release_date, fe.film_rate
    FROM films f
    inner join film_evaluate fe on f.film_id = fe.film_id
    inner join director_film df on df.film_id = f.film_id 
    WHERE director_id = x;
END //
DELIMITER ;


--khi click vào tên của dien vien
DELIMITER //
CREATE PROCEDURE actor(IN x INT)
BEGIN
    SELECT *
    FROM actors
    WHERE actor_id = x;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE actor_film(IN x INT)
BEGIN
    SELECT f.film_name , f.film_img , f.Release_date, fe.film_rate
    FROM films f
    inner join film_evaluate fe on f.film_id = fe.film_id
    inner join actor_film df on df.film_id = f.film_id 
    WHERE actor_id = x;
END //
DELIMITER ;



-- order_deatils
DELIMITER //
CREATE PROCEDURE order_deatils(IN x INT)
BEGIN
SELECT 
    'Ticket' AS TYPE,
    CONCAT(s.seat_row, s.seat_number) AS DESCRIPTION,
    st.show_time AS INFORMATION,
    t.ticket_price AS PRICE
FROM 
    tickets t
JOIN orders o ON t.order_id = o.order_id
JOIN showtimes st ON o.showtime_id = st.showtime_id
JOIN seats s ON t.seat_id = s.seat_id;
WHERE 
    t.order_id = x

UNION ALL

SELECT 
    'Popcorn' AS TYPE,
    pc.combo_name AS DESCRIPTION,
    po.combo_quantity AS INFORMATION,
    po.combo_price AS PRICE
FROM 
    popcorn_orders po
JOIN popcorn_combos pc ON po.combo_id = pc.combo_id
WHERE 
    po.order_id = x;
END //
DELIMITER ;


-- trigger 
DELIMITER //
CREATE TRIGGER update_film_evaluate
AFTER INSERT ON evaluate
FOR EACH ROW
BEGIN
    UPDATE film_evaluate
    SET sum_rate = sum_rate + 1,
        sum_star = sum_star + NEW.star,
        film_rate = (sum_star + NEW.star) / (sum_rate + 1)
    WHERE film_id = NEW.film_id;
END //
DELIMITER ;
