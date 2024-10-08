import connection from "../models/SQLConnection.js";

function filmInfoForAI() {
    const query = 'SELECT * FROM films';

    connection.query(query, (error, results) => {
        if (error) {
            return null;
        }

        if (results.length > 0) {
            // Tạo ra một chuỗi chứa thông tin của từng phim
            const filmTexts = results.map(film =>
                `Phim ${film.film_name}, ngày chiếu ${film.release_date}, nội dung: ${film.film_describe}, độ tuổi giới hạn: ${film.age_limit}`
            ).join('\n'); // Mỗi phim sẽ được in trên một dòng

            return filmTexts
        } else {
            return null;
        }
    });
}

export default filmInfoForAI