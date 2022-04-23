-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: sllips
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `viagem`
--

DROP TABLE IF EXISTS `viagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viagem` (
  `ViagemID` int NOT NULL AUTO_INCREMENT,
  `Data` datetime DEFAULT NULL,
  `UsuarioID` int NOT NULL,
  `Checkin` datetime DEFAULT NULL,
  `Checkout` datetime DEFAULT NULL,
  `Primeiravez` tinyint DEFAULT NULL,
  `HopedagemID` int DEFAULT NULL,
  `Acompanhantes` varchar(45) DEFAULT NULL,
  `VacinaCovid` int DEFAULT NULL,
  `TipoID` int NOT NULL,
  `CidadeIDOrigem` int DEFAULT NULL,
  `CidadeIDDestino` int DEFAULT NULL,
  `Avaliacao` int DEFAULT NULL,
  PRIMARY KEY (`ViagemID`),
  KEY `fk_tipo_viagem_1_idx` (`UsuarioID`),
  KEY `fk_viagem_tipo_idx` (`TipoID`),
  KEY `fk_viagem_hospedagem_idx` (`HopedagemID`),
  KEY `fk_viagem_origem_idx` (`CidadeIDOrigem`),
  KEY `fk_viagem_destino_idx` (`CidadeIDDestino`),
  CONSTRAINT `fk_tipo_viagem_1` FOREIGN KEY (`UsuarioID`) REFERENCES `usuario` (`UsuarioID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_viagem_destino` FOREIGN KEY (`CidadeIDDestino`) REFERENCES `cidade` (`CidadeID`),
  CONSTRAINT `fk_viagem_hospedagem` FOREIGN KEY (`HopedagemID`) REFERENCES `hospedagem` (`HospedagemID`),
  CONSTRAINT `fk_viagem_origem` FOREIGN KEY (`CidadeIDOrigem`) REFERENCES `cidade` (`CidadeID`),
  CONSTRAINT `fk_viagem_tipo` FOREIGN KEY (`TipoID`) REFERENCES `tipo` (`TipoID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viagem`
--

LOCK TABLES `viagem` WRITE;
/*!40000 ALTER TABLE `viagem` DISABLE KEYS */;
INSERT INTO `viagem` VALUES (1,'2022-07-04 00:00:00',9,'2022-04-20 00:00:00','2022-04-30 00:00:00',0,1,'Amigos',3,1,1,1,3),(2,'2009-07-04 00:00:00',9,NULL,NULL,0,2,'Amigos',3,1,1,2,1);
/*!40000 ALTER TABLE `viagem` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-23 17:28:28
