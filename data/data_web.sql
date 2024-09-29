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
-- Table structure for table `cinema_clusters`
--

DROP TABLE IF EXISTS `cinema_clusters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cinema_clusters` (
  `cluster_id` int NOT NULL AUTO_INCREMENT,
  `cluster_name` varchar(255) NOT NULL,
  PRIMARY KEY (`cluster_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cinema_clusters`
--

LOCK TABLES `cinema_clusters` WRITE;
/*!40000 ALTER TABLE `cinema_clusters` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cinemas`
--

LOCK TABLES `cinemas` WRITE;
/*!40000 ALTER TABLE `cinemas` DISABLE KEYS */;
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
  `film_rate` float DEFAULT NULL,
  `sum_rate` int DEFAULT NULL,
  `sum_star` int DEFAULT NULL,
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
  `film_img` varchar(200) DEFAULT NULL,
  `film_trailer` varchar(200) DEFAULT NULL,
  `Release_date` date DEFAULT NULL,
  `film_describe` text,
  `age_limit` int NOT NULL,
  `duration` int NOT NULL,
  `category` text,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `popcorn_combos`
--

LOCK TABLES `popcorn_combos` WRITE;
/*!40000 ALTER TABLE `popcorn_combos` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
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
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
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

-- Dump completed on 2024-09-29 21:14:54
