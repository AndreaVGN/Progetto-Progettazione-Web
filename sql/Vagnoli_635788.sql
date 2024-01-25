-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema Vagnoli_635788
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `Vagnoli_635788` ;

-- -----------------------------------------------------
-- Schema Vagnoli_635788
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Vagnoli_635788` DEFAULT CHARACTER SET utf8 ;
USE `Vagnoli_635788` ;

-- -----------------------------------------------------
-- Table `Vagnoli_635788`.`Utente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Vagnoli_635788`.`Utente` ;

CREATE TABLE IF NOT EXISTS `Vagnoli_635788`.`Utente` (
  `username` VARCHAR(16) NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  `DB_username` VARCHAR(256) NOT NULL,
  `DB_password` VARCHAR(256) NOT NULL,
  `statoPartita` VARCHAR(16) NOT NULL,
  `ultimoScore` INT NOT NULL,
  `record` INT NOT NULL,
  PRIMARY KEY (`username`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Vagnoli_635788`.`LogTable`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Vagnoli_635788`.`LogTable` ;

CREATE TABLE IF NOT EXISTS `Vagnoli_635788`.`LogTable` (
  `utente` VARCHAR(16) NOT NULL,
  `timestampInizioSessione` TIMESTAMP NOT NULL,
  `timestampFineSessione` TIMESTAMP NOT NULL,
  PRIMARY KEY (`utente`, `timestampInizioSessione`),
  CONSTRAINT `fk_LogTable_utente`
    FOREIGN KEY (`Utente`)
    REFERENCES `Vagnoli_635788`.`Utente` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
