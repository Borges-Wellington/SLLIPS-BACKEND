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
-- Table structure for table `estabelecimento`
--

DROP TABLE IF EXISTS `estabelecimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estabelecimento` (
  `EstabelecimentoID` int NOT NULL AUTO_INCREMENT,
  `NomeEstabelecimento` varchar(60) NOT NULL,
  `CNPJ` varchar(14) DEFAULT NULL,
  `NomeEmpresario` varchar(60) DEFAULT NULL,
  `NfuncionariosFixos_H` int DEFAULT NULL,
  `NfuncionariosFreela_H` int DEFAULT NULL,
  `NfuncionariosFixos_M` int DEFAULT NULL,
  `NfuncionariosFreela_M` int DEFAULT NULL,
  `AtividadeID` int NOT NULL,
  `NichoID` int NOT NULL,
  `CidadeID` int NOT NULL,
  `UsuarioID` int NOT NULL,
  PRIMARY KEY (`EstabelecimentoID`),
  KEY `fk_atividade` (`AtividadeID`),
  KEY `fk_estabelecimento_nicho_idx` (`NichoID`),
  KEY `fk_estabelecimento_cidade_idx` (`CidadeID`),
  KEY `fk_estabelecimento_usuario_idx` (`UsuarioID`),
  CONSTRAINT `fk_estabelecimento_atividade` FOREIGN KEY (`AtividadeID`) REFERENCES `atividade` (`AtividadeID`),
  CONSTRAINT `fk_estabelecimento_cidade` FOREIGN KEY (`CidadeID`) REFERENCES `cidade` (`CidadeID`),
  CONSTRAINT `fk_estabelecimento_nicho` FOREIGN KEY (`NichoID`) REFERENCES `nicho` (`NichoID`),
  CONSTRAINT `fk_estabelecimento_usuario` FOREIGN KEY (`UsuarioID`) REFERENCES `usuario` (`UsuarioID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estabelecimento`
--

LOCK TABLES `estabelecimento` WRITE;
/*!40000 ALTER TABLE `estabelecimento` DISABLE KEYS */;
INSERT INTO `estabelecimento` VALUES (1,'Teste','0000','Fulano',2,NULL,0,0,9,2,2,9);
/*!40000 ALTER TABLE `estabelecimento` ENABLE KEYS */;
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
