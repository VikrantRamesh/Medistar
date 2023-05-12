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
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `user_id` bigint NOT NULL,
  `pid` int NOT NULL AUTO_INCREMENT,
  `p_fname` varchar(45) DEFAULT NULL,
  `p_lname` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `Dob` date DEFAULT NULL,
  `age` int DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`pid`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1018 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (20230504123453,1009,'Vikrant','Ramesh','Male','2003-04-23',20,'4th street, mogappair, chennai-89','7305302490'),(20230504154010,1010,'Tharun','R S','Male','2003-09-11',20,'5-9 Block, 2nd Street, Keelpauk, Chennai-87','9450394822'),(20230505124446,1011,'Krishna','Kumar','Male','2003-04-10',20,'5th block Valasaravakkam','93726476836'),(20230506065037,1013,'Rohit','T','Male','2004-02-01',19,'4th Block, Adayar, Chennai-600175','966544365332'),(20230506065146,1014,'Sudeep','Kumar','Male','2003-11-19',20,'5th Street, Koraipaakam, Chennai-600054','9857463841'),(20230506065301,1015,'Hemanth','Chad','Male','2003-05-20',20,'5th Street, Anna nagar, Chennai-600064','90785038502'),(20230506065405,1016,'Varsha','R','Female','2003-03-17',20,'7th Street, Velachery, Chennai-600056','9587337948'),(20230512113358,1017,'Vimal','Kannan','Male','1986-06-17',37,'5th block Vadapalani, Chennai-600045','9857849374');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-12 18:44:35
