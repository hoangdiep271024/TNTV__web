-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: web_phim
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actor_film`
--

DROP TABLE IF EXISTS `actor_film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actor_film` (
  `film_id` int DEFAULT NULL,
  `actor_id` int DEFAULT NULL,
  KEY `film_id` (`film_id`),
  KEY `actor_id` (`actor_id`),
  CONSTRAINT `actor_film_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `films` (`film_id`),
  CONSTRAINT `actor_film_ibfk_2` FOREIGN KEY (`actor_id`) REFERENCES `actors` (`actor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actor_film`
--

LOCK TABLES `actor_film` WRITE;
/*!40000 ALTER TABLE `actor_film` DISABLE KEYS */;
/*!40000 ALTER TABLE `actor_film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actors`
--

DROP TABLE IF EXISTS `actors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actors` (
  `actor_id` int NOT NULL AUTO_INCREMENT,
  `actor_name` varchar(50) DEFAULT NULL,
  `actor_img` varchar(200) DEFAULT NULL,
  `actor_describe` text,
  PRIMARY KEY (`actor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actors`
--

LOCK TABLES `actors` WRITE;
/*!40000 ALTER TABLE `actors` DISABLE KEYS */;
/*!40000 ALTER TABLE `actors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_film`
--

DROP TABLE IF EXISTS `category_film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_film` (
  `category_id` int DEFAULT NULL,
  `film_id` int DEFAULT NULL,
  KEY `film_id` (`film_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `category_film_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `films` (`film_id`),
  CONSTRAINT `category_film_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categorys` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_film`
--

LOCK TABLES `category_film` WRITE;
/*!40000 ALTER TABLE `category_film` DISABLE KEYS */;
/*!40000 ALTER TABLE `category_film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorys`
--

DROP TABLE IF EXISTS `categorys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorys` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorys`
--

LOCK TABLES `categorys` WRITE;
/*!40000 ALTER TABLE `categorys` DISABLE KEYS */;
INSERT INTO `categorys` VALUES (1,'Kinh Dị'),(2,'Hài Kịch'),(3,'Hành Động'),(4,'Tội Phạm'),(5,'Phiêu Lưu'),(6,'Hoạt Hình'),(7,'Gia Đình'),(8,'Khoa Học Viễn Tưởng'),(9,'Bí Ẩn'),(10,'Giả Tưởng'),(11,'Lãng Mạng'),(12,'Drama'),(13,'Giật Gân');
/*!40000 ALTER TABLE `categorys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cinema_clusters`
--

DROP TABLE IF EXISTS `cinema_clusters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cinema_clusters` (
  `cluster_id` int NOT NULL AUTO_INCREMENT,
  `cluster_name` varchar(255) NOT NULL,
  PRIMARY KEY (`cluster_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cinema_clusters`
--

LOCK TABLES `cinema_clusters` WRITE;
/*!40000 ALTER TABLE `cinema_clusters` DISABLE KEYS */;
INSERT INTO `cinema_clusters` VALUES (1,'Beta Cinemas'),(2,'CGV Cinemas'),(3,'Lotte Cinemas'),(4,'Cinestar'),(5,'Mega GS Cinemas'),(6,'Dcine'),(7,'Đống Đa Cinema'),(8,'Starlight'),(9,'Rio Cinemas'),(10,'Touch Cinema'),(11,'Cinemax');
/*!40000 ALTER TABLE `cinema_clusters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cinemas`
--

DROP TABLE IF EXISTS `cinemas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cinemas` (
  `cinema_id` int NOT NULL AUTO_INCREMENT,
  `cinema_name` varchar(255) NOT NULL,
  `cluster_id` int DEFAULT NULL,
  `region_id` int DEFAULT NULL,
  `address` text,
  PRIMARY KEY (`cinema_id`),
  KEY `region_id` (`region_id`),
  KEY `cluster_id` (`cluster_id`),
  CONSTRAINT `cinemas_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `regions` (`region_id`),
  CONSTRAINT `cinemas_ibfk_2` FOREIGN KEY (`cluster_id`) REFERENCES `cinema_clusters` (`cluster_id`)
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cinemas`
--

LOCK TABLES `cinemas` WRITE;
/*!40000 ALTER TABLE `cinemas` DISABLE KEYS */;
INSERT INTO `cinemas` VALUES (1,'Beta Thanh Xuân',1,1,'Tầng hầm B1, tòa nhà Golden West, Số 2, Lê Văn Thiêm, Thanh Xuân, Hà Nội'),(2,'Beta Mỹ Đình',1,1,'Tầng hầm B1, tòa nhà Golden Palace, Đường Mễ Trì, Phường Mễ Trì, Quận Nam Từ Liêm, Hà Nội'),(3,'Beta Đan Phượng',1,1,'Tầng 2 Tòa nhà HHA, Khu Đô Thị XPHomes (Tân Tây Đô), Xã Tân Lập, Huyện Đan Phượng, TP Hà Nội'),(4,'Beta Giải Phóng',1,1,'Tầng 3, Imperial Plaza, 360 Giải Phóng, Phương Liệt, Thanh Xuân, Hà Nội'),(5,'CGV Vincom Bà Triệu',2,1,'Tầng 6, VinCom Center Hà Nội, 191 Bà Triệu, Q. Hai Bà Trưng, Tp. Hà Nội '),(6,'CGV Mipec Tower',2,1,'Tầng 5, MIPEC Tower, 229 Tây Sơn, Q. Đống Đa, Tp. Hà Nội'),(7,'CGV Hồ Gươm Plaza',2,1,'Tầng 3, TTTM Hồ Gươm Plaza, 110 Trần Phú, P. Mỗ Lao, Q. Hà Đông, Tp. Hà Nội'),(8,'CGV IPH Hà Nội',2,1,'Tầng 3, TTTM Hồ Gươm Plaza, 110 Trần Phú, P. Mỗ Lao, Q. Hà Đông, Tp. Hà Nội'),(9,'CGV Aeon Long Biên',2,1,'Tầng 4 - TTTM AEON Long Biên, Số 27 Cổ Linh, Q. Long Biên, Tp. Hà Nội'),(10,'CGV Vincom Nguyễn Chí Thanh',2,1,'Số 54A Nguyễn Chí Thanh, P. Láng Thượng, Q. Đống Đa, Tp. Hà Nội'),(11,'CGV Rice City',2,1,'Tầng 2 và 4, Tòa nhà Trung - RICE CITY Linh Đàm, Phường Hoàng Liệt, Quận Hoàng Mai, Tp. Hà Nội'),(12,'CGV Tràng Tiền Plaza',2,1,'Tràng Tiền Plaza, 24 Hai Bà Trưng, Q. Hoàn Kiếm, Tp. Hà Nội'),(13,'CGV Hà Nội Center Point',2,1,'Tầng 5 TTTM Hà Nội Centerpoint, 85 Lê Văn Lương, P. Nhân Chính, Q. Thanh Xuân, Tp. Hà Nội'),(14,'CGV Trương Định Plaza',2,1,'Tầng 5 Trương Định Plaza, 461 Trương Định, Hoàng Mai, Hà Nội'),(15,'CGV Times City',2,1,'Tầng B1, Vincom Mega Mall Times City, 458 Minh Khai, Hai Bà Trưng, Tp. Hà Nội'),(16,'CGV Vincom Royal City',2,1,'Tầng B2, TTTM Vincom Royal City, 72A Nguyễn Trãi, Q. Thanh Xuân, Tp. Hà Nội'),(17,'CGV Vincom Long Biên',2,1,'Tầng 5, TTTM Vincom Plaza Long Biên, khu đô thị Vinhomes Riverside, Phường Phúc Lợi, Q. Long Biên, Tp. Hà Nội'),(18,'CGV Machinco',2,1,'Tầng 7, Trung tâm thương mại Machinco, 10 Trần Phú, Q, Hà Đông, Hanoi City'),(19,'CGV Vincom Bắc Từ Liêm',2,1,'Tòa nhà 21B5, 234 Phạm Văn Đồng, Bắc Từ Liêm, Cổ Nhuế, Từ Liêm, Tp. Hà Nội'),(20,'CGV Xuân Diệu',2,1,'Tầng 2, Tòa nhà D’. Le Roi Soleil, số 59 Xuân Diệu, P. Quảng An, Q. Tây Hồ, Hà Nội'),(21,'CGV Vincom Metropolis Liễu Giai',2,1,'29 Liễu Giai, Q. Ba Đình, Hà Nội'),(22,'CGV Vincom Trần Duy Hưng',2,1,'Tầng 5, TTTM Vincom Center Trần Duy Hưng, Trần Duy Hưng, P. Trung Hòa, Q. Cầu Giấy, Hà Nội'),(23,'CGV Vincom Sky Lake',2,1,'Tầng 3 - TTTM Vincom Plaza Skylake, Phạm Hùng, P. Mỹ Đình 1, Q.Nam Từ Liêm, Hà Nội'),(24,'CGV Aeon Hà Đông',2,1,'Khu đô thị mới Dương Nội, Hoàng Văn Thụ, Hà Đông, Hà Nội'),(25,'CGV Vincom Ocean Park',2,1,'Tầng 4 - TTTM Vincom Ocean Park - Huyện Gia Lâm, Hà Nội'),(26,'Lotte Landmark',3,1,'Tầng 5 Keangnam Hanoi Landmark Tower, E6 Phạm Hùng, Q. Cầu Giấy, Tp. Hà Nội'),(27,'Lotte Hà Đông',3,1,'Tầng 4 Mê Linh Plaza, Tô Hiệu, Hà Đông, Tp. Hà Nội'),(28,'Lotte Thăng Long',3,1,'Tầng 3 Big C Thăng Long, 222 Trần Duy Hưng, Q Cầu Giấy, Tp. Hà Nội'),(29,'Lotte Long Biên',3,1,'Tầng 3, TTTM Savico Megamall, 7 - 9 Nguyễn Văn Linh, P. Gia Thụy, Q. Long Biên, Tp. Hà Nội'),(30,'Lotte Cinema Minh Khai',3,1,'201 Minh Khai, P.Minh Khai, Q.Hai Bà Trưng, Hà Nội'),(31,'Lotte Kosmo Tây Hồ',3,1,'Kosmo Tây Hồ, 101 Xuân La, P.Xuân Tảo, Q.Bắc Từ Liêm, Hà Nội'),(32,'Beta Quang Trung',1,2,'645 Quang Trung, Phường 11, Quận Gò Vấp, Thành phố Hồ Chí Minh'),(33,'Beta Trần Quang Khải',1,2,'Tầng 2 & 3, Toà nhà IMC, 62 Đường Trần Quang Khải, Phường Tân Định, Quận 1, TP. Hồ Chí Minh'),(34,'Beta Ung Văn Khiêm',1,2,'Tầng 1, tòa nhà PAX SKY, 26 Ung Văn Khiêm, phường 25, Quận Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam'),(35,'Cinestar Quốc Thanh',4,2,'271 Nguyễn Trãi, P. Nguyễn Cư Trinh, Q.1, Tp. Hồ Chí Minh'),(36,'Cinestar Hai Bà Trưng',4,2,'135 Hai Bà Trưng, P. Bến Nghé, Q.1, Tp. Hồ Chí Minh'),(37,'Mega GS Cao Thắng',5,2,'Lầu 6 - 7, 19 Cao Thắng, P.2, Q.3, Tp. Hồ Chí Minh'),(38,'Mega GS Lý Chính Thắng',5,2,'212 Lý Chính Thắng, phường 9, quận 3'),(39,'DCINE Bến Thành',6,2,'Số 6, Mạc Đĩnh Chi, Q.1, Tp. Hồ Chí Minh'),(40,'CGV CT Plaza',2,2,'Tầng 10, CT Plaza, 60A Trường Sơn, P.2, Q. Tân Bình, Tp. Hồ Chí Minh'),(41,'CGV Hùng Vương Plaza',2,2,'Tầng 7, Hùng Vương Plaza, 126 Hùng Vương, Q.5, Tp. Hồ Chí Minh'),(42,'CGV Crescent Mall',2,2,'Lầu 5, Crescent Mall Đại lộ Nguyễn Văn Linh, Phú Mỹ Hưng, Q.7 Tp. Hồ Chí Minh'),(43,'CGV Pandora City',2,2,'Lầu 3 Pandora city 1/1 Trường Chinh, Q. Tân Phú, Tp. Hồ Chí Minh'),(44,'CGV Aeon Tân Phú',2,2,'Lầu 3, Aeon Mall 30 Bờ Bao Tân Thắng, P. Sơn Kỳ, Q. Tân Phú, Tp. Hồ Chí Minh'),(45,'CGV Thảo Điền Pearl',2,2,'Tầng 2, Thảo Điền Mall, 12 Quốc Hương, P. Thảo Điền, Q.2, Tp. Hồ Chí Minh'),(46,'CGV Liberty Citypoint',2,2,'Tầng M-1 Liberty Center Saigon Citypoint, 59 - 61 Pasteur, Q.1, Tp. Hồ Chí Minh'),(47,'CGV Vincom Thủ Đức',2,2,'Tầng 5, TTTM Vincom Thủ Đức, 216 Võ Văn Ngân, P. Bình Thọ, Q. Thủ Đức, Tp. Hồ Chí Minh'),(48,'CGV Vivo City',2,2,'Lầu 5, TTTM SC VivoCity, 1058 Nguyễn Văn Linh, Q.7, Tp. Hồ Chí Minh'),(49,'CGV Vincom Gò Vấp',2,2,'Tầng 5 TTTM Vincom Plaza Gò Vấp, 12 Phan Văn Trị, P.7, Q. Gò Vấp, Tp. Hồ Chí Minh'),(50,'CGV Pearl Plaza',2,2,'Tầng 5, Pearl Plaza, 561A Điện Biên Phủ, P.25, Q. Bình Thạnh, Tp. Hồ Chí Minh'),(51,'CGV Hoàng Văn Thụ',2,2,'Tầng 1 và 2, Gala Center, số 415, Hoàng Văn Thụ, Phường 2, Quận Tân Bình, Tp. Hồ Chí Minh'),(52,'CGV Aeon Bình Tân',2,2,'Tầng 3, TTTM Aeon Mall Bình Tân, Số 1 đường số 17A, khu phố 11, P. Bình Trị Đông B, quận Bình Tân, TP. Hồ Chí Minh'),(53,'CGV Vincom Đồng Khởi',2,2,'Tầng 3, TTTM Vincom Center Đồng Khởi, 72 Lê Thánh Tôn & 45A Lý Tự Trọng, Quận 1, Tp. Hồ Chí Minh'),(54,'CGV Saigonres Nguyễn Xí',2,2,'Tầng 4-5, Saigonres Plaza, 79/81 Nguyễn Xí, P 26, Q Bình Thạnh, Tp. Hồ Chí Minh'),(55,'CGV Sư Vạn Hạnh',2,2,'Tầng 6, Vạn Hạnh Mall, 11 Sư Vạn Hạnh Q. 10, Tp. Hồ Chí Minh'),(56,'CGV Vincom Landmark 81',2,2,'B1, Vincom Center Landmark 81, 722 Điện Biên Phủ, P. 22, Q. Bình Thạnh, Tp. Hồ Chí Minh'),(57,'CGV Satra Củ Chi',2,2,'Tầng 3, TTTM Satra Củ Chi, Số 1239, Tỉnh Lộ 8, Ấp Thạnh An, Xã Trung An, Huyện Củ Chi, TP.HCM'),(58,'CGV Giga Mall Thủ Đức',2,2,'Tầng 6 TTTM GIGAMALL, 240-242 Phạm Văn Đồng, P. Hiệp Bình Chánh, Q. Thủ Đức, TPHCM'),(59,'CGV Lý Chí Thắng',2,2,'Tầng 3 Cao ốc Intresco Plaza - 83 Lý Chính Thắng, Phường 8, Quận 3, TPHCM'),(60,'Lotte Nam Sài Gòn',3,2,'Tầng 3 Cao ốc Intresco Plaza - 83 Lý Chính Thắng, Phường 8, Quận 3, TPHCM'),(61,'Lotte Cộng Hòa',3,2,'Tầng 4, Pico Plaza, 20 Cộng Hòa, P.12, Q. Tân Bình, Tp. Hồ Chí Minh'),(62,'Lotte Cantavil',3,2,'Tầng 7, Cantavil Premier, Xa lộ Hà Nội, P. n Phú, Q.2, TP. Hồ Chí Minh'),(63,'Lotte Phú Thọ',3,2,'Tầng 4 Lotte Mart Phú Thọ, ngã tư 3/2 và Lê Đại Hành, Q.11, Tp. Hồ Chí Minh'),(64,'Lotte Nowzone',3,2,'Tầng 5, TTTM Nowzone, 235 Nguyễn Văn Cừ, P. Nguyễn Cư Trinh, Q.1, Tp. Hồ Chí Minh'),(65,'Lotte Lotte Gò Vấp',3,2,'Tầng 3, Lotte Mart Gò Vấp, 242 Nguyễn Văn Lượng, Q.Gò Vấp, TP.HCM'),(66,'Lotte Thủ Đức',3,2,'Tầng 2, TTTM Joy Citipoint Thủ Đức, KCX Linh Trung 1, QL 1A, Tp. Hồ Chí Minh'),(67,'Lotte Ung Văn Khiêm',3,2,'Tầng Trệt, TTTM TTC Plaza, Số 26, Đường Ung Văn Khiêm, Phường 25, Quận Bình Thạnh, TP.HCM'),(68,'Lotte GodView',3,2,'Tẩng 3 TNL Plaza, 346 Bến Vân Đồn, P.1, Q.4, Tp. Hồ Chí Minh'),(69,'Lotte MoonLight Thủ Đức',3,2,'Moonlight Residences, 102 Đặng Văn Bi, Bình Thọ, Thủ Đức, Hồ Chí Minh'),(70,'Đống Đa',7,2,'890 Trần Hưng Đạo, Quận 5, Tp. Hồ Chí Minh'),(71,'Beta Empire Bình Dương',1,3,'A45/2 Lý Thường Kiệt, Khu phố 1, Phường Chánh Nghĩa, Thành phố Thủ Dầu Một, Tỉnh Bình Dương'),(72,'Beta Tân Uyên',1,3,'Tầng 4 - Trung tâm Thương mại Dịch vụ Uyên Hưng, đường số 13, KDC Thương mại Uyên Hưng, P. Uyên Hưng, TX. Tân Uyên, Bình Dương'),(73,'Cinestar Sinh Vien',4,3,'Nhà Văn hóa Sinh viên Đại học Quốc gia TP.HCM, P. Đông Hòa, tx. Dĩ An, Bình Dương'),(74,'Lotte Bình Dương',3,3,'Tầng 2, Lotte Mart Bình Dương, P. Lái Thiêu, TX. Thuận An, T.Bình Dương'),(75,'Lotte Dĩ An',3,3,'Tầng 5 TTTM Vincom Plaza Dĩ An, Số 3 DT743, KP.Thống Nhất, TX.Dĩ An, T.Bình Dương'),(76,'CGV Bình Dương Square',2,3,'Tầng 3 Bình Dương Square, Số 1 Phú Lợi, P.Phú Lợi, T.Bình Dương'),(77,'CGV Aeon Canary',2,3,'Tầng 2, AEON–Bình Dương Canary, Đại lộ Bình Dương, P. Bình Hòa, TX. Thuận An, T. Bình Dương'),(78,'Beta Biên Hòa',1,4,'Tầng 6, The Pegasus Plaza, 53-55 Võ Thị Sáu, P.Quyết Thắng, Biên Hoà, Đồng Nai.'),(79,'Beta Long Khánh',1,4,'Tầng 6, The Pegasus Plaza, 53-55 Võ Thị Sáu, P. Quyết Thắng, Biên Hoà, Đồng Nai.'),(80,'Lotte Đồng Nai',3,4,'Tầng 5 Lotte Mart Biên Hòa, Khu Thương Mại Amata, P. Long Bình, Tp. Biên Hòa'),(81,'Lotte Biên Hòa',3,4,'Tầng 05 TTTM Vincom Biên Hòa, Phạm Văn Thuận, P. Tân Mai, Tp. Biên Hòa'),(82,'CGV Coopmart Biên Hòa',2,4,'Tầng 3, Khu Siêu thị Co-op Mart 121 Phạm Văn Thuận, P. Tân Tiến Tp. Biên Hoà'),(83,'CGV BigC Đồng Nai',2,4,'Siêu thị BigC Đồng Nai, Khu phố 1, P. Long Bình Tân, Tp. Biên Hòa'),(84,'CGV Sense City',2,5,'Lầu 3, Sense City 1, Đại Lộ Hòa Bình, Q. Ninh Kiều, Tp. Cần Thơ'),(85,'CGV Vincom Hùng Vương',2,5,'Vincom Hùng Vương, 02 Hùng Vương, Q. Ninh Kiều, Tp. Cần Thơ'),(86,'CGV Vincom Xuân Khánh',2,5,'Tầng 5, Tòa nhà 209, Đường 30/04, Phường Xuân Khánh, Quận Ninh Kiều, Tp. Cần Thơ'),(87,'Lotte Cần Thơ',3,5,'Big C, Lô số 1, KDC Hưng Phú 1, P. Hưng Phú, Q. Cái Răng, Tp. Cần Thơ'),(88,'Lotte Ninh Kiều',3,5,'Tầng 3, Lotte Mart Cần Thơ, số 84 đường Mậu Thân, P. An Hòa, Q. Ninh Kiều, Tp. Cần Thơ.'),(89,'Starlight Đà Nẵng',8,6,'Tầng 4 - Tòa Nhà Nguyễn Kim, 46 Điện Biên Phủ, Quận Thanh Khê, Tp. Đà Nẵng'),(90,'Rio Đà Nẵng',9,6,'403 Tôn Đức Thắng - P. Hòa Minh - Q.Liên Chiểu - TP. Đà Nẵng'),(91,'CGV Vĩnh Trung Plaza',2,6,'255-257 đường Hùng Vương, Q. Thanh Khê, Tp. Đà Nẵng'),(92,'CGV Vincom Đã Nẵng',2,6,'Tầng 4, TTTM Vincom Đà Nẵng, Ngô Quyền, P. An Hải Bắc, Q. Sơn Trà, Tp. Đà Nẵng'),(93,'Lotte Đà Nẵng',3,6,'Tầng 5 Lotte Mart Đà Nẵng, P. Hòa Cường Bắc, Q. Hải Châu, Tp. Đà Nẵng'),(94,'Beta Nha Trang',1,7,'Số 10 Hoàng Hoa Thám, Lộc Thọ, Tp. Nha Trang'),(95,'Lotte Nha Trang',1,7,'Tầng 5 Maximark, 60 Thái Nguyên, P. Phương Sài, Tp. Nha Trang'),(96,'Lotte Nha Trang Trần Phú',3,7,'Tầng 4 Vinpearl Beachfront Condotel, 78-80 Trần Phú, Tp. Nha Trang'),(97,'CGV BigC Nha Trang',2,7,'Tầng Trệt, TTTM Big C Nha Trang, Lô số 4, đường 19/5, Khu đô thị Vĩnh Điềm Trung, Xã Vĩnh Hiệp, Tp. Nha Trang'),(98,'Cinestar Đà Lạt',4,8,'Quảng trường Lâm Viên, P.10. Tp. Đà Lạt'),(99,'Cinestar Lâm Đồng',4,8,'713 QL20, Liên Nghĩa, Đức Trọng, Lâm Đồng'),(100,'Starlight Bảo Lộc',8,8,'Số 729, Trần Phú, P. B\'Lao, Tp. Bảo Lộc, Tỉnh Lâm Đồng'),(101,'Lotte Bảo Lộc',3,8,'Tầng 3, TTTM Vincom Bảo Lộc, 83 Lê Hồng Phong, P.1, Tp. Bảo Lộc, Tỉnh Lâm Đồng'),(102,'Lotte Hạ Long',3,9,'Big C Hạ Long, KDC Cột 1, P. Hoàng Hải, Tp. Hạ Long'),(103,'CGV Vincom Hạ long',2,9,'Tầng 4, TTTM Vincom Center Hạ Long, Khu Cột Đồng Hồ, P. Bạch Đằng, Tp. Hạ Long'),(104,'CGV Vincom Móng Cái',2,9,'Tầng 3 & 4, Vincom Plaza Móng Cái, 10 Hoà Bình, P. Trần Phú, Tp. Móng Cái, Tỉnh Quảng Ninh'),(105,'CGV Vincom Cẩm Phả',2,9,'Vincom Shophouse Cẩm Phả - Quốc lộ 18, Phường Cẩm Bình, Thành phố Cẩm Phả, tỉnh Quảng Ninh'),(106,'Starlight Quy Nhơn',8,10,'Tầng 8 TTTM An Phú Thịnh, 52A Tăng Bạt Hổ, P.Lê Lợi, TP.Quy Nhơn'),(107,'DCINE Quy Nhơn',6,10,'312 Phan Bội Châu, Tp. Quy Nhơn, Bình Định'),(108,'CGV Kim Cúc Plaza',2,10,'Tầng 3, Kim Cúc Plaza (BigC Quy Nhơn) Khu Đô Thị Vũng Chua, P. Ghềnh Ráng, Tp. Quy Nhơn'),(109,'CGV Lam Sơn Square',2,11,'Tầng 4, Lam Sơn Square, 9 Lê Lợi, Tp. Vũng Tàu'),(110,'CGV Lapen Center Vũng Tàu',2,11,'Lapen Center 33A đường 30/4, Tp. Vũng Tàu'),(111,'Lotte Vũng Tàu',3,11,'Tầng 3 Lotte Mart Vũng Tàu, Đường 3/2, Tp. Vũng Tàu'),(112,'Lotte Bắc Giang',3,12,'Tầng 4, Co.opmart Bắc Giang, 51 Nguyễn Văn Cừ, P.Ngô Quyền, Tp. Bắc Giang'),(113,'Beta Bắc Giang',1,12,'Tầng 1, TTTM Big C, Xã Tân Tiến, Tp. Bắc Giang'),(114,'Starlight Buôn Mê Thuật',8,13,'Tầng 5,6 TTTM Vincom, 78 Lý Thường Kiệt, TP.Buôn Ma Thuột, Đăk Lăk'),(115,'CGV Buôn Mê Thuật',2,13,'Tầng 4 TTTM Nguyễn Kim, số 01 Nguyễn Chí Thanh, phường Tân An, thành phố Buôn Ma Thuột, tỉnh Đak Lak'),(116,'Starlight Gia Lai',8,14,'Tầng 5, tòa nhà Kim Center, 53 Quang Trung, TP. Pleiku, Gia Lai'),(117,'Touch Cinema',10,14,'212 Nguyễn Tất Thành, P. Phù Đổng, Pleiku, Gia Lai'),(118,'CGV Vincom Hải Phòng',2,15,'Tầng 4 TTTM Vincom Imperia, Số 1 Bạch Đằng, Hồng Bàng, Tp. Hải Phòng'),(119,'Lotte Hải Phòng',3,15,'Tầng 5, TTTM Vincom Lê Thánh Tông, Máy Tơ, Ngô Quyền, Tp. Hải Phòng'),(120,'Cinestar Huế',4,16,'25 Hai Bà Trưng, P. Vĩnh Ninh, Tp. Huế'),(121,'Lotte Huế',3,16,'Siêu thị Big C Huế, 181 Bà Triệu, Phú Nhuận, Tp. Huế'),(122,'Cinestar Kiên Giang',4,17,'Trung tâm Thương mại, Lô A2 - Khu 2, Nguyễn Chí Thanh, Rạch Sỏi, Tp. Rạch Giá, Kiên Giang'),(123,'CGV Vincom Rạch Giá',2,17,'Tầng 5, TTTM Vincom Plaza Kiên Giang, Lô A12, khu phố 1, đường Cô Bắc, phường Vĩnh Bảo, Tp. Rạch Giá, Kiên Giang'),(124,'Lotte Thái Bình',3,18,'Tầng 5, Vincom Thái Binh, 460 Lý Bôn, Đề Thám, Tp. Thái Bình'),(125,'Cinemax Kon Tum',11,19,'73 Lê Hồng Phong, P. Quyết Thắng, Kon Tum'),(126,'CGV Vincom Kon Tum',2,19,'Vincom Shophouse Kon Tum - 02 Phan Đình Phùng, phường Quyết Thắng, thành phố Kon Tum, Kon Tum'),(127,'Lotte Vinh',3,20,'Tầng 5, Vinh Recreation Center, số 1 Phan Bộ Châu, Lê Lợi, Tp. Vinh'),(128,'CGV Vinh Center',2,20,'Tầng 4 – TTTM Vinh Center, 69 Hồ Tùng Mậu, P. Trường Thi, TP. Vinh, Tỉnh Nghệ An, Việt Nam'),(129,'Rio Quảng Bình',9,21,'Tầng 4, Siêu thị Thái Hậu, 353 Quang Trung, Ba Đồn, Quảng Bình'),(130,'Lotte Đồng Hới',3,21,'Tầng 3, Vincom Đồng Hới, P. Hải Đình, Đồng Hới, Quảng Bình'),(131,'Rio Tam Kỳ',9,22,'Bạch Đằng, P. Phước Hoà, Tam Kỳ, Quảng Nam'),(132,'Lotte Hội An',3,22,'The Pearl Hội An, An Bàng, Cẩm An, Hội An, Quảng Nam'),(133,'DCINE Sóc Trăng',6,23,'Tầng 7, Ánh Quang Plaza, 7-9 Tôn Đức Thắng, P. 6, Tp. Sóc Trăng'),(134,'CGV Vincom Sóc Trăng',2,23,'Vincom Sóc Trăng, đường Trần Hưng Đạo, phường 2, thành phố Sóc Trăng, tỉnh Sóc Trăng'),(135,'Lotte Tây Ninh',3,24,'Tầng 3, TTC Tây Ninh, 221 Đường 30.4, P.2, Tp. Tây Ninh'),(136,'CGV Vincom Tây Ninh',2,24,'54 Đặng Ngọc Chinh, Khu phố 1, Phường 3, Tây Ninh'),(137,'Lotte Thái Nguyên',3,25,'259 Quang Trung, P. Tân Thịnh, Tp. Thái Nguyên'),(138,'CGV Vincom Thái Nguyên',2,25,'Tầng 4 , TTTM Vincom Thái Nguyên 284 Lương Ngọc Quyến, Hàng Văn Thụ, Thành phố Thái Nguyên'),(139,'Lotte Thanh Hóa',3,26,'Tầng 3, TTTM Thanh Hóa, 27 - 29 Lê Lợi, P. Lam Sơn, Tp. Thanh Hóa'),(140,'Beta Thanh Hóa',1,26,'Tầng 4, Vincom Shophouse Thanh Hóa, 27 Trần Phú, P. Điện Biên, Tp.Thanh Hóa'),(141,'Cinestar Mỹ Tho',4,27,'52, Đinh Bộ Lĩnh, Phường 3, TP. Mỹ Tho, tỉnh Tiền Giang'),(142,'CGV GO! Mỹ Tho',2,27,'Tầng 3, TTTM GO! Mỹ Tho, 545 Lê Văn Phẩm, P. 5, Tp. Mỹ Tho, Tiền Giang'),(143,'Lotte Long Xuyên',3,28,'Tầng 5 Vincom, 1 Trần Hưng Đạo, Mỹ Bình, Tp. Long Xuyên, T. An Giang'),(144,'Lotte Bắc Ninh',3,29,'Tầng 3, TTTM Vincom Bắc Ninh, Ngã 6, P.Suối Hoa, Bắc Ninh'),(145,'Lotte Phan Thiết',3,30,'Tầng 6, Lotte Mart Phan Thiết, KDC Hùng Vương I, P. Phú Thủy, Tp. Phan Thiết'),(146,'Lotte Cà Mau',3,31,'Tầng 4, TTTM Vincom Cà Mau, Lê Duẩn, P.1, Tp. Cà Mau'),(147,'CGV Vincom Cao Lãnh',2,32,'Tầng 5 – TTTM VINCOM CAO LÃNH, 02 Đường 30.04, Phường 01, TP. Cao Lãnh, Đồng Tháp'),(148,'Lotte Phủ Lý',3,33,'tầng 4, TTTM Vincom Phủ Lý, số 42, Đ.Biên Hòa, P.Minh Khai, Tp.Phủ Lý, Tỉnh Hà Nam'),(149,'CGV Vincom Hà Tĩnh',2,34,'tầng 4, TTTM Vincom Phủ Lý, số 42, Đ.Biên Hòa, P.Minh Khai, Tp.Phủ Lý, Tỉnh Hà Nam'),(150,'Lotte Hải Dương',3,35,'Tầng 4, TTTM Đỗ Gia Palace, số 158, đường Ngô Quyền, P.Thanh Bình, TP.Hải Dương, T.Hải Dương'),(151,'CGV Vincom Vị Thanh',2,36,'Tầng 4, TTTM Đỗ Gia Palace, số 158, đường Ngô Quyền, P.Thanh Bình, TP.Hải Dương, T.Hải Dương'),(152,'CGV Ecopark Hưng Yên',2,37,'Tầng 1, Tòa Lake 1, Khu căn hộ Vịnh Thủy, Khu đô thị thương mại và du lịch Văn Giang, Xã Xuân Quan, Huyện Văn Giang, Tỉnh Hưng Yên'),(153,'CGV Lạng Sơn',2,38,'Lầu 3, Vincom Lạng Sơn, P. Chi Lăng, Tp. Lạng Sơn'),(154,'Beta Lào Cai',1,39,'Tầng 2, TTTM GO Lào Cai, Đại lộ Trần Hưng Đạo, đường H1, tiểu khu đô thị 13, Phường Bắc Lệnh, Thành phố Lào Cai, Tỉnh Lào Cai, Việt Nam'),(155,'Starlight Long An',8,40,'Tầng 3 TTTM Vincom Long An, Hùng Vương, Tp. Tân An, Tỉnh Long An '),(156,'Lotte Nam Định',3,41,'Tầng 5, Tòa Nhà Nam Định Tower, 91 đường Điện Biên, P. Cửa Bắc, TP Nam Định'),(157,'Lotte Ninh Bình',3,42,'Tầng 1, Big C Ninh Bình, Trần Nhân Tông, Xã Ninh Phúc, Tp. Ninh Bình'),(158,'Lotte Phan Rang',3,43,'Tầng 3, TTTM Vincom Phan Rang Số 122 Mười Sáu Tháng Tư, Mỹ Hải, Phan Rang-Tháp Chàm, Ninh Thuận'),(159,'Lotte Việt Trì',3,44,'Tầng 5 Vincom Việt Trì, Tiên Cát, Thành phố Việt Trì, Phú Thọ'),(160,'CGV Vincom Quảng Ngãi',2,45,'Vincom Quảng Ngãi, 26 Lê Thánh Tôn, Nghĩa Chánh Nam, Tp. Quảng Ngãi'),(161,'Cinemax Quảng Trị',11,46,'150 Nguyễn Du, Phường 1, Tp. Đông Hà, Quảng Trị'),(162,'CGV Vincom Sơn La',2,47,'Tầng 3, Vincom Sơn La, Trường Chinh, P. Quyết Thắng, Sơn La'),(163,'CGV Vincom Trà Vinh',2,48,'Tầng 4, TTTM Vincom Plaza Trà Vinh, số 24 Đường Nguyễn Thị Minh Khai, Khóm 3, P. 2, Tp. Trà Vinh'),(164,'Lotte Tuyên Quang',3,49,'Tầng 3, Vincom Tuyên Quang, Đ. Quang Trung, P. Phan Thiết, Tp. Tuyên Quang'),(165,'CGV Vincom Vĩnh Long',2,50,'Tầng 4, TTTM Vincom Plaza Vĩnh Long, Số 55, đường Phạm Thái Bường, P. 4, TP. Vĩnh Long'),(166,'CGV Vincom Yên Bái',2,51,'Tầng 4, TTTM Vincom Yên Bái, Khu Bán Đảo Công Viên Yên Hòa, P. Nguyễn Thái Học, Tp. Yên Bái');
/*!40000 ALTER TABLE `cinemas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `director_film`
--

DROP TABLE IF EXISTS `director_film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `director_film` (
  `film_id` int DEFAULT NULL,
  `director_id` int DEFAULT NULL,
  KEY `film_id` (`film_id`),
  KEY `director_id` (`director_id`),
  CONSTRAINT `director_film_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `films` (`film_id`),
  CONSTRAINT `director_film_ibfk_2` FOREIGN KEY (`director_id`) REFERENCES `directors` (`director_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `director_film`
--

LOCK TABLES `director_film` WRITE;
/*!40000 ALTER TABLE `director_film` DISABLE KEYS */;
/*!40000 ALTER TABLE `director_film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `directors`
--

DROP TABLE IF EXISTS `directors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `directors` (
  `director_id` int NOT NULL AUTO_INCREMENT,
  `director_name` varchar(50) DEFAULT NULL,
  `director_img` varchar(200) DEFAULT NULL,
  `director_describe` text,
  PRIMARY KEY (`director_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directors`
--

LOCK TABLES `directors` WRITE;
/*!40000 ALTER TABLE `directors` DISABLE KEYS */;
/*!40000 ALTER TABLE `directors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluate`
--

DROP TABLE IF EXISTS `evaluate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluate` (
  `user_id` int DEFAULT NULL,
  `film_id` int DEFAULT NULL,
  `comments` varchar(200) DEFAULT NULL,
  `star` int DEFAULT NULL,
  `date_posted` date DEFAULT NULL,
  KEY `user_id` (`user_id`),
  KEY `film_id` (`film_id`),
  CONSTRAINT `evaluate_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `evaluate_ibfk_2` FOREIGN KEY (`film_id`) REFERENCES `films` (`film_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluate`
--

LOCK TABLES `evaluate` WRITE;
/*!40000 ALTER TABLE `evaluate` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `film_evaluate`
--

DROP TABLE IF EXISTS `film_evaluate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `film_evaluate` (
  `film_id` int DEFAULT NULL,
  `film_rate` float DEFAULT '0',
  `sum_rate` int DEFAULT '0',
  `sum_star` int DEFAULT '0',
  KEY `film_id` (`film_id`),
  CONSTRAINT `film_evaluate_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `films` (`film_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film_evaluate`
--

LOCK TABLES `film_evaluate` WRITE;
/*!40000 ALTER TABLE `film_evaluate` DISABLE KEYS */;
/*!40000 ALTER TABLE `film_evaluate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `films`
--

DROP TABLE IF EXISTS `films`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `films` (
  `film_id` int NOT NULL AUTO_INCREMENT,
  `film_name` varchar(200) DEFAULT NULL,
  `film_img` varchar(500) DEFAULT NULL,
  `film_trailer` varchar(200) DEFAULT NULL,
  `Release_date` date DEFAULT NULL,
  `film_describe` text,
  `age_limit` int NOT NULL,
  `duration` int NOT NULL,
  `film_type` int DEFAULT NULL,
  `country` int DEFAULT NULL,
  PRIMARY KEY (`film_id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `films`
--

LOCK TABLES `films` WRITE;
/*!40000 ALTER TABLE `films` DISABLE KEYS */;
INSERT INTO `films` VALUES (1,'CÁM','https://cdn.moveek.com/storage/media/cache/short/66e7ddfc73b0d564220537.jpg','https://www.youtube.com/watch?v=vYNEJubb_DM','2024-09-20','Câu chuyện phim là dị bản kinh dị đẫm máu lấy cảm hứng từ truyện cổ tích nổi tiếng Tấm Cám, nội dung chính của phim xoay quanh Cám - em gái cùng cha khác mẹ của Tấm đồng thời sẽ có nhiều nhân vật và chi tiết sáng tạo, gợi cảm giác vừa lạ vừa quen.',18,122,1,1),(2,'Ma Siêu Quậy','https://cdn.moveek.com/storage/media/cache/short/665d433c1ffd6670737819.jpg','https://www.youtube.com/watch?v=KU1m51DuQAo&t=3s','2024-09-06','Sau một bi kịch gia đình bất ngờ, ba thế hệ của gia đình Deetz trở về nhà ở Winter River. Vẫn bị ám ảnh bởi Beetlejuice, cuộc sống của Lydia bị đảo lộn khi cô con gái tuổi teen nổi loạn của cô, Astrid, phát hiện ra mô hình bí ẩn của thị trấn trên gác mái và cánh cổng dẫn đến Thế giới bên kia vô tình mở ra. Với những rắc rối đang diễn ra ở cả hai thế giới, chỉ là vấn đề thời gian cho đến khi ai đó gọi tên Beetlejuice ba lần và con quỷ tinh quái quay trở lại để gây ra thương hiệu hỗn loạn của riêng mình.',13,111,1,0),(3,'Xuyên Không Cải Mệnh Gia Tộc','https://cdn.moveek.com/storage/media/cache/short/66c4247cc9ac5727191863.jpg','https://youtu.be/ZW6as8KK9Sg','2024-09-06','Bộ phim hài hành động của Thái Lan về đề tài xuyên không, được đạo diễn bởi “Châu Tinh Trì Thái Lan” - Jaturong Phonboon cùng dàn diễn viên đình đám: Alek Teeradetch, Mint Ranchrawee và March Chutavuth.',16,102,1,0),(4,'Longlegs: Thảm Kịch Dị Giáo','https://cdn.moveek.com/storage/media/cache/short/66d6ba8aed577100615274.jpg','https://youtu.be/_DAnw5ll5do','2024-09-06','Theo chân một đặc vụ FBI do Maika Monroe (The Guest) thủ vai. Cô được giao cho một vụ điều tra chưa có lời giải, liên quan tới một kẻ giết người hàng loạt, được biết đến qua cách hắn để lại những dòng chữ mã hóa ở hiện trường vụ án.',18,101,1,0),(5,'DAN DA DAN: First Encounter','https://cdn.moveek.com/storage/media/cache/short/66cf5c838c792536462463.jpg','','2024-09-07','Momo Ayase là con gái của một dòng họ sở hữu linh lực còn Takakura Ken (biệt danh Okarun), bạn cùng lớp của cô là một Otaku cuồng những điều huyền bí. Sau khi được Momo cứu khỏi lũ bắt nạt, hai người đã bắt đầu trò chuyện với nhau. Momo là người tin vào ma quỷ nhưng phủ định người vũ trụ còn Okarun thì ngược lại, cậu tin rằng có người vũ trụ còn ma quỷ thì không. Để chứng minh quan điểm của nhau, cả hai đã cùng tới một bệnh viện được cho là xuất hiện UFO và một đường hầm bỏ hoang bị đồn thổi là có ma ám. Thế rồi, cả hai đã cùng gặp những chuyện phi thường, không cách nào lý giải. Momo đã thức tỉnh linh lực ẩn giấu còn Okarun thì có được sức mạnh nguyền rủa để cùng nhau đương đầu với thử thách! Một mối tình định mệnh sẽ bắt đầu sao!? Một câu chuyện thanh xuân với những trận chiến kỳ ảo sẽ bắt đầu!',10,83,1,0),(6,'Không Nói Điều Dữ','https://cdn.moveek.com/storage/media/cache/short/66dfd66209fde529524785.jpg','https://youtu.be/gvlvTwqnUVQ','2024-09-13','Một gia đình người Mỹ được mời đến nghỉ cuối tuần tại khu đất nông thôn bình dị của một gia đình người Anh thiện lành mà họ kết bạn trong kỳ nghỉ, câu chuyện bắt đầu khi kỳ nghỉ trong này mơ sớm biến thành một cơn ác mộng tâm lý kinh hoàng.',18,109,1,0),(7,'Quỷ Án','https://cdn.moveek.com/storage/media/cache/short/66ddb6106b2b2091026317.jpg','','2024-09-13','Khi Dani bị sát hại dã man tại ngôi nhà nông thôn hẻo lánh mà cô và chồng Ted đang sửa sang, mọi nghi ngờ đổ dồn lên một bệnh nhân đến từ viện tâm thần địa phương, nơi Ted là bác sĩ. Tuy nhiên nghi phạm được phát hiện đã chết. Một năm sau, Darcy, em gái mù của Dani, một nhà ngoại cảm tự xưng mang theo những món đồ nguy hiểm nhất từ bộ sưu tập bị nguyền rủa của mình đến nhà Ted để tìm ra chân tướng cái chết của chị gái.',16,98,1,0),(8,'Báo Thủ Đi Tìm Chủ','https://cdn.moveek.com/storage/media/cache/short/66c41d916d4d4583588362.jpg','','2024-09-13','Gracie, một cô chó kiêu ngạo, và Pedro, một chú mèo hoang dã, là hai \"kẻ thù không đội trời chung\" trong cùng một nhà. Cuộc cãi vã của chúng khiến cả gia đình gặp rắc rối khi chuyển nhà, và hai \"boss\" này vô tình lạc mất nhau. Hành trình tìm về nhà của Gracie và Pedro đầy hài hước và bất ngờ. Từ những thành phố xa lạ đến những cuộc gặp gỡ kỳ lạ, hai \"kẻ thù\" buộc phải hợp tác để vượt qua khó khăn. Trong khi đó, các thành viên trong gia đình cũng không ngừng tìm kiếm chúng.',5,88,1,0),(9,'Báo Thù','https://cdn.moveek.com/storage/media/cache/short/66dfd6b07da81494917072.jpg	','https://youtu.be/QoGtxH4xwIQ','2024-09-13','Soulmates Eric and Shelly are brutally murdered when the demons of her dark past catch up with them. Given the chance to save his true love by sacrificing himself, Eric sets out to seek merciless revenge on their killers, traversing the worlds of the living and the dead to put the wrong things right.',18,110,1,0),(10,'Tìm Kiếm Tài Năng Âm Phủ','https://cdn.moveek.com/storage/media/cache/short/66cff073b0aa3428187637.jpg','https://youtu.be/-iVmiqj__xE','2024-09-13','Sinh ra là một con người đã đủ khó khăn, nhưng hóa ra trở thành một hồn ma cũng không hề dễ dàng. Newbie - một hồn ma mới, kinh hoàng nhận ra rằng cô chỉ còn 28 ngày nữa cho đến khi linh hồn của cô biến mất khỏi thế giới. Makoto, một “chuyên viên ám quẻ” tiếp cận Newbie với lời đề nghị kết hợp cùng ngôi sao ma Catherine để dựng lại câu chuyện kinh dị huyền thoại về khách sạn Wang Lai. Nếu câu chuyện đủ sức hù dọa người sống thì cái tên của cô sẽ trở thành huyền thoại và linh hồn của Newbie sẽ tiếp tục được sống dưới địa ngục mà không bị tan biến vĩnh viễn.',16,110,1,0),(11,'Anh Trai Vượt Mọi Tam Tai','https://cdn.moveek.com/storage/media/cache/short/66d7dcbc92673538923175.jpg','https://youtu.be/yhnmC-UoFlc','2024-09-13','Cho Su Gwang là một thanh tra cực kỳ nóng tính, dù có tỷ lệ bắt giữ tội phạm ấn tượng nhưng anh luôn gặp khó khăn trong việc kiểm soát cơn giận của mình. Vì liên tục tấn công các nghi phạm, Cho Su Gwang bị chuyển đến đảo Jeju. Tại đây, vị thanh tra nhận nhiệm vụ truy bắt kẻ lừa đảo giỏi nhất Hàn Quốc - Kim In Hae với 7 tiền án, nổi tiếng thông minh và có khả năng “thiên biến vạn hoá” để ngụy trang hoàn hảo mọi nhân dạng. Cùng lúc đó, Kim In Hae bất ngờ dính vào vụ án mạng nghiêm trọng có liên quan đến tên trùm xã hội đen đang nhăm nhe “thôn tính” đảo Jeju. Trước tình hình nguy cấp phải “giải cứu” hòn đảo Jeju và triệt phá đường dây nguy hiểm của tên trùm xã hội đen, thanh tra Cho Su Gwang bất đắc dĩ phải hợp tác cùng nghi phạm Kim In Hae, tận dụng triệt để các kỹ năng từ phá án đến lừa đảo trên hành trình rượt đuổi vừa gay cấn vừa hài hước để có thể hoàn thành nhiệm vụ cam go.',16,110,1,0),(12,'BTS: Hành Trình Solo | Jung Kook: I Am Still','https://cdn.moveek.com/storage/media/cache/short/66e66816267dd945529628.jpg','','2024-09-18','“Tôi chỉ đi theo kim chỉ nam của riêng mình.” BTS Jung Kook - thành viên của nhóm nhạc đạt danh hiệu \"Nghệ sĩ nhạc Pop thế kỷ 21\" - đã trở thành ngôi sao toàn cầu với solo single đầu tay \"Seven\" ra mắt vào 07/2023. Liên tục đạt được thành công vang dội, Jung Kook trở thành nghệ sĩ solo châu Á đầu tiên ẵm gọn vị trí số 1 với bài hát debut trên ba bảng xếp hạng toàn cầu lớn - Billboard HOT 100, Global 200 và Global 200 trừ Mỹ - ngay sau khi phát hành. Các đĩa đơn \"Seven\", \"3D\" và \"Standing Next to You\" của anh đều lọt vào top 10 của Billboard HOT 100, giúp anh trở thành nghệ sĩ solo K-pop duy nhất đạt được thành tích này. Album \"GOLDEN\" cũng đã tạo nên lịch sử khi trụ vững trên Billboard 200 24 tuần liên tiếp. Qua các cuộc phỏng vấn độc quyền, cảnh quay hậu trường chưa từng công bố, cùng với các sân khấu đầy phấn khích, bộ phim giới thiệu hành trình kéo dài tám tháng của Jung Kook, ghi lại sự cống hiến và trưởng thành không ngừng nghỉ của anh út. Hãy cùng Jung Kook chia sẻ về sự nổi tiếng đáng kinh ngạc và những khoảnh khắc chân thành với ARMY trên toàn thế giới trong JUNG KOOK: I AM STILL.',5,94,1,0),(13,'Look Back: Liệu Ta Có Dám Nhìn Lại?','https://cdn.moveek.com/storage/media/cache/short/66c4207f78cec244375005.jpg','https://youtu.be/Psu2AC5zB6U','2024-09-20','Đây là anime được chuyển thể từ one-shot nổi tiếng của tác giả Chainsaw Man - Tatsuki Fujimoto. Look Back xoay quanh nhân vật Fujino tự tin thái quá, trong khi Kyomoto lại sống khép kín, cả hai dường như không thể khác biệt hơn, nhưng tình yêu mãnh liệt dành cho manga đã trở thành sợi dây duy nhất kết nối họ. Thế nhưng, một ngày nọ, một biến cố đã xảy ra, khiến thế giới của họ hoàn toàn thay đổi… Look Back: Liệu Ta Có Dám Nhìn Lại? là một câu chuyện trưởng thành đầy xúc động và day dứt.',13,58,1,0),(14,'Minh Hôn','https://cdn.moveek.com/storage/media/cache/short/66e668c12aa05005198863.jpg','https://youtu.be/JEaH81zjSvA','2024-09-27','Baridegi: The Abandoned Girl (Minh Hôn) diễn ra sau khi mất vợ và con gái, Won Go Myeong – một pháp sư đầy hận thù, đãphát hiện ra gã tài phiệt đứng sau cái chết gia đình ông. Với ma thuật đen, Go Myeong đã gọi hồn, triệu vong vạch trần sự thật và khiến gã tài phiệt đền mạng. Thế nhưng, mọi chuyện chỉ là khởi đầu….',18,92,1,0),(15,'Cậu Bé Cá Heo','https://cdn.moveek.com/storage/media/cache/short/66e667a965631887716128.png','https://youtu.be/ajs9yvQlEJ8','2024-09-27','Cậu Bé Cá Heo là một bộ phim hoạt hình của Thổ Nhĩ Kỳ, được thực hiện bởi đạo diễn Mohammad Kheirandish. Câu chuyện kể về một cậu bé loài người được cá heo nuôi lớn, nội dung chính của phim sẽ xoay quanh hành trình khám phá bản thân và tìm kiếm người mẹ thân thương của cậu bé cá heo.',5,85,1,0),(16,'Hắn: Ác Mộng Quỷ Dữ','https://cdn.moveek.com/storage/media/cache/short/66ef91d792c2d077044004.jpg','','2024-09-27','This Man/ Hắn: Ác Mộng Quỷ Dữ lấy bối cảnh vùng nông thôn Nhật Bản, khi hàng loạt cái chết kì lạ xảy ra. Tất cả các nạn nhân đều có điểm chung: Trước khi chết họ gặp một người đàn ông lạ mặt trong mơ. Nữ chính Yasaka cũng không ngoại lệ. Trước khi bi kịch xảy ra, cô đang sống hạnh phúc bên chồng con. Khi ngày càng nhiều người thân qua đời, cô bắt đầu sợ ngủ. Cuối cùng, cô nhìn thấy “người đàn ông” trong giấc mơ của mình. Cái kết tồi tệ nhất sắp xảy ra…',13,89,1,0),(17,'Đố Anh Còng Được Tôi','https://cdn.moveek.com/storage/media/cache/short/66e140bff0068188200976.jpg','https://youtu.be/pfTzuEr13EQ','2024-09-27','Phim ghi lại hành trình thực thi công lý của thanh tra cảnh sát Seo Do Cheol (Hwang Jung Min) đối với những kẻ lạm dụng quyền lực trong xã hội, từ đó thành công chinh phục và thoả mãn khán giả bởi màn trừng trị thích đáng cho kẻ thủ ác.',18,118,1,0),(18,'Nơi Tình Yêu Kết Thúc','https://cdn.moveek.com/storage/media/cache/short/66ed5e0215766604667464.jpg','https://youtu.be/0A3G6eAJChU','2024-09-27','Câu chuyện bắt đầu khi Lily gặp được Ryle nảy sinh tình cảm và tình cũ của cô xuất hiện. Những rạn nứt, bạo hành xuất hiện trong mối quan hệ nhưng Lily vẫn chấp nhận và níu giữ nó. Điều gì đã khiến cô chấp nhận một mối quan hệ này?',16,130,1,0),(19,'Kết Nối Tử Thần','https://cdn.moveek.com/storage/media/cache/short/66ed5eadb1e5c292802354.jpg	','','2024-09-27','Kết Nối Tử Thần kể về Hana - một game thủ chuyên nghiệp với chứng sợ không gian rộng. Cô nhận được 1 thiết bị giúp cải thiện trò chơi của mình nhưng có vẻ nó đang dần chiếm lấy tâm trí cô. Liệu những điều đáng sợ Hana gặp phải chỉ xuất hiện trong thế giới ảo?',16,89,1,0),(20,'Transformers Một','https://cdn.moveek.com/storage/media/cache/short/663458008cfa2269960147.jpg','https://youtu.be/awgISjTr5j0','2024-09-27','Câu chuyện về nguồn gốc chưa từng được hé lộ của Optimus Prime và Megatron. Hai nhân vật được biết đến như những kẻ thù truyền kiếp, nhưng cũng từng là những người anh em gắn bó, đã thay đổi vận mệnh của Cybertron mãi mãi.',13,120,1,0),(21,'Joker 2: Điên Có Đôi','https://cdn.moveek.com/storage/media/cache/short/66c421ae14a48844972400.jpg','https://youtu.be/6A9vfQ1Ixrw','2024-10-04','Joker 2: Điên Có Đôi đưa Arthur Fleck đến trại tâm thần Arkham trong khi chờ xét xử cho những tội ác của hắn với tư cách là Joker. Trong lúc vật lộn với hai bản ngã của mình, Arthur không chỉ tìm thấy tình yêu đích thực mà còn khám phá ra âm nhạc luôn tồn tại trong con người hắn.',18,138,1,0),(22,'Gã Trùm Vô Danh','https://cdn.moveek.com/storage/media/cache/short/66f5304e771c6844895700.jpg','https://youtu.be/inTDDbzRQVc','2024-10-04','Gã giang hồ mới nổi Kwon Sang-Gon trở thành một ông trùm băng đảng hùng mạnh. Tưởng chừng gã sẽ được sống quyền lực đứng trên xã hội, nhưng sự thật phũ phàng trong thế giới giang hồ khiến cuộc đời của gã trở thành địa ngục của âm mưu và phản bội.',18,110,1,0),(23,'Phép Màu Giữa Đêm Đông','https://cdn.moveek.com/storage/media/cache/short/66f520fca3f62946768022.jpg','https://youtu.be/OoXbYNurFwQ','2024-10-04','Giữa bom đạn chiến tranh năm 1942, cô bé Sara buộc phải chạy trốn và lạc mất gia đình trong một lần truy quét cộng đồng Do Thái. Nơi lằn ranh sinh tử, người đã bất chấp hiểm nguy để đưa tay về phía Sara là Julien, cậu bạn cùng lớp với một bên chân tật nguyền, người mà Sara chưa từng nhớ tên. Và như thế, trong những tháng ngày sự thù ghét lên ngôi, tấm lòng tử tế đẹp đẽ của Julien đã trở thành phép màu giữa đêm đông lạnh giá, soi sáng cuộc đời tăm tối của cô bé.',13,121,1,0),(24,'Kumanthong: Chiêu Hồn Vong Nhi','https://cdn.moveek.com/storage/media/cache/short/66f18c6e7a396517396357.jpg','https://youtu.be/LiOiK1FMiNQ','2024-10-04','Kumanthong xoay quanh câu chuyện ám ảnh của một người mẹ tên Sarah trước cái chết của con trai. Cô tìm đến vùng đất tâm linh Thái Lan, khẩn cần một thầy tu nổi tiếng sử dụng tro cốt đứa bé để tạo nên bức tượng Kumanthong. Bức tượng làm sống lại tình mẫu tử nhưng triệu hồi những oan hồn ngạ quỷ đến đoạt xác cả gia đình Sarah.',18,101,1,0),(25,'Mộ Đom Đóm','https://cdn.moveek.com/storage/media/cache/short/66f0fb067662c562666380.jpg','https://youtu.be/_klEhawRN64','2024-10-04','Bộ phim được đặt trong bối cảnh giai đoạn cuối chiến tranh thế giới thứ 2 ở Nhật, kể về câu chuyện cảm động về tình anh em của hai đứa trẻ mồ côi là Seita và Setsuko. Hai anh em mất mẹ trong một trận bom dữ dội của không quân Mỹ khi cha của chúng đang chiến đấu cho Hải quân Nhật. Hai đứa bé phải vật lộn giữa nạn đói, giữa sự thờ ơ của những người xung quanh (trong đó có cả người cô họ của mình)... Bi kịch thấm đẫm nước mắt.',5,89,1,0),(26,'Hẹn Hò Với Sát Nhân','https://cdn.moveek.com/storage/media/cache/short/66e66a3156f5e948778767.jpg','https://youtu.be/1gJHaq-sAMo','2024-10-04','Cheryl Bradshaw (Anna Kendrick thủ vai) tham gia chương trình truyền hình về hẹn hò - The Dating Game với khát khao được nổi tiếng. Tại đây, cô nàng đã gặp gỡ Rodney Alcala - tên sát nhân đội lốt một nhiếp ảnh gia lãng tử và đối đáp cực kỳ hài hước, thông minh trong chương trình hẹn hò. Quyết định kết đôi cùng Rodney Alcala, trong quá trình hẹn hò, Cheryl Bradshaw dần khám phá ra hàng loạt bí mật gây sốc được che giấu khéo léo bởi cái lốt người đàn ông hoàn hảo: đội lốt một gã sát nhân, kẻ biến thái đã chủ mưu rất nhiều vụ hiếp dâm và giết người man rợ.',16,95,1,0),(27,'Khi Bầu Trời Gặp Biển Cả Ở Giữa Là Chúng Ta','https://cdn.moveek.com/storage/media/cache/short/66ddb731d383c112653251.jpg','https://youtu.be/w0_M3vixZ_A','2024-10-04','Một ngày nọ, cô gái trẻ tên Momo (Hibiki Kitazawa) tình cờ gặp Todo (Ayumu Nakajima), một người đàn ông 40 tuổi trong quán ăn. Mối quan hệ của họ bắt đầu chớm nở sau buổi tối đầy lãng mạn. Cả hai cùng nắm tay trải qua một hành trình kỳ lạ chất chứa nhiều nỗi buồn. Mỗi người đều có một quá khứ đau thương, chạy trốn khỏi thế giới để hướng đến nơi vô định.',16,99,1,0),(28,'Nhất Quỷ Nhì Ma, Thứ Ba Takagi: Trêu Rồi Yêu','https://cdn.moveek.com/storage/media/cache/short/66f5309930ec2734157731.jpg','https://youtu.be/JeRfRVNi28w','2024-10-11','Bản điện ảnh từ loạt truyện manga cùng tên, vốn gây ấn tượng với độc giả về những trò nghịch ngợm tuổi học trò của Takagi và cậu bạn Nishikita. Lấy bối cảnh 10 năm sau khi cả hai đã trưởng thành, bộ đôi Takagi - Nishikata sẽ có màn thả thính cực ngọt cùng lời tỏ tình vụng dại hứa hẹn làm xiêu lòng khán giả ngay trên màn ảnh rộng.',12,119,1,0),(29,'Domino: Lối Thoát Cuối Cùng','https://cdn.moveek.com/storage/media/cache/short/66e17971d15d6651984713.jpg','https://youtu.be/QSuz6-7erI0','2024-10-11','Thuận Nguyễn rơi vào âm mưu của thế lực ngầm và lối thoát cuối cùng để trốn chạy sẽ là gì?',16,110,1,1),(30,'Ai Oán Trong Vườn Xuân','https://cdn.moveek.com/storage/media/cache/short/66e66b1e7db15974053364.jpg','','2024-10-11','Ai Oán Trong Vườn Xuân là bộ phim kinh dị đến từ NSX của The Medium. Phim xoay quanh So-hee, người đã mất đi gia đình hạnh phúc của mình vì cái chết đột ngột của chồng, và trải qua những điều kỳ lạ, rùng rợn sau khi đến thăm Neulbom Garden, một ngôi biệt thự nông thôn bí ẩn do chồng cô để lại.',12,91,1,0),(31,'Robot Hoang Dã','https://cdn.moveek.com/storage/media/cache/short/668b51a281c29398905955.jpg','https://youtu.be/jVgLHYdPNk0','2024-10-11','Sau một vụ đắm tàu, robot thông minh tên Roz bị mắc kẹt trên một hòn đảo hoang. Để sống sót trong môi trường khắc nghiệt, Roz gắn kết với các loài động vật trên đảo và chăm sóc một chú ngỗng con mồ côi.',5,102,1,0),(32,'Fubao Bảo Bối Của Ông','https://cdn.moveek.com/storage/media/cache/short/66fa469e85463652845862.jpg','','2024-10-11','Nhân vật chính trong bộ phim Fubao Bảo Bối Của Ông là hai người chăm sóc chính Fubao trong thời gian chú gấu này ở Hàn Quốc, đặc biệt là giai đoạn chuẩn bị và chia tay để Fubao về Trung Quốc. Song Young Kwan và Kang Cheol Won là hai người trực tiếp chăm sóc Fubao từ khi mới chào đời đến lúc chia tay xứ sở kim chi.',10,95,1,0),(33,'Bocchi The Rock! Recap Part 1','https://cdn.moveek.com/storage/media/cache/short/66fa5936e5cd8108379938.jpg','','2024-10-11','Không chỉ là âm nhạc, Bocchi The Rock Part 1 còn là câu chuyện về tình bạn, ước mơ và những hoài bão của các bạn trẻ về một thanh xuân đáng nhớ!!',5,90,1,0),(34,'Tee Yod: Quỷ Ăn Tạng 2','https://cdn.moveek.com/storage/media/cache/short/66f63056b5192810943975.jpg','https://youtu.be/yotv4REr-Zo','2024-10-18','Phần 2 Tee Yod: Quỷ Ăn Tạng hứa hẹn sẽ mang đến cơn gió sởn gai óc gấp đôi năm ngoái cho các khán giả mùa Halloween này!',18,120,1,0),(35,'CƯỜI 2','https://cdn.moveek.com/storage/media/cache/short/668b51d1ccb2a157663724.jpg','https://youtu.be/2amGX-vI3l4','2024-10-18','CƯỜI 2 ra mắt tại rạp Việt vào 18.10.2024',16,120,1,0),(36,'Tín Hiệu Cầu Cứu','https://cdn.moveek.com/storage/media/cache/short/66e66bd1702f4967556179.jpg','https://youtu.be/Tw3Aeq4yGfI','2024-10-18','Tín Hiệu Cầu Cứu theo chân cô phục vụ cocktail Frida (do Naomi Ackie thủ vai) đã phải lòng tỷ phú công nghệ tên Slater King (Channing Tatum thủ vai) và theo chân anh ta tới một hòn đảo thiên đường, với rất nhiều thú vui xa xỉ. Đời không như là mơ bởi hòn đảo thiên đường này lại là nơi dễ đến nhưng khó đi. Tỷ phú Slater King được nhiều người ngưỡng mộ lại đang che giấu một bí mật khủng khiếp. Khi bức màn bí ẩn càng được vén lên thì Frida càng gặp nhiều rắc rối, và một cuộc thanh trừng đẫm máu đã xảy ra tại hòn đảo thiên đường. Số phận của Frida sẽ đi về đâu?',12,110,1,0),(37,'Cô Dâu Hào Môn','https://cdn.moveek.com/storage/media/cache/short/66f38bf42ee8c251750488.jpg','https://youtu.be/8P5w_2oBC60','2024-10-18','Cô Dâu Hào Môn xoay quanh câu chuyện làm dâu nhà giàu tại Việt Nam',10,128,1,1),(38,'Kan Kaung','https://cdn.moveek.com/storage/media/cache/short/66f530e65de87089473032.png','','2024-10-18','Phim của Myanma, do Win Lwin Htet làm đạo diễn. Bộ phim đạt 3 giải thưởng danh giá tại SEA International Film Festival 2024 sẽ mang đến cho khán giả một câu chuyện đáng yêu về một thầy tu và một chú chó cùng song hành với nhau vượt qua những vui buồn, ganh ghét của cuộc sống xung quanh, cùng nhau tìm đến hạnh phúc của cuộc đời.',12,122,1,0),(39,'Venom: Kèo Cuối','https://cdn.moveek.com/storage/media/cache/short/665dc87501b36651649752.jpg','https://youtu.be/nfnXcjWBslk','2024-10-25','Tom Hardy sẽ tái xuất trong bom tấn Venom: The Last Dance (Venom: Kèo Cuối) và phải đối mặt với kẻ thù lớn nhất từ trước đến nay - toàn bộ chủng tộc Symbiote.',16,118,1,0),(40,'Ác Quỷ Truy Hồn','https://cdn.moveek.com/storage/media/cache/short/66f683faded3f764116144.jpg','','2024-10-25','Sau một tai nạn, cô gái trẻ Retno mất mẹ, trong khi cha cô rơi vào tình trạng hôn mê. Cô cùng chị gái mình quyết định đưa cha về chăm sóc, nhưng quãng thời gian này trở thành địa ngục với cả gia đình khi những sự kiện ghê rợn liên tiếp xảy ra. Cùng lúc đó, sự xuất hiện của người con trai ngoài giá thú của cha cô châm ngòi cho cuộc chiến tranh giành khoản thừa kế, đồng thời mở ra những bí ẩn kinh hoàng trong quá khứ.',16,102,1,0),(41,'Kẻ Trộm Mặt Trăng 4','https://cdn.moveek.com/storage/media/cache/short/66667a07e5114575607897.jpg','https://youtu.be/yWp2V6nbvVM','2024-07-05','Gru phải đối mặt với kẻ thù mới là Maxime Le Mal và Valentina đang lên kế hoạch trả thù anh, buộc gia đình anh phải lẩn trốn đi nơi khác. Bên cạnh việc đấu tranh bảo vệ gia đình, Gru đồng thời còn phải tìm ra điểm chung với thành viên mới nhất trong nhà đó là Gru Jr.',5,94,0,0),(42,'Nhà Chứa Quỷ','https://cdn.moveek.com/storage/media/cache/short/667bc56cc497d170953556.jpg','','2024-07-05','Tầng 4 tại tòa nhà nọ đã bị ngọn lửa \"nuốt chửng\" và bỏ hoang từ lâu. Tuy nhiên, những lời đồn về hồn ma váy đỏ cùng những cái chết kinh hoàng tại đây liên tục khiến cư dân sống trong cảnh khiếp sợ tột cùng.',18,83,0,0),(43,'Lốc Xoáy Tử Thần','https://cdn.moveek.com/storage/media/cache/short/668b50dbaaa8c709909761.jpg','https://youtu.be/2Mu32tTl7cI','2024-07-12','Kate Cooper, một nhà săn bão từng trải qua cơn lốc xoáy thời đại học hiện tại đang làm nhà nghiên cứu đặc điểm, hiện tượng của những cơn bão thông qua màn hình tại thành phố New York. Cô được Javi - một người bạn cũ, mời đến một vùng đồng bằng để thử nghiệm hệ thống theo dõi mới mang tính đột phá. Tại đó, cô tình cờ gặp Tyler Owens - một ngôi sao truyền thông mạng xã hội đầy sức quyến rũ, nổi tiếng với việc đăng tải những chuyến phiêu lưu săn bão nghẹt thở cùng với đoàn nhân viên ồn ào, thích thú với những sự nguy hiểm. Khi mùa bão trở nên khắc nghiệt hơn, những hiện tượng kỳ lạ chưa từng thấy trước đây dần được hé lộ. Kate, Tyler và đội nhóm của họ thấy mình bị cuốn vào hệ thống những cơn bão khó lường hội tụ tại trung tâm Oklahoma, tại đây, họ sẽ phải đối mặt với những thử thách chưa từng có để có thể sống sót.',13,123,0,0),(44,'Ôi Ma Ơi: Hồi Kết','https://cdn.moveek.com/storage/media/cache/short/667a3a4219a3b536797862.jpg','https://youtu.be/BHthGCcQGcA','2024-07-12','Ôi Ma Ơi: Hồi Kết là phần thứ 10 trong toàn loạt phim, khép lại hành trình gần hai thập kỷ chinh phục khán giả xứ Chùa Vàng. Bộ phim theo chân hành trình “bắt ma” đầy bí ẩn của hai chị em Panda, Pancake tại ngôi làng Sapayod đầy rẫy những sự việc kỳ quái. Cũng ở nơi đây, họ bắt gặp một linh hồn của cô gái ma quái mang tên Dokyaa, người ám ảnh và khiến dân làng ngày ngày sợ hãi. Liệu còn thách thức nào đang chờ đợi biệt đội trừ ma “trời ơi đất hỡi” này?',18,109,0,0),(45,'Ác Linh Trong Xác Mẹ','https://cdn.moveek.com/storage/media/cache/short/668359b91f769089415997.png','https://youtu.be/gxYeyYZmT48','2024-07-12','Sau khi liều mạng thực hiện nghi thức cấm là thiết lập giao ước với quỷ để công việc kinh doanh phát triển, bà mẹ đơn thân sau một lần phạm phải đại kỵ đã gây họa và khiến cả gia đình bị ám bởi một thế lực tâm linh vô đối. Từ đây hàng loạt bi kịch xảy ra khiến tất cả những thành viên trong gia đình gặp phải tai ương và đỉnh điểm là lúc bà mẹ bị quỷ đoạt hồn. Liệu thầy mo có trục xuất được ác linh trong xác mẹ và hóa giải nghiệp chướng?',18,93,0,0),(46,'Tín Hiệu Vũ Trụ','https://cdn.moveek.com/storage/media/cache/short/668b514860940644066048.jpg','https://youtu.be/OeFbVvqMxWs','2024-07-12','Một người sắp hết oxy dự trữ, người còn lại bị chấn thương một bên chân, cả hai sẽ sinh tồn ra sao trên hành tinh xa lạ với vô số sinh vật kỳ dị?',13,87,0,0),(47,'Xin Chào Jadoo: Đại Dương Diệu Kỳ	','	https://cdn.moveek.com/storage/media/cache/short/668638de59d8a324549968.jpg','https://youtu.be/mroWhiG7iOA','2024-07-19','Trong phiên bản điện ảnh lần này, Xin chào Jadoo tiếp tục đưa khán giả vào câu chuyện phiêu lưu độc đáo của cô bé Jadoo, lần này là hành trình khám phá thế giới đại dương kỳ thú. Loạt truyện cổ tích quen thuộc về biển cả sẽ được kể lại qua những câu chuyện siêu hài hước, thú vị của đại gia đình Choi và những người bạn của Jadoo.',5,79,0,0),(48,'Dự Án Mật: Thảm Hoạ Trên Cầu','https://cdn.moveek.com/storage/media/cache/short/66822b53957dd496994159.jpg','https://youtu.be/2jzZpoeo734','2024-07-19','Project Silence là câu chuyện về những người bị mắc kẹt trên cây cầu Sân bay đang sụp đổ trong sương mù dày đặc, cố gắng sống sót trước một mối đe dọa bất ngờ.',16,96,0,0),(49,'Bé Ma Của Anh','https://cdn.moveek.com/storage/media/cache/short/667957caceafb504849022.jpg','https://youtu.be/OpZmOLGPPpI','2024-07-19','Bé Ma Của Anh xoay quanh Joe (Sutthirak Subvijitra), chàng streamer được thừa hưởng căn dinh thự cũ kĩ nằm ở vùng ngoại ô. Số phận thật trêu ngươi khi anh phát hiện đây còn là chỗ trú ngụ của 3 vong hồn mạnh mẽ, xưa giờ chưa từng ngán ngại tay thầy pháp nào. Tuy nhiên, bằng sự nhạy bén, chàng streamer đã đưa ra quyết định rất táo bạo: biến nơi này thành điểm vui chơi cảm giác mạnh thu hút giới trẻ Gen Z. Từ đấy, tin đồn về ngôi nhà ma ảo diệu ngày càng lan xa, tỉ lệ thuận với tình cảm giữa Joe và Anong (Maylada Susri), linh hồn nàng tiểu thư xinh đẹp nhưng phải chịu cái chết tức tưởi.',16,124,0,0),(50,'Vây Hãm Trên Không','https://cdn.moveek.com/storage/media/cache/short/668f5a0d60927608874613.jpeg','https://youtu.be/BJe2KclQxgQ','2024-07-19','\"Từ giờ trở đi, chiếc máy bay này sẽ tới Triều Tiên!”. Bộ phim hành động ly kỳ dựa trên sự kiện có thật với sự tham gia của Ha Jung Woo, Yeo Jin Goo và Sung Dong Il được dựa trên một sự kiện có thật năm 1971, khi một thanh niên Hàn Quốc định cướp một chiếc máy bay chở khách khởi hành từ thành phố cảnh phía đông Sokcho bay tới Seoul. Mọi người trên chuyến bay này đều đang đặt cược mạng sống của mình!',16,100,0,0),(51,'Deadpool 3: Deadpool & Wolverine','https://cdn.moveek.com/storage/media/cache/short/66a31dd941628497036893.jpg','https://youtu.be/Cd_GvtU4KIA','2024-07-27','Wolverine hợp sức với Deadpool để đánh bại kẻ thù chung.',18,128,0,0),(52,'Phim Điện Ảnh Conan 27: Ngôi Sao 5 Cánh 1 Triệu Đô','https://cdn.moveek.com/storage/media/cache/short/669b4e8f391d8733674723.jpg','https://youtu.be/C4pG3GbhQZw','2024-08-02','Trong khi đến Hakodate tham gia một giải kiếm đạo, Conan và Heiji đụng độ siêu trộm Kaito Kid - khi hắn đang nhắm tới một thanh kiếm Nhật được cất giấu trong nhà kho của một gia đình tài phiệt. Thi thể một tay buôn vũ khí khét tiếng được phát hiện với vết chém hình chữ thập, và trùng hợp thay, \"kho báu\" mà gã truy lùng dường như cũng có liên quan mật thiết đến thanh kiếm cổ mà Kid đang nhắm tới.',13,111,0,0),(53,'Oan Hồn Báo Án','https://cdn.moveek.com/storage/media/cache/short/66a6f2c2effa7500428485.jpeg','https://youtu.be/QcuNEmEKVsE','2024-08-02','Vina: Before 7 Days / Oan Hồn Báo Án xảy ra khi lời khai và chứng cứ bị bác bỏ khiến cho cái chết thảm khốc của Vina được kết luận do tai nạn. Oan hồn của cô trở về đòi lại công bằng qua thân xác người bạn thân Linda, kẻ thủ ác thật sự sẽ được pháp luật trừng trị hay nó sẽ rơi vào quên lãng khi cô siêu thoát sau 7 ngày kết thúc đám tang?',18,100,0,0),(54,'Ba Đêm Kinh Hoàng','https://cdn.moveek.com/storage/media/cache/short/668fa6f3c8940307381384.jpg','','2024-08-02','Bà mẹ đơn thân Ji Woo, anh thợ làm tóc Jae Yoon, hành khách bí ẩn Gyeong Rae… Ba con người, ba số phận với ba cuộc đời khác nhau vô tình vướng vào hàng loạt những sự kiện bí ẩn trong đêm đen. Cũng từ đây cuộc sống vốn có của cả ba bị đảo lộn và vượt khỏi tầm kiểm soát. Rốt cuộc thế lực nào đứng đằng sau và điều khiển cuộc chơi vẫn là câu hỏi bị bỏ ngỏ và chờ đợi khán giả khám phá.',16,89,0,0),(55,'Mồ Tra Tấn','https://cdn.moveek.com/storage/media/cache/short/668f46eb7076b369645405.jpg','https://youtu.be/mf79oQvQ3FY','2024-08-02','Joko Anwar là đạo diễn đang hot rần rần trên Netflix với series kinh dị độc đáo, được ví như là một Guillermo del Toro hay Jordan Peele của Châu Á. Mồ Tra Tấn chuyển thể từ bộ phim kinh dị ngắn cùng tên của đạo diễn.',18,81,0,0),(56,'Blackpink World Tour (Khởi Nguyên Hồng) In Cinemas','https://cdn.moveek.com/storage/media/cache/short/66827f5eaa73c201044591.jpg','https://youtu.be/JcqdFiDjLKk','2024-08-07','BLACKPINK WORLD TOUR [KHỞI NGUYÊN HỒNG] in Cinemas là phiên bản chiếu rạp của tour diễn từng thiết lập hàng loạt kỷ lục, đưa BLACKPINK trở thành “Nhóm nhạc nữ có tour diễn sở hữu doanh thu cao nhất mọi thời đại”. Được ghi hình tại sân khấu biểu tượng “Hanok” thuộc trạm dừng Seoul - trạm dừng cuối cùng của tour diễn, BLACKPINK WORLD TOUR [KHỞI NGUYÊN HỒNG] in Cinemas đưa khán giả hòa mình vào bầu không khí cuồng nhiệt với những bản hit đình đám trong sự nghiệp của nhóm nhạc nữ biểu tượng Kpop thế hệ thứ 3.',13,92,0,0),(57,'Vụ Bê Bối Ánh Trăng','https://cdn.moveek.com/storage/media/cache/short/6642d50c224e8921143674.jpg','https://youtu.be/ZcBIsw6_s3E','2024-08-09','Fly Me To The Moon (Vụ Bê Bối Ánh Trăng) là dự án do Apple đồng sản xuất, lấy bối cảnh cuộc chạy đua vào vũ trụ những năm 1960. Bộ phim quy tụ dàn sao đình đình đám, nổi bật là Channing Tatum cùng Scarlett Johansson.',16,132,0,0),(58,'Tiếng Gọi Từ Địa Ngục','https://cdn.moveek.com/storage/media/cache/short/66ab3f2c22867919367925.jpg','','2024-08-09','Ebru, một nhà báo, bí mật trở thành bệnh nhân và tham gia điều tra vụ mất tích của các nữ chăm sóc viên tại một trung tâm sức khỏe tâm thần Trong quá trình phân tích một bức ảnh mà Ebru chia sẻ, Ebru và bạn của mình đã khám phá những bí ẩn lâu đời của trung tâm. Từ đây, cuộc hành trình đầy thử thách của họ bắt đầu.',16,92,0,0),(59,'Bẫy','https://cdn.moveek.com/storage/media/cache/short/66aef92986f7c935984529.jpg','https://youtu.be/jLMk6xMsvHA','2024-08-09','Phim kinh dị của đạo diễn M. Night Shyamalan. Bộ phim theo chân người bố cùng cô con gái tuổi teen tham dự một buổi concert nhạc pop, nhưng rồi nhận ra họ đang mắc kẹt trong một âm mưu tăm tối và đáng sợ.',16,105,0,0),(60,'Chạy Đua Với Tử Thần','https://cdn.moveek.com/storage/media/cache/short/6695edd74c613169492888.jpg','','2024-08-09','Nữ streamer nổi tiếng biến mất sau một sự kiện quảng cáo. Tỉnh dậy, cô phát hiện đang nằm trong chính cốp xe của mình. Mọi nỗ lực thoát ra đều vô ích nếu cô không đáp ứng yêu cầu từ tên bắt cóc. Một yêu cầu được đặt ra để cô không thể thực hiện. Liệu màn đấu trí căng não này sẽ đi về đâu?',16,90,0,0),(61,'Ma Cây','https://cdn.moveek.com/storage/media/cache/short/66a9c3a5d9d5d817100011.jpeg','https://youtu.be/77HAQ7o8Q9A','2024-08-09','Sau cái chết bi thảm của cha mẹ, cậu thiếu niên Respati (Devano Danendra) đang cố gắng phục hồi tổn thương và tìm lại sự cân bằng trong cuộc sống. Tuy nhiên, việc phải chịu đựng những cơn ác mộng kinh hoàng mỗi đêm càng khiến tinh thần của Respati bị ảnh hưởng nghiêm trọng. Song, Respati nhận ra đó không đơn thuần là ác mộng, mà cậu đang sở hữu khả năng bước vào giấc mơ của người khác và giữ được ý thức trong mộng giới.',18,112,0,0),(62,'Đẹp Trai Thấy Sai Sai','https://cdn.moveek.com/storage/media/cache/short/66ab4092261e7067687988.jpg','https://youtu.be/mpTdWZgXtUI','2024-08-09','Hai người đàn ông thô lỗ nhưng giản dị, tự xưng là Những anh chàng đẹp trai. Họ có ước mơ được sống ở vùng nông thôn và cuối cùng giấc mơ của họ đã thành hiện thực. Tuy nhiên, vào ngày đầu tiên chuyển đến ngôi nhà mới, một bí mật bị phong ấn dưới tầng hầm của họ đã được đánh thức. Từ đây gây ra một loạt những hài kịch khó đỡ.',18,101,0,0),(63,'Blue Lock The Movie: Episode Nagi','https://cdn.moveek.com/storage/media/cache/short/66adaeb173553048626203.jpg','','2024-08-14','Đừng bỏ lỡ cơ hội duy nhất được chứng kiến “Khoảnh Khắc Thiên Tài Thức Tỉnh” trong Anime Bóng Đá Điên Rồ và Mãnh Liệt Nhất trên màn ảnh rộng nhé!',5,90,0,0),(64,'Quái Vật Không Gian: Romulus','https://cdn.moveek.com/storage/media/cache/short/66ab461db9c63013081933.jpg','https://youtu.be/-9QywS_ECp8','2024-08-16','Phần phim mới nhất của thương hiệu phim quái vật gây ám ảnh nhất lịch sử điện ảnh theo chân một nhóm người khai hoang lục địa, đang tìm kiếm những gì còn sót lại trên một trạm vũ trụ bỏ hoang. Thế nhưng mọi chuyện trở thành một thảm kịch khi họ phải đối mặt với những thực thể quái vật ghê tởm nhất, và chuyến đi đầy hi vọng lại trở thành cơn ác mộng đối với tất cả mọi người.',18,118,0,0),(65,'Ma Da','https://cdn.moveek.com/storage/media/cache/short/6684d276139ad087720074.jpg','https://youtu.be/EarZ97UAnKY','2024-08-16','Phim kể về hành trình của bà Lệ, người làm nghề vớt xác người chết trên sông để đưa về với gia đình. Trong quá trình làm nghề, bà Lệ đắc tội với Ma Da, một oan hồn sống dưới sông nước thường xuyên kéo chân người để thế mạng cho mình đi đầu thai. n oán của cả hai khiến cho Ma Da bắt mất bé Nhung, con gái của bà Lệ . Bà Lệ phải nhờ đến sự giúp đỡ của những người bên cạnh để cùng nhau lên đường tìm cách cứu bé Nhung và mở ra những bí mật đằng sau oan hồn Ma Da kia.',16,95,0,1),(66,'Vũ Điệu Chiến Thắng','https://cdn.moveek.com/storage/media/cache/short/66a9b2fe78c39453435577.jpg','https://youtu.be/eUsbOZI1yo0','2024-08-16','Vào năm 1999 tại một ngôi làng nhỏ ở Geoje, Millennium Girls - đội cổ vũ được lập ra bởi Pil Sun (Hyeri) và Mi Na (Park Se Wan), hai nữ sinh “cá biệt” với niềm đam mê vũ đạo ngấm vào máu. Là tập hợp của 9 cô gái với những câu chuyện khác nhau, đội cổ vũ thời đại Y2K tham gia vào các trận bóng đá ở trường, nhảy múa ở chợ, mang niềm vui tới viện dưỡng lão, cổ vũ cho những người cha trong cuộc biểu tình giành lại công bằng cho bản thân và gia đình. Họ đã cùng nhau trưởng thành với thanh xuân thật rực rỡ.',13,120,0,0),(67,'Bí Mật Bản Nhạc Ẩn Giấu','https://cdn.moveek.com/storage/media/cache/short/66a89b13184d7004801165.jpg','https://youtu.be/hNLLuk534xY','2024-08-16','Bản remake nhẹ nhàng đậm chất Nhật Bản dựa theo bom tấn tình cảm của CHÂU KIỆT LUÂN. Bộ phim xoay quanh một cuộc gặp gỡ định mệnh của Minato, một chàng sinh viên nhạc viện trở về từ Anh và cô nàng Yukino. Cả hai bất ngờ gặp nhau trong căn phòng nhạc cũ kỹ theo sự dẫn lối từ giai điệu piano tuyệt đẹp của Yukino. Những rung cảm tình đầu dần dần chớm nở, thế nhưng Yukino luôn giữ bí mật về bản nhạc định mệnh của cả hai. Liệu tình yêu của họ có đủ sức mạnh để vượt qua những bí mật ẩn giấu?',5,115,0,0),(68,'Harold Và Cây Bút Phép Thuật','https://cdn.moveek.com/storage/media/cache/short/66c41ad3ba058964206197.jpg','https://youtu.be/sQl_D2ilbX4','2024-08-23','Cốt truyện dựa trên bộ truyện cùng tên - được xuất bản vào năm 1955. Cuốn sách của Crockett Johnson kể về Harold, một cậu bé 4 tuổi, với sức mạnh của cây bút chì màu, đã tạo ra thế giới xung quanh mình. Harold sử dụng cây bút chì màu tím kì diệu của mình để vẽ một cánh cửa dẫn vào Thế giới Thực, nơi anh và những người bạn của mình dấn thân vào một cuộc phiêu lưu mới lạ.',5,90,0,0),(69,'Âm Dương Sư 0: Khởi Nguồn','https://cdn.moveek.com/storage/media/cache/short/66b2128783a12751181872.png','','2024-08-23','Chiêm ngưỡng cuộc đại chiến chú thuật mãn nhãn nhất màn ảnh 2024 Chuyện về chàng Âm Dương sư trẻ tuổi, không màng danh lợi và con người, bị cuốn vào một âm mưu đen tối có thể huỷ diệt thế giới.',16,113,0,0),(70,'Giếng Quỷ','https://cdn.moveek.com/storage/media/cache/short/66bd80b925e64574276640.jpg','https://youtu.be/KoGw6UiOE_s','2024-08-23','Một nhà phục chế nghệ thuật vừa chớm nở đi đến một ngôi làng nhỏ của Ý để mang một bức tranh thời trung cổ trở lại vinh quang trước đây của nó. Cô ấy không biết rằng cô ấy đang đặt cuộc sống của mình vào nguy hiểm từ một lời nguyền độc ác và một con quái vật sinh ra từ huyền thoại và nỗi đau tàn bạo.',18,87,0,0),(71,'Shin Cậu Bé Bút Chì: Nhật Ký Khủng Long Của Chúng Mình','https://cdn.moveek.com/storage/media/cache/short/668fa30fa8b81007665610.jpg','https://youtu.be/vDbXjJRFgWM','2024-08-23','Nhóc Shin trở lại, chính thức gia nhập đường đua hè “Búp măng non siêu quậy” với pet mới “Siêu to Khủng Long”',5,105,0,0),(72,'Đả Nữ Báo Thù','https://cdn.moveek.com/storage/media/cache/short/66b9b717015a9213503773.jpg','https://youtu.be/9H1v566AbQU','2024-08-23','Nữ cảnh sát Ha Soo Young (Jeon Do Yeon) chấp nhận ngồi tù oan vì giao kèo về khoản đền bù kếch xù từ Andy (Ji Chang Wook). Nhưng khi cô được trả tự do, những kẻ hứa hẹn ngày xưa đều mất dạng, chỉ có cô gái bí ẩn Jung Yoon Sun (Lim Ji Yeon) đến đón cô. Bất chấp tất cả, Ha Soo Young quyết tâm tập trung vào một mục tiêu duy nhất là truy tìm sự thật, lấy lại những gì thuộc về mình!',16,115,0,0),(73,'Borderlands: Trở Lại Pandora','https://cdn.moveek.com/storage/media/cache/short/6698911a5f5be045010928.jpg','https://youtu.be/Rdo4dqBxvWk','2024-08-23','Một bộ phim truyện dựa trên trò chơi điện tử nổi tiếng lấy bối cảnh trên hành tinh hư cấu Pandora bị bỏ hoang, nơi mọi người tìm kiếm một di tích bí ẩn.',13,101,0,0),(74,'Chàng Nữ Phi Công','https://cdn.moveek.com/storage/media/cache/short/6672a665bf15f621375171.jpg','https://youtu.be/KhZHVrKTmBA','2024-08-30','Từ đỉnh cao danh vọng, hào quang cơ trưởng của Han Jung Woo (Jo Jung Seok) tắt ngỏm khi dính vào những thị phi công sở. Đứng trước thị trường tuyển dụng khó khăn, HAN Jung-woo quyết định \"nhập vai\" em gái, ứng tuyển \"nữ phi công\" với hi vọng lấy lại những gì đã mất!',13,110,0,0),(75,'Hai Muối','https://cdn.moveek.com/storage/media/cache/short/66c2c56176eb2629893638.jpg','https://youtu.be/b_jz4N451l0','2024-08-30','Muối – một cô gái mất mẹ từ khi vừa lọt lòng và lớn lên trong tình yêu thương của cha tại vùng đất xã đảo Thiềng Liềng. Bước ngoặt của hai cha con bắt đầu khi Muối trưởng thành, quyết định lên thành phố học tập và làm việc với ước mơ đổi đời để phụ giúp cha.',13,118,0,1),(76,'Làm Giàu Với Ma','https://cdn.moveek.com/storage/media/cache/short/66b1a047a14ac186965830.jpg','https://youtu.be/kKbdq0AuIog','2024-08-30','Trong Làm Giàu Với Ma, Tuấn Trần vào vai Lanh - một thanh niên lêu lổng, ngỗ ngược, dính vào cờ bạc nợ nần. Trên quãng đường chạy trốn khỏi đám giang hồ chủ nợ hung hăng, anh vô tình \"đụng\" phải ma nữ Na (Diệp Bảo Ngọc) và bị cô nàng nhờ vả giúp mình tìm gặp đứa con mà cô đã phải lìa xa từ lúc chào đời. Đổi lại, cô sẽ dùng quyền năng tâm linh để giúp anh \"làm giàu\".',16,113,0,1),(77,'Hellboy Đại Chiến Quỷ Dữ','https://cdn.moveek.com/storage/media/cache/short/66bb3d258c2fa501681746.jpg','','2024-08-30','Hellboy and a rookie BPRD agent get stranded in 1950s rural Appalachia. There, they discover a small community haunted by witches, led by a local devil with a troubling connection to Hellboys past: the Crooked Man.',16,100,0,0),(78,'200% Sói Bảnh','https://cdn.moveek.com/storage/media/cache/short/65c2e9ef3b707287931941.jpg','','2024-08-30','Freddy thuộc một gia đình người sói và cần chứng tỏ bản thân để được các bậc trưởng lão công nhận. Tình cờ phát hiện ra những cổ ngữ xưa, cậu vô tình triệu hồi sức mạnh từ một tiên nguyệt nghịch ngợm tên là Moopoo. Giờ đây, Freddy phải giúp Moopoo trở về mặt trăng và khôi phục trật tự vũ trụ.',5,98,0,0),(79,'Bố Gà Siêu Đẳng: Trận Chiến Trên Băng','https://cdn.moveek.com/storage/media/cache/short/66bd97a48a83d337806765.jpg','','2024-08-30','Một chú gấu Bắc Cực nhỏ mồ côi trốn khỏi rạp xiếc lưu động, Toto hứa sẽ đưa chú trở về môi trường sống tự nhiên. Giá như cậu biết điều đó có nghĩa là cậu phải đến Nam Cực. Với sự giúp đỡ của đội Trứng Nhỏ, họ cùng nhau vượt qua vô vàn nguy hiểm.',5,91,0,0);
/*!40000 ALTER TABLE `films` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `showtime_id` int DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `showtime_id` (`showtime_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`showtime_id`) REFERENCES `showtimes` (`showtime_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `popcorn_combos`
--

DROP TABLE IF EXISTS `popcorn_combos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `popcorn_combos` (
  `combo_id` int NOT NULL AUTO_INCREMENT,
  `combo_name` varchar(255) NOT NULL,
  `combo_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`combo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `popcorn_combos`
--

LOCK TABLES `popcorn_combos` WRITE;
/*!40000 ALTER TABLE `popcorn_combos` DISABLE KEYS */;
INSERT INTO `popcorn_combos` VALUES (1,'1 Bắp 2 Nước',129000.00),(2,'1 Bắp 1 Nước',89000.00),(3,'2 Bắp 4 Nước',212000.00);
/*!40000 ALTER TABLE `popcorn_combos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `popcorn_orders`
--

DROP TABLE IF EXISTS `popcorn_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `popcorn_orders` (
  `popcorn_order_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `combo_id` int DEFAULT NULL,
  `combo_quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`popcorn_order_id`),
  KEY `order_id` (`order_id`),
  KEY `combo_id` (`combo_id`),
  CONSTRAINT `popcorn_orders_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `popcorn_orders_ibfk_2` FOREIGN KEY (`combo_id`) REFERENCES `popcorn_combos` (`combo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `popcorn_orders`
--

LOCK TABLES `popcorn_orders` WRITE;
/*!40000 ALTER TABLE `popcorn_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `popcorn_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `region_id` int NOT NULL AUTO_INCREMENT,
  `region_name` varchar(255) NOT NULL,
  PRIMARY KEY (`region_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (1,'Hà Nội'),(2,'Tp.Hồ Chí Minh'),(3,'Bình Dương'),(4,'Đồng Nai'),(5,'Cần Thơ'),(6,'Đã Nẵng'),(7,'Khánh Hòa'),(8,'Lâm Đồng'),(9,'Quảng Ninh'),(10,'Bình Định'),(11,'Bà Rịa-Vũng Tàu'),(12,'Bắc Giang'),(13,'Đắk Lắk'),(14,'Gia Lai'),(15,'Hải Phòng'),(16,'Thừa-Thiên Huế'),(17,'Kiên Giang'),(18,'Kiên Giang'),(19,'Kon Tum'),(20,'Nghệ An'),(21,'Quảng Bình'),(22,'Quảng Nam'),(23,'Sóc Trăng'),(24,'Tây Ninh'),(25,'Thái Nguyên'),(26,'Thanh Hóa'),(27,'Tiên Giang'),(28,'An Giang'),(29,'Bắc Ninh'),(30,'Bình Thuận'),(31,'Cà Mau'),(32,'Đồng Tháp'),(33,'Hà Nam'),(34,'Hà Tĩnh'),(35,'Hải Dương'),(36,'Hậu Giang'),(37,'Hưng Yên'),(38,'Lạng Sơn'),(39,'Lào Cai'),(40,'Long An'),(41,'Nam Định'),(42,'Ninh BÌnh'),(43,'Ninh Thuận'),(44,'Phú Thọ'),(45,'Quảng Ngãi'),(46,'Quảng Trị'),(47,'Sơn La'),(48,'Trà Vinh'),(49,'Tuyên Quang'),(50,'Vĩnh Long'),(51,'Yên Bái');
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `room_name` varchar(50) NOT NULL,
  `cinema_id` int DEFAULT NULL,
  PRIMARY KEY (`room_id`),
  KEY `cinema_id` (`cinema_id`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`cinema_id`) REFERENCES `cinemas` (`cinema_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seats`
--

DROP TABLE IF EXISTS `seats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seats` (
  `seat_id` int NOT NULL AUTO_INCREMENT,
  `room_id` int DEFAULT NULL,
  `seat_row` char(1) NOT NULL,
  `seat_number` int NOT NULL,
  `seat_status` int NOT NULL DEFAULT '0',
  `seat_type` int DEFAULT NULL,
  PRIMARY KEY (`seat_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `seats_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seats`
--

LOCK TABLES `seats` WRITE;
/*!40000 ALTER TABLE `seats` DISABLE KEYS */;
/*!40000 ALTER TABLE `seats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `showtimes`
--

DROP TABLE IF EXISTS `showtimes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `showtimes` (
  `showtime_id` int NOT NULL AUTO_INCREMENT,
  `film_id` int NOT NULL,
  `room_id` int NOT NULL,
  `cinema_id` int NOT NULL,
  `show_date` date NOT NULL,
  `show_time` time NOT NULL,
  PRIMARY KEY (`showtime_id`),
  KEY `film_id` (`film_id`),
  KEY `room_id` (`room_id`),
  KEY `cinema_id` (`cinema_id`),
  CONSTRAINT `showtimes_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `films` (`film_id`),
  CONSTRAINT `showtimes_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`),
  CONSTRAINT `showtimes_ibfk_3` FOREIGN KEY (`cinema_id`) REFERENCES `cinemas` (`cinema_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `showtimes`
--

LOCK TABLES `showtimes` WRITE;
/*!40000 ALTER TABLE `showtimes` DISABLE KEYS */;
/*!40000 ALTER TABLE `showtimes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `ticket_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `seat_id` int DEFAULT NULL,
  `ticket_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`ticket_id`),
  KEY `order_id` (`order_id`),
  KEY `seat_id` (`seat_id`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`seat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_img` varchar(500) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `sex` int DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `role` int DEFAULT '0',
  `reset_token` varchar(500) DEFAULT NULL,
  `reset_token_expire` date DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'web_phim'
--

--
-- Dumping routines for database 'web_phim'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-08 11:03:26
