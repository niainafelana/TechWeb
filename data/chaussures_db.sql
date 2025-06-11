/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.1-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: chaussures_db
-- ------------------------------------------------------
-- Server version	11.8.1-MariaDB-2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `shoe_images`
--

DROP TABLE IF EXISTS `shoe_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `shoe_images` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `shoe_id` bigint(20) unsigned DEFAULT NULL,
  `url` longtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_shoe_images_deleted_at` (`deleted_at`),
  KEY `fk_shoes_images` (`shoe_id`),
  CONSTRAINT `fk_shoes_images` FOREIGN KEY (`shoe_id`) REFERENCES `shoes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoe_images`
--

LOCK TABLES `shoe_images` WRITE;
/*!40000 ALTER TABLE `shoe_images` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `shoe_images` VALUES
(1,'2025-05-28 12:28:53.000','2025-05-28 12:28:53.000',NULL,1,'http://localhost:8080/images/adidas.png'),
(2,'2025-05-28 12:28:53.000','2025-05-28 12:28:53.000',NULL,1,'http://localhost:8080/images/nike.png'),
(3,'2025-05-28 12:28:53.000','2025-05-28 12:28:53.000',NULL,2,'https://example.com/images/adidas_ultraboost_22_1.jpg'),
(4,'2025-05-28 12:28:53.000','2025-05-28 12:28:53.000',NULL,2,'https://example.com/images/adidas_ultraboost_22_2.jpg'),
(5,'2025-05-28 12:28:53.000','2025-05-28 12:28:53.000',NULL,3,'https://example.com/images/puma_rsx3_1.jpg');
/*!40000 ALTER TABLE `shoe_images` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `shoes`
--

DROP TABLE IF EXISTS `shoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `shoes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `marque` longtext DEFAULT NULL,
  `name` longtext DEFAULT NULL,
  `price` double DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_shoes_deleted_at` (`deleted_at`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoes`
--

LOCK TABLES `shoes` WRITE;
/*!40000 ALTER TABLE `shoes` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `shoes` VALUES
(1,'2025-05-28 12:28:44.000','2025-05-28 12:28:44.000',NULL,'Nike','Air Max 270',129.99,'Chaussures de sport avec une bulle d\'air visible.'),
(2,'2025-05-28 12:28:44.000','2025-05-28 12:28:44.000',NULL,'Adidas','UltraBoost 22',149.99,'Chaussures de running confortables avec semelle Boost.'),
(3,'2025-05-28 12:28:44.000','2025-05-28 12:28:44.000',NULL,'Puma','RS-X3',99.99,'Design rétro-futuriste et semelle rembourrée.');
/*!40000 ALTER TABLE `shoes` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-06-10 16:40:03
