
-- -----------------------------------------------------
-- Schema wibaux_foldings
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS wibaux_foldings; 
CREATE SCHEMA IF NOT EXISTS wibaux_foldings DEFAULT CHARACTER SET utf8 ; 
USE wibaux_foldings ;

-- -----------------------------------------------------
-- Table `wibaux_foldings`.`works_manager`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wibaux_foldings`.`works_manager` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `mail` VARCHAR(50) NOT NULL,
    `login` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `wibaux_foldings`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wibaux_foldings`.`address` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(255) NOT NULL,
    `postal_code` VARCHAR(10) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wibaux_foldings`.`worksite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wibaux_foldings`.`worksite` (
    `id` INT NOT NULL,
    `name` VARCHAR(50) NULL,
    `works_manager_id` INT NOT NULL,
    `address_id` INT NOT NULL,
    PRIMARY KEY (`id`, `works_manager_id`, `address_id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC),
    INDEX `fk_worksite_works_manager1_idx` (`works_manager_id` ASC),
    INDEX `fk_worksite_address1_idx` (`address_id` ASC),
    CONSTRAINT `fk_worksite_works_manager1`
        FOREIGN KEY (`works_manager_id`)
        REFERENCES `wibaux_foldings`.`works_manager` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    CONSTRAINT `fk_worksite_address1`
        FOREIGN KEY (`address_id`)
        REFERENCES `wibaux_foldings`.`address` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wibaux_foldings`.`order_sheet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wibaux_foldings`.`order_sheet` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `create_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   
    `worksite_id` INT NOT NULL,
    `worksite_address_id` INT NOT NULL,
    PRIMARY KEY (`id`, `worksite_id`, `worksite_address_id`),
    INDEX `fk_order_sheet_worksite1_idx` (`worksite_address_id` ASC),
    CONSTRAINT `fk_order_sheet_worksite1`
        FOREIGN KEY (`worksite_address_id`)
        REFERENCES `wibaux_foldings`.`worksite` (`address_id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wibaux_foldings`.`folding`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wibaux_foldings`.`folding` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(50) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `ral` INT(5) NULL,
    `thickness` INT NULL,
    `quantity` INT NULL,
    `long` INT NULL,
    `dim1` INT NULL,
    `dim2` INT NULL,
    `dim3` INT NULL,
    `dim4` INT NULL,
    `dim5` INT NULL,
    `dim6` INT NULL,
    `angle1` INT NULL,
    `angle2` INT NULL,
    `angle3` INT NULL,
    `angle4` INT NULL,
    `angle5` INT NULL,
    `consultation_id` INT NOT NULL,
    `order_sheet_id` INT NOT NULL,
    `order_sheet_worksite_id` INT NOT NULL,
    `order_sheet_worksite_address_id` INT NOT NULL,
    UNIQUE INDEX `id_UNIQUE` (`id` ASC),
    PRIMARY KEY (`id`, `consultation_id`, `order_sheet_id`, `order_sheet_worksite_id`, `order_sheet_worksite_address_id`),
    INDEX `fk_folding_order_sheet1_idx` (`order_sheet_id` ASC, `order_sheet_worksite_id` ASC, `order_sheet_worksite_address_id` ASC),
    CONSTRAINT `fk_folding_order_sheet1`
    FOREIGN KEY (`order_sheet_id` , `order_sheet_worksite_id`)
    REFERENCES `wibaux_foldings`.`order_sheet` (`id` , `worksite_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wibaux_foldings`.`suppliers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wibaux_foldings`.`suppliers` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(45) NULL,
    `order_sheet_id` INT NOT NULL,
    `order_sheet_worksite_id` INT NOT NULL,
    `order_sheet_worksite_address_id` INT NOT NULL,
    PRIMARY KEY (`id`, `order_sheet_id`, `order_sheet_worksite_id`, `order_sheet_worksite_address_id`),
    INDEX `fk_suppliers_order_sheet1_idx` (`order_sheet_id` ASC, `order_sheet_worksite_id` ASC, `order_sheet_worksite_address_id` ASC),
    CONSTRAINT `fk_suppliers_order_sheet1`
    FOREIGN KEY (`order_sheet_id` , `order_sheet_worksite_id` , `order_sheet_worksite_address_id`)
    REFERENCES `wibaux_foldings`.`order_sheet` (`id` , `worksite_id` , `worksite_address_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;