-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: hospital
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `symptoms_diseases`
--

DROP TABLE IF EXISTS `symptoms_diseases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `symptoms_diseases` (
  `symptom_id` int NOT NULL,
  `disease_id` int NOT NULL,
  PRIMARY KEY (`symptom_id`,`disease_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `symptoms_diseases`
--

LOCK TABLES `symptoms_diseases` WRITE;
/*!40000 ALTER TABLE `symptoms_diseases` DISABLE KEYS */;
INSERT INTO `symptoms_diseases` VALUES (1,1),(1,2),(1,3),(1,6),(1,7),(1,11),(1,12),(1,13),(1,14),(1,15),(1,17),(2,1),(2,2),(2,11),(2,15),(2,16),(2,17),(3,1),(3,2),(3,3),(3,6),(3,7),(3,11),(3,12),(3,13),(3,14),(3,15),(3,16),(3,17),(4,2),(4,5),(4,15),(5,1),(5,5),(5,9),(5,10),(7,1),(7,3),(7,6),(7,7),(7,8),(7,9),(7,10),(7,11),(7,12),(7,13),(7,14),(7,15),(7,18),(7,19),(7,20),(8,2),(8,3),(8,6),(8,7),(8,16),(8,17),(8,19),(9,3),(9,4),(9,5),(9,6),(9,7),(9,8),(9,9),(9,10),(10,3),(10,4),(10,5),(10,6),(11,4),(12,1),(12,11),(12,12),(12,13),(12,14),(12,16),(12,20),(13,1),(13,4),(14,18),(14,19),(15,8),(15,9),(15,10),(15,18);
/*!40000 ALTER TABLE `symptoms_diseases` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-12 18:44:31
