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
    `password` LONGTEXT NOT NULL,
    PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- Insert works managers manualy

-- -----------------------------------------------------
-- Table `wibaux_foldings`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wibaux_foldings`.`address` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(255) NOT NULL,
    `postal_code` VARCHAR(15) NOT NULL,
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
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   
    `worksite_id` INT NOT NULL,
    `worksite_address_id` INT NOT NULL,
    PRIMARY KEY (`id`, `worksite_id`, `worksite_address_id`),
    INDEX `fk_order_sheet_worksite1_idx` (`worksite_id` ASC),
    CONSTRAINT `fk_order_sheet_worksite1`
        FOREIGN KEY (`worksite_id`)
        REFERENCES `wibaux_foldings`.`worksite` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    INDEX `fk_order_sheet_address1_idx` (`worksite_address_id` ASC),
    CONSTRAINT `fk_order_sheet_address1`
        FOREIGN KEY (`worksite_address_id`)
        REFERENCES `wibaux_foldings`.`address` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- Insert 20 order_sheet différentes
INSERT INTO `wibaux_foldings`.`order_sheet` (`id`, `worksite_id`, `worksite_address_id`)
VALUES 
(NULL, 3, 1),
(NULL, 2, 5),
(NULL, 1, 8),
(NULL, 5, 16),
(NULL, 4, 11),
(NULL, 3, 3),
(NULL, 1, 19),
(NULL, 2, 6),
(NULL, 4, 9),
(NULL, 5, 7),
(NULL, 1, 13),
(NULL, 2, 15),
(NULL, 3, 10),
(NULL, 4, 2),
(NULL, 5, 14),
(NULL, 1, 12),
(NULL, 2, 18),
(NULL, 3, 17),
(NULL, 4, 20),
(NULL, 5, 4);

-- -----------------------------------------------------
-- Table `wibaux_foldings`.`folding`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wibaux_foldings`.`folding` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `identification` VARCHAR(10) NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `ral` INT(4) NULL,
    `thickness` INT NULL,
    `quantity` INT NULL,
    `length` INT NULL,
    `dim1` INT NULL,
    `dim2` INT NULL,
    `dim3` INT NULL,
    `dim4` INT NULL,
    `dim5` INT NULL,
    `dim6` INT NULL,
    `dev` INT NULL,
    `angle1` INT NULL,
    `angle2` INT NULL,
    `angle3` INT NULL,
    `angle4` INT NULL,
    `angle5` INT NULL,
    `order_sheet_id` INT NOT NULL,
    UNIQUE INDEX `id_UNIQUE` (`id` ASC),
    PRIMARY KEY (`id`, `order_sheet_id`),
    INDEX `fk_folding_order_sheet1_idx` (`order_sheet_id` ASC),
    CONSTRAINT `fk_folding_order_sheet1`
        FOREIGN KEY (`order_sheet_id`)
        REFERENCES `wibaux_foldings`.`order_sheet` (`id`)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- Insert 40 pliages différents
INSERT INTO `wibaux_foldings`.`folding` (`identification`, `category`, `type`, `ral`, `thickness`, `quantity`, `length`, `dim1`, `dim2`, `dim3`, `dim4`, `dim5`, `dim6`, `dev`, `angle1`, `angle2`, `angle3`, `angle4`, `angle5`, `order_sheet_id`)
VALUES 
('A', 'Bavette', 'Acier', 2653, 12421, 4, 546, 654, 657, 531, 1256, NULL, NULL, 353423, 321, 321, NULL, NULL, NULL, 1),
('A', 'Bavette', 'Acier', 2653, 12421, 4, 546, 654, 657, 531, 5685, NULL, NULL, 32423423, 321, 321, NULL, NULL, NULL, 2),
('A', 'Bavette', 'Acier', 2653, 12421, 4, 546, 654, 657, 531, 1256, NULL, NULL, 3243, 321, 321, NULL, NULL, NULL, 3),
('B','Bavette', 'Acier', 2653, 12421, 4, 546, 654, 657, 531, 1256, NULL, NULL, 3243, 321, 321, NULL, NULL, NULL, 4),
('A','Bavette', 'Acier', 2653, 12421, 4, 546, 654, 657, 531, 1256, NULL, NULL, 324, 321, 321, NULL, NULL, NULL, 5),
('C','Tôle de tente', 'Acier', 2653, 12421, 4, 546, 654, 657, 531, 1256, NULL, NULL, 3673, 321, 321, NULL, NULL, NULL, 6),
('A','Pikachu', 'Inox', 9010, 5120, 8, 763, 328, 176, 92, 1256, NULL, NULL, 3572, 156, 239, NULL, NULL, NULL, 7),
('A','Dracaufeu', 'Inox', 9010, 5120, 8, 763, 328, 176, 92, 1256, NULL, NULL, 9546, 156, 239, NULL, NULL, NULL, 8),
('D','Tortank', 'Inox', 9010, 5120, 8, 763, 328, 176, 92, 1256, NULL, NULL, 573, 156, 239, NULL, NULL, NULL, 9),
('A','Florizarre', 'Inox', 9010, 5120, 8, 763, 328, 176, 92, 1256, NULL, NULL, NULL, 156, 239, NULL, NULL, NULL, 10);


-- -----------------------------------------------------
-- Table `wibaux_foldings`.`supplier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wibaux_foldings`.`supplier` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `mail` VARCHAR(45) NULL,
    `folding_id` INT NOT NULL,
    PRIMARY KEY (`id`, `folding_id`),
    INDEX `fk_supplier_folding_id1_idx` (`folding_id` ASC),
    CONSTRAINT `fk_supplier_folding_id1`
    FOREIGN KEY (`folding_id`)
    REFERENCES `wibaux_foldings`.`folding` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- insert supplier
INSERT INTO `wibaux_foldings`.`supplier` (`name`, `mail`, `folding_id`)
VALUES 
('Fournisseur 1', 'fournisseur1@gmail.com', 1),
('Fournisseur 2', 'fournisseur2@gmail.com', 2),
('Fournisseur 3', 'fournisseur3@gmail.com', 3),
('Fournisseur 4', 'fournisseur4@gmail.com', 4),
('Fournisseur 5', 'fournisseur5@gmail.com', 5),
('Fournisseur 6', 'fournisseur6@gmail.com', 6),
('Fournisseur 7', 'fournisseur7@gmail.com', 7),
('Fournisseur 8', 'fournisseur8@gmail.com', 8),
('Fournisseur 9', 'fournisseur9@gmail.com', 9),
('Fournisseur 10', 'fournisseur10@gmail.com', 10);