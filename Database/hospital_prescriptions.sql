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
-- Table structure for table `prescriptions`
--

DROP TABLE IF EXISTS `prescriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescriptions` (
  `app_id` int NOT NULL,
  `pid` int NOT NULL,
  `doc_id` int NOT NULL,
  `doc_name` varchar(45) DEFAULT NULL,
  `pname` varchar(45) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` varchar(40) DEFAULT NULL,
  `prescription` varchar(100) NOT NULL,
  `disease` varchar(45) NOT NULL,
  PRIMARY KEY (`app_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescriptions`
--

LOCK TABLES `prescriptions` WRITE;
/*!40000 ALTER TABLE `prescriptions` DISABLE KEYS */;
INSERT INTO `prescriptions` VALUES (11,1009,50,'Ramesh','Vikrant','2023-05-06','11:00 AM','parastomal-50mg\ndolo500-25mg','Dengue fever'),(12,1011,50,'Ramesh','Krishna','2023-05-06','10:00 AM','cilax-50-25mg','Tuberculosis'),(20,1009,50,'Ramesh','Vikrant','2023-05-06','3:00 PM','Dolo650-45mg','Pneumonia'),(23,1010,50,'Ramesh','Tharun','2023-05-06','5:00 PM','caryax-45-10mg','Pneumonia'),(28,1013,53,'Nithya','Rohit','2023-05-06','11:00 AM','Get-Some-Sleep','Tuberculosis'),(29,1009,50,'Ramesh','Vikrant','2023-05-08','3:00 PM','vjfjgmhgmg','HIV/AIDS'),(40,1013,58,'Kumar','Rohit','2023-05-09','11:00 AM','parastomal-40-50mg\ncetrizin-5mg','Cholera'),(41,1014,58,'Kumar','Sudeep','2023-05-09','1:00 PM','Just Sleep Bro','Cholera'),(44,1014,51,'Suresh','Sudeep','2023-05-09','4:00 PM','More Sleep stupid','Malaria'),(45,1009,54,'Ragavi','Vikrant','2023-05-10','1:00 PM','afdasd','Zika virus'),(47,1010,55,'Kanishkaa','Tharun','2023-05-10','10:00 AM','prescription goes here','Common cold'),(48,1010,51,'Suresh','Tharun','2023-05-10','2:00 PM','sfgfdg','Malaria'),(51,1015,53,'Nithya','Hemanth','2023-05-10','4:00 PM','Dolopur-5mg\nPan-10mg','NIL'),(53,1016,53,'Nithya','Varsha','2023-05-10','02:00 PM','Dolo-650-5mg\nparastomal-10mg','Fever'),(54,1011,50,'Ramesh','Krishna','2023-05-10','5:00 PM','sdfsdf','xzczxcz'),(55,1009,51,'Suresh','Vikrant','2023-05-10','5:00 PM','zxczxcz','Zika virus'),(58,1009,50,'Ramesh','Vikrant','2023-05-10','12:00 PM','dolo-650-10mg\nparastomal-5mg','Fever');
/*!40000 ALTER TABLE `prescriptions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-12 18:44:32
