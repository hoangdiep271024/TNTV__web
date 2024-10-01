CREATE DATABASE  IF NOT EXISTS `web_phim` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `web_phim`;
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
INSERT INTO `cinemas` VALUES (1,'Beta Thanh Xuân',1,1),(2,'Beta Mỹ Đình',1,1),(3,'Beta Đan Phượng',1,1),(4,'Beta Giải Phóng',1,1),(5,'CGV Vincom Bà Triệu',2,1),(6,'CGV Mipec Tower',2,1),(7,'CGV Hồ Gươm Plaza',2,1),(8,'CGV IPH Hà Nội',2,1),(9,'CGV Aeon Long Biên',2,1),(10,'CGV Vincom Nguyễn Chí Thanh',2,1),(11,'CGV Rice City',2,1),(12,'CGV Tràng Tiền Plaza',2,1),(13,'CGV Hà Nội Center Point',2,1),(14,'CGV Trương Định Plaza',2,1),(15,'CGV Times City',2,1),(16,'CGV Vincom Royal City',2,1),(17,'CGV Vincom Long Biên',2,1),(18,'CGV Machinco',2,1),(19,'CGV Vincom Bắc Từ Liêm',2,1),(20,'CGV Xuân Diệu',2,1),(21,'CGV Vincom Metropolis Liễu Giai',2,1),(22,'CGV Vincom Trần Duy Hưng',2,1),(23,'CGV Vincom Sky Lake',2,1),(24,'CGV Aeon Hà Đông',2,1),(25,'CGV Vincom Ocean Park',2,1),(26,'Lotte Landmark',3,1),(27,'Lotte Hà Đông',3,1),(28,'Lotte Thăng Long',3,1),(29,'Lotte Long Biên',3,1),(30,'Lotte Cinema Minh Khai',3,1),(31,'Lotte Kosmo Tây Hồ',3,1),(32,'Beta Quang Trung',1,2),(33,'Beta Trần Quang Khải',1,2),(34,'Beta Ung Văn Khiêm',1,2),(35,'Cinestar Quốc Thanh',4,2),(36,'Cinestar Hai Bà Trưng',4,2),(37,'Mega GS Cao Thắng',5,2),(38,'Mega GS Lý Chính Thắng',5,2),(39,'DCINE Bến Thành',6,2),(40,'CGV CT Plaza',2,2),(41,'CGV Hùng Vương Plaza',2,2),(42,'CGV Crescent Mall',2,2),(43,'CGV Pandora City',2,2),(44,'CGV Aeon Tân Phú',2,2),(45,'CGV Thảo Điền Pearl',2,2),(46,'CGV Liberty Citypoint',2,2),(47,'CGV Vincom Thủ Đức',2,2),(48,'CGV Vivo City',2,2),(49,'CGV Vincom Gò Vấp',2,2),(50,'CGV Pearl Plaza',2,2),(51,'CGV Hoàng Văn Thụ',2,2),(52,'CGV Aeon Bình Tân',2,2),(53,'CGV Vincom Đồng Khởi',2,2),(54,'CGV Saigonres Nguyễn Xí',2,2),(55,'CGV Sư Vạn Hạnh',2,2),(56,'CGV Vincom Landmark 81',2,2),(57,'CGV Satra Củ Chi',2,2),(58,'CGV Giga Mall Thủ Đức',2,2),(59,'CGV Lý Chí Thắng',2,2),(60,'Lotte Nam Sài Gòn',3,2),(61,'Lotte Cộng Hòa',3,2),(62,'Lotte Cantavil',3,2),(63,'Lotte Phú Thọ',3,2),(64,'Lotte Nowzone',3,2),(65,'Lotte Lotte Gò Vấp',3,2),(66,'Lotte Thủ Đức',3,2),(67,'Lotte Ung Văn Khiêm',3,2),(68,'Lotte GodView',3,2),(69,'Lotte MoonLight Thủ Đức',3,2),(70,'Đống Đa',7,2),(71,'Beta Empire Bình Dương',1,3),(72,'Beta Tân Uyên',1,3),(73,'Cinestar Sinh Vien',4,3),(74,'Lotte Bình Dương',3,3),(75,'Lotte Dĩ An',3,3),(76,'CGV Bình Dương Square',2,3),(77,'CGV Aeon Canary',2,3),(78,'Beta Biên Hòa',1,4),(79,'Beta Long Khánh',1,4),(80,'Lotte Đồng Nai',3,4),(81,'Lotte Biên Hòa',3,4),(82,'CGV Coopmart Biên Hòa',2,4),(83,'CGV BigC Đồng Nai',2,4),(84,'CGV Sense City',2,5),(85,'CGV Vincom Hùng Vương',2,5),(86,'CGV Vincom Xuân Khánh',2,5),(87,'Lotte Cần Thơ',3,5),(88,'Lotte Ninh Kiều',3,5),(89,'Starlight Đà Nẵng',8,6),(90,'Rio Đà Nẵng',9,6),(91,'CGV Vĩnh Trung Plaza',2,6),(92,'CGV Vincom Đã Nẵng',2,6),(93,'Lotte Đà Nẵng',3,6),(94,'Beta Nha Trang',1,7),(95,'Lotte Nha Trang',1,7),(96,'Lotte Nha Trang Trần Phú',3,7),(97,'CGV BigC Nha Trang',2,7),(98,'Cinestar Đà Lạt',4,8),(99,'Cinestar Lâm Đồng',4,8),(100,'Starlight Bảo Lộc',8,8),(101,'Lotte Bảo Lộc',3,8),(102,'Lotte Hạ Long',3,9),(103,'CGV Vincom Hạ long',2,9),(104,'CGV Vincom Móng Cái',2,9),(105,'CGV Vincom Cẩm Phả',2,9),(106,'Starlight Quy Nhơn',8,10),(107,'DCINE Quy Nhơn',6,10),(108,'CGV Kim Cúc Plaza',2,10),(109,'CGV Lam Sơn Square',2,11),(110,'CGV Lapen Center Vũng Tàu',2,11),(111,'Lotte Vũng Tàu',3,11),(112,'Lotte Bắc Giang',3,12),(113,'Beta Bắc Giang',1,12),(114,'Starlight Buôn Mê Thuật',8,13),(115,'CGV Buôn Mê Thuật',2,13),(116,'Starlight Gia Lai',8,14),(117,'Touch Cinema',10,14),(118,'CGV Vincom Hải Phòng',2,15),(119,'Lotte Hải Phòng',3,15),(120,'Cinestar Huế',4,16),(121,'Lotte Huế',3,16),(122,'Cinestar Kiên Giang',4,17),(123,'CGV Vincom Rạch Giá',2,17),(124,'Lotte Thái Bình',3,18),(125,'Cinemax Kon Tum',11,19),(126,'CGV Vincom Kon Tum',2,19),(127,'Lotte Vinh',3,20),(128,'CGV Vinh Center',2,20),(129,'Rio Quảng Bình',9,21),(130,'Lotte Đồng Hới',3,21),(131,'Rio Tam Kỳ',9,22),(132,'Lotte Hội An',3,22),(133,'DCINE Sóc Trăng',6,23),(134,'CGV Vincom Sóc Trăng',2,23),(135,'Lotte Tây Ninh',3,24),(136,'CGV Vincom Tây Ninh',2,24),(137,'Lotte Thái Nguyên',3,25),(138,'CGV Vincom Thái Nguyên',2,25),(139,'Lotte Thanh Hóa',3,26),(140,'Beta Thanh Hóa',1,26),(141,'Cinestar Mỹ Tho',4,27),(142,'CGV GO! Mỹ Tho',2,27),(143,'Lotte Long Xuyên',3,28),(144,'Lotte Bắc Ninh',3,29),(145,'Lotte Phan Thiết',3,30),(146,'Lotte Cà Mau',3,31),(147,'CGV Vincom Cao Lãnh',2,32),(148,'Lotte Phủ Lý',3,33),(149,'CGV Vincom Hà Tĩnh',2,34),(150,'Lotte Hải Dương',3,35),(151,'CGV Vincom Vị Thanh',2,36),(152,'CGV Ecopark Hưng Yên',2,37),(153,'CGV Lạng Sơn',2,38),(154,'Beta Lào Cai',1,39),(155,'Starlight Long An',8,40),(156,'Lotte Nam Định',3,41),(157,'Lotte Ninh Bình',3,42),(158,'Lotte Phan Rang',3,43),(159,'Lotte Việt Trì',3,44),(160,'CGV Vincom Quảng Ngãi',2,45),(161,'Cinemax Quảng Trị',11,46),(162,'CGV Vincom Sơn La',2,47),(163,'CGV Vincom Trà Vinh',2,48),(164,'Lotte Tuyên Quang',3,49),(165,'CGV Vincom Vĩnh Long',2,50),(166,'CGV Vincom Yên Bái',2,51);
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
  `film_name` varchar(50) DEFAULT NULL,
  `film_img` varchar(500) DEFAULT NULL,
  `film_trailer` varchar(200) DEFAULT NULL,
  `Release_date` date DEFAULT NULL,
  `film_describe` text,
  `age_limit` int NOT NULL,
  `duration` int NOT NULL,
  `film_type` int DEFAULT NULL,
  PRIMARY KEY (`film_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `films`
--

LOCK TABLES `films` WRITE;
/*!40000 ALTER TABLE `films` DISABLE KEYS */;
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
  `cinima_id` int DEFAULT NULL,
  `film_id` int DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `film_id` (`film_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`film_id`) REFERENCES `films` (`film_id`)
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
INSERT INTO `regions` VALUES (1,'Hà Nội'),(2,'Tp.Hồ Chí Minh'),(3,'Bình Dương'),(4,'Đồng Nai'),(5,'Cần Thơ'),(6,'Đã Nẵng'),(7,'Khánh Hòa'),(8,'Lâm Đồng'),(9,'Quảng Ninh'),(10,'Bình Định'),(11,'Bà Rịa-Vũng Tàu'),(12,'Bắc Giang'),(13,'Đắk Lắk'),(14,'Gia Lai'),(15,'Hải Phòng'),(16,'Thừa-Thiên Huế'),(17,'Kiên Giang'),(18,'Thái Bình'),(19,'Kon Tum'),(20,'Nghệ An'),(21,'Quảng Bình'),(22,'Quảng Nam'),(23,'Sóc Trăng'),(24,'Tây Ninh'),(25,'Thái Nguyên'),(26,'Thanh Hóa'),(27,'Tiền Giang'),(28,'An Giang'),(29,'Bắc Ninh'),(30,'Bình Thuận'),(31,'Cà Mau'),(32,'Đồng Tháp'),(33,'Hà Nam'),(34,'Hà Tĩnh'),(35,'Hải Dương'),(36,'Hậu Giang'),(37,'Hưng Yên'),(38,'Lạng Sơn'),(39,'Lào Cai'),(40,'Long An'),(41,'Nam Định'),(42,'Ninh BÌnh'),(43,'Ninh Thuận'),(44,'Phú Thọ'),(45,'Quảng Ngãi'),(46,'Quảng Trị'),(47,'Sơn La'),(48,'Trà Vinh'),(49,'Tuyên Quang'),(50,'Vĩnh Long'),(51,'Yên Bái');
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
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `ticket_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `seat_id` int DEFAULT NULL,
  `slot_id` int DEFAULT NULL,
  `ticket_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`ticket_id`),
  KEY `order_id` (`order_id`),
  KEY `seat_id` (`seat_id`),
  KEY `slot_id` (`slot_id`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`seat_id`),
  CONSTRAINT `tickets_ibfk_3` FOREIGN KEY (`slot_id`) REFERENCES `time_slots` (`slot_id`)
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
-- Table structure for table `time_slots`
--

DROP TABLE IF EXISTS `time_slots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_slots` (
  `slot_id` int NOT NULL AUTO_INCREMENT,
  `room_id` int DEFAULT NULL,
  `slot_time` time NOT NULL,
  PRIMARY KEY (`slot_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `time_slots_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time_slots`
--

LOCK TABLES `time_slots` WRITE;
/*!40000 ALTER TABLE `time_slots` DISABLE KEYS */;
/*!40000 ALTER TABLE `time_slots` ENABLE KEYS */;
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
  `sex` varchar(10) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `role` int DEFAULT '0',
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

-- Dump completed on 2024-10-01  8:09:23
