
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
    PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- Insert 5 works managers
INSERT INTO `wibaux_foldings`.`works_manager` (`id`, `firstname`, `lastname`, `mail`)
VALUES (NULL, 'John', 'Doe', 'johndoe@example.com'),
        (NULL, 'Alice', 'Smith', 'alicesmith@example.com'),
        (NULL, 'Lisa', 'Johnson', 'lisajohnson@example.com'),
        (NULL, 'Karen', 'Brown', 'karenbrown@example.com'),
        (NULL, 'Susan', 'Wilson', 'susanwilson@example.com');


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

-- Insert 10 addresses différentes
INSERT  INTO `wibaux_foldings`.`address` (`id`, `street`, `postal_code`, `city`)
VALUES (NULL, '25 rue du Faubourg Saint-Honoré', '75008', 'Paris'),
        (NULL, '3 avenue des Fleurs', '06000', 'Nice'),
        (NULL, '14 rue de la République', '69001', 'Lyon'),
        (NULL, '2 rue de la Gare', '67000', 'Strasbourg'),
        (NULL, '6 place Bellecour', '69002', 'Lyon'),
        (NULL, '10 rue des Rosiers', '75004', 'Paris'),
        (NULL, '18 rue de la Pompe', '75116', 'Paris'),
        (NULL, '7 rue des Ecoles', '33000', 'Bordeaux'),
        (NULL, '15 avenue des Acacias', '75017', 'Paris'),
        (NULL, '28 rue des Lombards', '75004', 'Paris'),
        (NULL, '11 rue du Marché', '67000', 'Strasbourg'),
        (NULL, '9 avenue Foch', '75016', 'Paris'),
        (NULL, '16 rue des Capucins', '69001', 'Lyon'),
        (NULL, '2 rue des Cordeliers', '59000', 'Lille'),
        (NULL, '27 avenue de la Victoire', '06000', 'Nice'),
        (NULL, '1 rue de la Roquette', '75011', 'Paris'),
        (NULL, '4 rue du Petit Musc', '75004', 'Paris'),
        (NULL, '20 rue de la Pompe', '75116', 'Paris'),
        (NULL, '12 rue de la Paix', '44000', 'Nantes'),
        (NULL, '33 avenue de la Grande Armée', '75116', 'Paris');


-- -----------------------------------------------------
-- Table `wibaux_foldings`.`worksite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wibaux_foldings`.`worksite` (
    `id` INT NOT NULL AUTO_INCREMENT,
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

-- Insert 20 worksites
INSERT INTO `wibaux_foldings`.`worksite` (`id`, `name`, `works_manager_id`, `address_id`)
VALUES 
(NULL, 'Parking Leclerc', 3, 1),
(NULL, 'Centre commercial', 2, 5),
(NULL, 'Hôtel de ville', 1, 8),
(NULL, 'Immeuble de standing', 5, 16),
(NULL, 'Résidence étudiante', 4, 11),
(NULL, 'Maison individuelle', 3, 3),
(NULL, 'Centre sportif', 1, 19),
(NULL, 'Ecole primaire', 2, 6),
(NULL, 'Clinique privée', 4, 9),
(NULL, 'Usine de production', 5, 7),
(NULL, "Musée d'art moderne", 1, 13),
(NULL, 'Bibliothèque municipale', 2, 15),
(NULL, 'Immeuble de bureaux', 3, 10),
(NULL, 'Parc résidentiel', 4, 2),
(NULL, 'Salle de spectacle', 5, 14),
(NULL, 'Centre de recherche', 1, 12),
(NULL, 'Gare ferroviaire', 2, 18),
(NULL, 'Stade municipal', 3, 17),
(NULL, 'Théâtre de la ville', 4, 20),
(NULL, 'Piscine municipale', 5, 4);



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