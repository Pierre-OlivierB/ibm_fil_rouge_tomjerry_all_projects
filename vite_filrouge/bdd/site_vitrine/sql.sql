CREATE TABLE Production (
    Id_Product INT AUTO_INCREMENT, product_name VARCHAR(60) NOT NULL, PRIMARY KEY (Id_Product), UNIQUE (product_name)
) ENGINE = InnoDB;

CREATE TABLE Speciality (
    Id_Speciality INT AUTO_INCREMENT, speciality_label VARCHAR(50) NOT NULL, PRIMARY KEY (Id_Speciality), UNIQUE (speciality_label)
) ENGINE = InnoDB;

CREATE TABLE Type_Field (
    Id_Type_Field INT AUTO_INCREMENT, name_field VARCHAR(60) NOT NULL, PRIMARY KEY (Id_Type_Field), UNIQUE (name_field)
) ENGINE = InnoDB;

CREATE TABLE Unity (
    Id_Unity INT AUTO_INCREMENT, label_unity VARCHAR(50) NOT NULL, PRIMARY KEY (Id_Unity), UNIQUE (label_unity)
) ENGINE = InnoDB;

CREATE TABLE Role (
    Id_Role INT AUTO_INCREMENT, PRIMARY KEY (Id_Role)
) ENGINE = InnoDB;

CREATE TABLE breeding (
    Id_breeding INT AUTO_INCREMENT, label_breeding VARCHAR(50) NOT NULL, PRIMARY KEY (Id_breeding), UNIQUE (label_breeding)
) ENGINE = InnoDB;

CREATE TABLE animal (
    Id_animal INT AUTO_INCREMENT, animal_name VARCHAR(50) NOT NULL, PRIMARY KEY (Id_animal), UNIQUE (animal_name)
) ENGINE = InnoDB;

CREATE TABLE animal_type (
    Id_animal_type INT AUTO_INCREMENT, label_atype VARCHAR(50) NOT NULL, PRIMARY KEY (Id_animal_type), UNIQUE (label_atype)
) ENGINE = InnoDB;

CREATE TABLE race (
    Id_race INT AUTO_INCREMENT, label_race VARCHAR(50) NOT NULL, PRIMARY KEY (Id_race), UNIQUE (label_race)
) ENGINE = InnoDB;

CREATE TABLE culture (
    Id_culture INT AUTO_INCREMENT, PRIMARY KEY (Id_culture)
) ENGINE = InnoDB;

CREATE TABLE cereal (
    Id_cereal INT AUTO_INCREMENT, label_cereale VARCHAR(50) NOT NULL, Id_culture INT NOT NULL, PRIMARY KEY (Id_cereal), UNIQUE (Id_culture), UNIQUE (label_cereale), FOREIGN KEY (Id_culture) REFERENCES culture (Id_culture)
) ENGINE = InnoDB;

CREATE TABLE feed (
    Id_feed INT AUTO_INCREMENT, label_feed VARCHAR(50) NOT NULL, Id_culture INT NOT NULL, PRIMARY KEY (Id_feed), UNIQUE (Id_culture), UNIQUE (label_feed), FOREIGN KEY (Id_culture) REFERENCES culture (Id_culture)
) ENGINE = InnoDB;

CREATE TABLE oleaginous (
    Id_oleaginous INT AUTO_INCREMENT, label_oleaginous VARCHAR(50) NOT NULL, Id_culture INT NOT NULL, PRIMARY KEY (Id_oleaginous), UNIQUE (Id_culture), UNIQUE (label_oleaginous), FOREIGN KEY (Id_culture) REFERENCES culture (Id_culture)
) ENGINE = InnoDB;

CREATE TABLE treatement (
    Id_treatement INT AUTO_INCREMENT, label_treatement VARCHAR(50) NOT NULL, PRIMARY KEY (Id_treatement), UNIQUE (label_treatement)
) ENGINE = InnoDB;

CREATE TABLE treatement_type (
    Id_treatement_type INT AUTO_INCREMENT, label_treatement_type VARCHAR(50) NOT NULL, PRIMARY KEY (Id_treatement_type), UNIQUE (label_treatement_type)
) ENGINE = InnoDB;

CREATE TABLE Rh (
    Id_Rh INT AUTO_INCREMENT, label_rh_job VARCHAR(50) NOT NULL, Id_Role INT NOT NULL, PRIMARY KEY (Id_Rh), UNIQUE (Id_Role), UNIQUE (label_rh_job), FOREIGN KEY (Id_Role) REFERENCES Role (Id_Role)
) ENGINE = InnoDB;

CREATE TABLE Agriculteur (
    Id_Agriculteur INT AUTO_INCREMENT, label_agr_job VARCHAR(50) NOT NULL, Id_Role INT NOT NULL, PRIMARY KEY (Id_Agriculteur), UNIQUE (Id_Role), UNIQUE (label_agr_job), FOREIGN KEY (Id_Role) REFERENCES Role (Id_Role)
) ENGINE = InnoDB;

CREATE TABLE Horticulture (
    Id_Horticulture INT AUTO_INCREMENT, PRIMARY KEY (Id_Horticulture)
) ENGINE = InnoDB;

CREATE TABLE vegetable (
    Id_vegetable INT AUTO_INCREMENT, label_vegetable VARCHAR(50) NOT NULL, Id_Horticulture INT NOT NULL, PRIMARY KEY (Id_vegetable), UNIQUE (Id_Horticulture), UNIQUE (label_vegetable), FOREIGN KEY (Id_Horticulture) REFERENCES Horticulture (Id_Horticulture)
) ENGINE = InnoDB;

CREATE TABLE fruit (
    Id_fruit INT AUTO_INCREMENT, label_fruit VARCHAR(50) NOT NULL, Id_Horticulture INT NOT NULL, PRIMARY KEY (Id_fruit), UNIQUE (Id_Horticulture), UNIQUE (label_fruit), FOREIGN KEY (Id_Horticulture) REFERENCES Horticulture (Id_Horticulture)
) ENGINE = InnoDB;

CREATE TABLE under_earth (
    Id_under_earth INT AUTO_INCREMENT, label_under_earth VARCHAR(50) NOT NULL, Id_culture INT NOT NULL, PRIMARY KEY (Id_under_earth), UNIQUE (Id_culture), UNIQUE (label_under_earth), FOREIGN KEY (Id_culture) REFERENCES culture (Id_culture)
) ENGINE = InnoDB;

CREATE TABLE Energy (
    Id_Energy INT AUTO_INCREMENT, label_ener VARCHAR(50) NOT NULL, PRIMARY KEY (Id_Energy), UNIQUE (label_ener)
) ENGINE = InnoDB;

CREATE TABLE time_period (
    Id_time_period INT AUTO_INCREMENT, begin_hour TIME, end_hour TIME, PRIMARY KEY (Id_time_period), UNIQUE (begin_hour), UNIQUE (end_hour)
) ENGINE = InnoDB;

CREATE TABLE month_product (
    Id_Month INT AUTO_INCREMENT, label_name VARCHAR(50) NOT NULL, PRIMARY KEY (Id_Month), UNIQUE (label_name)
) ENGINE = InnoDB;

CREATE TABLE Field(
    Num_Field INT, label_field VARCHAR(60), gps_id VARCHAR(100) NOT NULL, Id_Type_Field INT, PRIMARY KEY (Num_Field), UNIQUE (gps_id), FOREIGN KEY (Id_Type_Field) REFERENCES Type_Field (Id_Type_Field)
) ENGINE = InnoDB;

CREATE TABLE Employee (
    Id_employee INT AUTO_INCREMENT, First_name VARCHAR(60), Last_name VARCHAR(50), N_SS INT NOT NULL, Id_Role INT NOT NULL, Id_Speciality INT NOT NULL, PRIMARY KEY (Id_employee), UNIQUE (N_SS), FOREIGN KEY (Id_Role) REFERENCES Role (Id_Role), FOREIGN KEY (Id_Speciality) REFERENCES Speciality (Id_Speciality)
) ENGINE = InnoDB;

CREATE TABLE Recruit (
    Id_employee INT, Id_employee_1 INT, date_recruit DATE, PRIMARY KEY (Id_employee, Id_employee_1), FOREIGN KEY (Id_employee) REFERENCES Employee (Id_employee), FOREIGN KEY (Id_employee_1) REFERENCES Employee (Id_employee)
) ENGINE = InnoDB;

CREATE TABLE is_cult_set (
    Id_employee INT, Id_culture INT, date_cult_set DATE, PRIMARY KEY (Id_employee, Id_culture), FOREIGN KEY (Id_employee) REFERENCES Employee (Id_employee), FOREIGN KEY (Id_culture) REFERENCES culture (Id_culture)
) ENGINE = InnoDB;

CREATE TABLE is_cult_affilied (
    Num_Field INT, Id_culture INT, date_cult_affilied DATE, PRIMARY KEY (Num_Field, Id_culture), FOREIGN KEY (Num_Field) REFERENCES Field(Num_Field), FOREIGN KEY (Id_culture) REFERENCES culture (Id_culture)
) ENGINE = InnoDB;

CREATE TABLE is_treated (
    Num_Field INT, Id_treatement INT, date_treatement DATE, qtx_treat DECIMAL(15, 2), PRIMARY KEY (Num_Field, Id_treatement), FOREIGN KEY (Num_Field) REFERENCES Field(Num_Field), FOREIGN KEY (Id_treatement) REFERENCES treatement (Id_treatement)
) ENGINE = InnoDB;

CREATE TABLE field_set (
    Id_Unity INT, Num_Field INT, set_delivered INT, PRIMARY KEY (Id_Unity, Num_Field), FOREIGN KEY (Id_Unity) REFERENCES Unity (Id_Unity), FOREIGN KEY (Num_Field) REFERENCES Field(Num_Field)
) ENGINE = InnoDB;

CREATE TABLE cult_is_for (
    Id_Type_Field INT, Id_culture INT, PRIMARY KEY (Id_Type_Field, Id_culture), FOREIGN KEY (Id_Type_Field) REFERENCES Type_Field (Id_Type_Field), FOREIGN KEY (Id_culture) REFERENCES culture (Id_culture)
) ENGINE = InnoDB;

CREATE TABLE is_of (
    Id_animal INT, Id_race INT, PRIMARY KEY (Id_animal, Id_race), FOREIGN KEY (Id_animal) REFERENCES animal (Id_animal), FOREIGN KEY (Id_race) REFERENCES race (Id_race)
) ENGINE = InnoDB;

CREATE TABLE is_type_of (
    Id_animal INT, Id_animal_type INT, PRIMARY KEY (Id_animal, Id_animal_type), FOREIGN KEY (Id_animal) REFERENCES animal (Id_animal), FOREIGN KEY (Id_animal_type) REFERENCES animal_type (Id_animal_type)
) ENGINE = InnoDB;

CREATE TABLE is_part_of (
    Id_breeding INT, Id_animal INT, date_part_of DATETIME, PRIMARY KEY (Id_breeding, Id_animal), FOREIGN KEY (Id_breeding) REFERENCES breeding (Id_breeding), FOREIGN KEY (Id_animal) REFERENCES animal (Id_animal)
) ENGINE = InnoDB;

CREATE TABLE breed_give (
    Id_Product INT, Id_breeding INT, date_breed DATETIME, qtx_give DECIMAL(15, 2), PRIMARY KEY (Id_Product, Id_breeding), FOREIGN KEY (Id_Product) REFERENCES Production (Id_Product), FOREIGN KEY (Id_breeding) REFERENCES breeding (Id_breeding)
) ENGINE = InnoDB;

CREATE TABLE cult_give (
    Id_Product INT, Id_culture INT, date_cult DATETIME, qtx_cult DECIMAL(15, 2), PRIMARY KEY (Id_Product, Id_culture), FOREIGN KEY (Id_Product) REFERENCES Production (Id_Product), FOREIGN KEY (Id_culture) REFERENCES culture (Id_culture)
) ENGINE = InnoDB;

CREATE TABLE link_to_at (
    Id_Unity INT, Id_animal_type INT, PRIMARY KEY (Id_Unity, Id_animal_type), FOREIGN KEY (Id_Unity) REFERENCES Unity (Id_Unity), FOREIGN KEY (Id_animal_type) REFERENCES animal_type (Id_animal_type)
) ENGINE = InnoDB;

CREATE TABLE link_to_cereal (
    Id_Unity INT, Id_cereal INT, PRIMARY KEY (Id_Unity, Id_cereal), FOREIGN KEY (Id_Unity) REFERENCES Unity (Id_Unity), FOREIGN KEY (Id_cereal) REFERENCES cereal (Id_cereal)
) ENGINE = InnoDB;

CREATE TABLE link_to_feed (
    Id_Unity INT, Id_feed INT, PRIMARY KEY (Id_Unity, Id_feed), FOREIGN KEY (Id_Unity) REFERENCES Unity (Id_Unity), FOREIGN KEY (Id_feed) REFERENCES feed (Id_feed)
) ENGINE = InnoDB;

CREATE TABLE link_to_oleaginous (
    Id_Unity INT, Id_oleaginous INT, PRIMARY KEY (Id_Unity, Id_oleaginous), FOREIGN KEY (Id_Unity) REFERENCES Unity (Id_Unity), FOREIGN KEY (Id_oleaginous) REFERENCES oleaginous (Id_oleaginous)
) ENGINE = InnoDB;

CREATE TABLE link_to_tt (
    Id_Unity INT, Id_treatement_type INT, PRIMARY KEY (Id_Unity, Id_treatement_type), FOREIGN KEY (Id_Unity) REFERENCES Unity (Id_Unity), FOREIGN KEY (Id_treatement_type) REFERENCES treatement_type (Id_treatement_type)
) ENGINE = InnoDB;

CREATE TABLE is_treat_type (
    Id_treatement INT, Id_treatement_type INT, PRIMARY KEY (
        Id_treatement, Id_treatement_type
    ), FOREIGN KEY (Id_treatement) REFERENCES treatement (Id_treatement), FOREIGN KEY (Id_treatement_type) REFERENCES treatement_type (Id_treatement_type)
) ENGINE = InnoDB;

CREATE TABLE is_ani_affilied (
    Num_Field INT, Id_breeding INT, date_ani_affilied VARCHAR(50), PRIMARY KEY (Num_Field, Id_breeding), FOREIGN KEY (Num_Field) REFERENCES Field(Num_Field), FOREIGN KEY (Id_breeding) REFERENCES breeding (Id_breeding)
) ENGINE = InnoDB;

CREATE TABLE feed_breeding (
    Id_breeding INT, Id_culture INT, date_feed DATETIME, qtx_feed DECIMAL(15, 2), PRIMARY KEY (Id_breeding, Id_culture), FOREIGN KEY (Id_breeding) REFERENCES breeding (Id_breeding), FOREIGN KEY (Id_culture) REFERENCES culture (Id_culture)
) ENGINE = InnoDB;

CREATE TABLE horti_is_for (
    Id_Type_Field INT, Id_Horticulture INT, PRIMARY KEY (
        Id_Type_Field, Id_Horticulture
    ), FOREIGN KEY (Id_Type_Field) REFERENCES Type_Field (Id_Type_Field), FOREIGN KEY (Id_Horticulture) REFERENCES Horticulture (Id_Horticulture)
) ENGINE = InnoDB;

CREATE TABLE link_to_vege (
    Id_Unity INT, Id_vegetable INT, PRIMARY KEY (Id_Unity, Id_vegetable), FOREIGN KEY (Id_Unity) REFERENCES Unity (Id_Unity), FOREIGN KEY (Id_vegetable) REFERENCES vegetable (Id_vegetable)
) ENGINE = InnoDB;

CREATE TABLE link_to_fruit (
    Id_Unity INT, Id_fruit INT, PRIMARY KEY (Id_Unity, Id_fruit), FOREIGN KEY (Id_Unity) REFERENCES Unity (Id_Unity), FOREIGN KEY (Id_fruit) REFERENCES fruit (Id_fruit)
) ENGINE = InnoDB;

CREATE TABLE is_horti_set (
    Id_employee INT, Id_Horticulture INT, date_horti_set DATE, PRIMARY KEY (Id_employee, Id_Horticulture), FOREIGN KEY (Id_employee) REFERENCES Employee (Id_employee), FOREIGN KEY (Id_Horticulture) REFERENCES Horticulture (Id_Horticulture)
) ENGINE = InnoDB;

CREATE TABLE horti_give (
    Id_Product INT, Id_Horticulture INT, date_horti DATE, qtx_horti DECIMAL(15, 2), PRIMARY KEY (Id_Product, Id_Horticulture), FOREIGN KEY (Id_Product) REFERENCES Production (Id_Product), FOREIGN KEY (Id_Horticulture) REFERENCES Horticulture (Id_Horticulture)
) ENGINE = InnoDB;

CREATE TABLE is_horti_affilied (
    Num_Field INT, Id_Horticulture INT, date_horti_affilied DATE, PRIMARY KEY (Num_Field, Id_Horticulture), FOREIGN KEY (Num_Field) REFERENCES Field(Num_Field), FOREIGN KEY (Id_Horticulture) REFERENCES Horticulture (Id_Horticulture)
) ENGINE = InnoDB;

CREATE TABLE link_to_under_earth (
    Id_Unity INT, Id_under_earth INT, PRIMARY KEY (Id_Unity, Id_under_earth), FOREIGN KEY (Id_Unity) REFERENCES Unity (Id_Unity), FOREIGN KEY (Id_under_earth) REFERENCES under_earth (Id_under_earth)
) ENGINE = InnoDB;

CREATE TABLE product_energy (
    Id_Product INT, Id_Energy INT, PRIMARY KEY (Id_Product, Id_Energy), FOREIGN KEY (Id_Product) REFERENCES Production (Id_Product), FOREIGN KEY (Id_Energy) REFERENCES Energy (Id_Energy)
) ENGINE = InnoDB;

CREATE TABLE is_ener_affilied (
    Num_Field INT, Id_Energy INT, PRIMARY KEY (Num_Field, Id_Energy), FOREIGN KEY (Num_Field) REFERENCES Field(Num_Field), FOREIGN KEY (Id_Energy) REFERENCES Energy (Id_Energy)
) ENGINE = InnoDB;

CREATE TABLE link_to_ener (
    Id_Unity INT, Id_Energy INT, PRIMARY KEY (Id_Unity, Id_Energy), FOREIGN KEY (Id_Unity) REFERENCES Unity (Id_Unity), FOREIGN KEY (Id_Energy) REFERENCES Energy (Id_Energy)
) ENGINE = InnoDB;

CREATE TABLE dosage_horti (
    Id_treatement INT, Id_Horticulture INT, date_dosage_horti DATE, qttx_dosage_horti DECIMAL(15, 2), PRIMARY KEY (
        Id_treatement, Id_Horticulture
    ), FOREIGN KEY (Id_treatement) REFERENCES treatement (Id_treatement), FOREIGN KEY (Id_Horticulture) REFERENCES Horticulture (Id_Horticulture)
) ENGINE = InnoDB;

CREATE TABLE dosage_cult (
    Id_culture INT, Id_treatement INT, date_dosage_cult DATE, qttx_dosage_cult DECIMAL(15, 2), PRIMARY KEY (Id_culture, Id_treatement), FOREIGN KEY (Id_culture) REFERENCES culture (Id_culture), FOREIGN KEY (Id_treatement) REFERENCES treatement (Id_treatement)
) ENGINE = InnoDB;

CREATE TABLE energy_by_time (
    Id_Energy INT, Id_time_period INT, Id_Month INT, qtx_ener DECIMAL(15, 2), PRIMARY KEY (
        Id_Energy, Id_time_period, Id_Month
    ), FOREIGN KEY (Id_Energy) REFERENCES Energy (Id_Energy), FOREIGN KEY (Id_time_period) REFERENCES time_period (Id_time_period), FOREIGN KEY (Id_Month) REFERENCES month_product (Id_Month)
) ENGINE = InnoDB;

-- !--------------------------------------------

INSERT INTO
    `unity` (`Id_Unity`, `label_unity`)
VALUES (NULL, 'kg'),
    (NULL, 'm');

INSERT INTO `culture` (`Id_culture`) VALUES ('1'), ('2');

INSERT INTO `horticulture` (`Id_Horticulture`) VALUES ('1'), ('2');

INSERT INTO
    `fruit` (
        `Id_fruit`, `label_fruit`, `Id_Horticulture`
    )
VALUES (NULL, 'fraise', '1'),
    (NULL, 'pomme', '2');

INSERT INTO
    `type_field` (`Id_Type_Field`, `name_field`)
VALUES (NULL, 'calcaire'),
    (NULL, 'sable'),
    (NULL, 'silice'),
    (NULL, 'tourbe'),
    (NULL, 'limon');

INSERT INTO
    `field` (
        `Num_Field`, `label_field`, `gps_id`, `Id_Type_Field`
    )
VALUES (
        1, '42', '45,547896251 - 65,14562451', '5'
    ),
    (
        2, '47', '45,547896254 - 65,14562456', '4'
    );

INSERT INTO
    `is_horti_affilied` (
        `Num_Field`, `Id_Horticulture`, `date_horti_affilied`
    )
VALUES ('1', '1', '2023-05-01'),
    ('2', '2', '2023-05-27');

INSERT INTO
    `energy` (`Id_Energy`, `label_ener`)
VALUES (NULL, 'electricité'),
    (NULL, 'gaz');

INSERT INTO
    `month_product` (`Id_Month`, `label_name`)
VALUES (1, 'janv'),
    (2, 'fév'),
    (3, 'mars'),
    (4, 'avr'),
    (5, 'mai'),
    (6, 'juin'),
    (7, 'juil'),
    (8, 'aout'),
    (9, 'sept'),
    (10, 'oct'),
    (11, 'nov'),
    (12, 'déc');

INSERT INTO
    `time_period` (
        `Id_time_period`, `begin_hour`, `end_hour`
    )
VALUES (1, '00:00:00', '01:59:00');

INSERT INTO
    `time_period` (
        `Id_time_period`, `begin_hour`, `end_hour`
    )
VALUES (2, '02:00:00', '03:59:00'),
    (3, '04:00:00', '05:59:00'),
    (4, '06:00:00', '07:59:00'),
    (5, '08:00:00', '09:59:00'),
    (6, '10:00:00', '11:59:00'),
    (7, '12:00:00', '13:59:00'),
    (8, '14:00:00', '15:59:00'),
    (9, '16:00:00', '17:59:00'),
    (10, '18:00:00', '19:59:00'),
    (11, '20:00:00', '21:59:00'),
    (12, '22:00:00', '23:59:00');

------------------------------------------------------ ! New Day

INSERT INTO
    `energy_by_time` (
        `Id_Energy`, `Id_time_period`, `Id_Month`, `qtx_ener`
    )
VALUES ('1', '1', '1', '96.37');

INSERT INTO
    `energy_by_time` (
        `Id_Energy`, `Id_time_period`, `Id_Month`, `qtx_ener`
    )
VALUES ('1', '2', '1', '129.13'),
    ('1', '3', '1', '120.37'),
    ('1', '4', '1', '96.56'),
    ('1', '5', '1', '121.57'),
    ('1', '6', '1', '122.33'),
    ('1', '7', '1', '107'),
    ('1', '8', '1', '99.89'),
    ('1', '9', '1', '43.04'),
    ('1', '10', '1', '65.28'),
    ('1', '11', '1', '91.6'),
    ('1', '12', '1', '68.15');

INSERT INTO
    `energy_by_time` (
        `Id_Energy`, `Id_time_period`, `Id_Month`, `qtx_ener`
    )
VALUES ('1', '1', '2', '71.4'),
    ('1', '2', '2', '58.42'),
    ('1', '3', '2', '108.32'),
    ('1', '4', '2', '52.47'),
    ('1', '5', '2', '70.61'),
    ('1', '6', '2', '68.45'),
    ('1', '7', '2', '118.22'),
    ('1', '8', '2', '86.98'),
    ('1', '9', '2', '106.62'),
    ('1', '10', '2', '107.54'),
    ('1', '11', '2', '120.72'),
    ('1', '12', '2', '69.35');

INSERT INTO
    `energy_by_time` (
        `Id_Energy`, `Id_time_period`, `Id_Month`, `qtx_ener`
    )
VALUES ('1', '1', '3', '56.01'),
    ('1', '2', '3', '94.65'),
    ('1', '3', '3', '32.73'),
    ('1', '4', '3', '75.69'),
    ('1', '5', '3', '121.82'),
    ('1', '6', '3', '76.48'),
    ('1', '7', '3', '111.29'),
    ('1', '8', '3', '55.42'),
    ('1', '9', '3', '92.3'),
    ('1', '10', '3', '133.22'),
    ('1', '11', '3', '96.89'),
    ('1', '12', '3', '128.42');

INSERT INTO
    `energy_by_time` (
        `Id_Energy`, `Id_time_period`, `Id_Month`, `qtx_ener`
    )
VALUES ('1', '1', '4', '121.68'),
    ('1', '2', '4', '60.26'),
    ('1', '3', '4', '142.56'),
    ('1', '4', '4', '87.39'),
    ('1', '5', '4', '109.59'),
    ('1', '6', '4', '105.83'),
    ('1', '7', '4', '53.4'),
    ('1', '8', '4', '94.08'),
    ('1', '9', '4', '107.54'),
    ('1', '10', '4', '78.88'),
    ('1', '11', '4', '94.74'),
    ('1', '12', '4', '132.41');

INSERT INTO
    `energy_by_time` (
        `Id_Energy`, `Id_time_period`, `Id_Month`, `qtx_ener`
    )
VALUES ('1', '1', '5', '122.56'),
    ('1', '2', '5', '75.99'),
    ('1', '3', '5', '158.67'),
    ('1', '4', '5', '159.13'),
    ('1', '5', '5', '75.22'),
    ('1', '6', '5', '61.34'),
    ('1', '7', '5', '103.77'),
    ('1', '8', '5', '47.85'),
    ('1', '9', '5', '81.37'),
    ('1', '10', '5', '86.97'),
    ('1', '11', '5', '97.94'),
    ('1', '12', '5', '52.56');

INSERT INTO
    `energy_by_time` (
        `Id_Energy`, `Id_time_period`, `Id_Month`, `qtx_ener`
    )
VALUES ('1', '1', '6', '76.34'),
    ('1', '2', '6', '109.12'),
    ('1', '3', '6', '110.31'),
    ('1', '4', '6', '89.78'),
    ('1', '5', '6', '39.4'),
    ('1', '6', '6', '67.94'),
    ('1', '7', '6', '100.14'),
    ('1', '8', '6', '119.54'),
    ('1', '9', '6', '115.07'),
    ('1', '10', '6', '112.01'),
    ('1', '11', '6', '43.52'),
    ('1', '12', '6', '78.24');

INSERT INTO
    `energy_by_time` (
        `Id_Energy`, `Id_time_period`, `Id_Month`, `qtx_ener`
    )
VALUES ('1', '1', '7', '83.73'),
    ('1', '2', '7', '86.22'),
    ('1', '3', '7', '67.29'),
    ('1', '4', '7', '78.96'),
    ('1', '5', '7', '60.67'),
    ('1', '6', '7', '99.08'),
    ('1', '7', '7', '102.68'),
    ('1', '8', '7', '92.04'),
    ('1', '9', '7', '143.8'),
    ('1', '10', '7', '115.65'),
    ('1', '11', '7', '110.65'),
    ('1', '12', '7', '137.11');

INSERT INTO
    `energy_by_time` (
        `Id_Energy`, `Id_time_period`, `Id_Month`, `qtx_ener`
    )
VALUES ('1', '1', '8', '149.08'),
    ('1', '2', '8', '46.55'),
    ('1', '3', '8', '122.35'),
    ('1', '4', '8', '94.21'),
    ('1', '5', '8', '117.81'),
    ('1', '6', '8', '95.7'),
    ('1', '7', '8', '65.94'),
    ('1', '8', '8', '98.67'),
    ('1', '9', '8', '90.23'),
    ('1', '10', '8', '159.81'),
    ('1', '11', '8', '75.72'),
    ('1', '12', '8', '57.18');

INSERT INTO
    `energy_by_time` (
        `Id_Energy`, `Id_time_period`, `Id_Month`, `qtx_ener`
    )
VALUES ('1', '1', '9', '71.53'),
    ('1', '2', '9', '61.24'),
    ('1', '3', '9', '98.77'),
    ('1', '4', '9', '82.21'),
    ('1', '5', '9', '75.91'),
    ('1', '6', '9', '149.76'),
    ('1', '7', '9', '113.67'),
    ('1', '8', '9', '69.63'),
    ('1', '9', '9', '54.16'),
    ('1', '10', '9', '84.03'),
    ('1', '11', '9', '67.25'),
    ('1', '12', '9', '70.79');

INSERT INTO
    `energy_by_time` (
        `Id_Energy`, `Id_time_period`, `Id_Month`, `qtx_ener`
    )
VALUES ('1', '1', '10', '109.36'),
    ('1', '2', '10', '117.22'),
    ('1', '3', '10', '95.1'),
    ('1', '4', '10', '95.53'),
    ('1', '5', '10', '90.6'),
    ('1', '6', '10', '35.22'),
    ('1', '7', '10', '113.61'),
    ('1', '8', '10', '146.14'),
    ('1', '9', '10', '129.58'),
    ('1', '10', '10', '180.01'),
    ('1', '11', '10', '75.45'),
    ('1', '12', '10', '158.73');

INSERT INTO
    `energy_by_time` (
        `Id_Energy`, `Id_time_period`, `Id_Month`, `qtx_ener`
    )
VALUES ('1', '1', '11', '139.68'),
    ('1', '2', '11', '161.61'),
    ('1', '3', '11', '71.67'),
    ('1', '4', '11', '119.81'),
    ('1', '5', '11', '132.82'),
    ('1', '6', '11', '74.31'),
    ('1', '7', '11', '134.38'),
    ('1', '8', '11', '114.56'),
    ('1', '9', '11', '112.2'),
    ('1', '10', '11', '22.48'),
    ('1', '11', '11', '30.13'),
    ('1', '12', '11', '100.89');

INSERT INTO
    `energy_by_time` (
        `Id_Energy`, `Id_time_period`, `Id_Month`, `qtx_ener`
    )
VALUES ('1', '1', '12', '99.29'),
    ('1', '2', '12', '133.68'),
    ('1', '3', '12', '149.08'),
    ('1', '4', '12', '28.76'),
    ('1', '5', '12', '107.04'),
    ('1', '6', '12', '109.09'),
    ('1', '7', '12', '92.19'),
    ('1', '8', '12', '124.31'),
    ('1', '9', '12', '123.48'),
    ('1', '10', '12', '113.9'),
    ('1', '11', '12', '96.23'),
    ('1', '12', '12', '49.28');

-- !-------------------------------Select

SELECT
    `Id_Energy`,
    `Id_time_period`,
    `Id_Month`,
    `qtx_ener`
FROM `energy_by_time`
WHERE
    `Id_Energy` = 1
    AND `Id_Month` = 1;

-- !-----------------------------------------------

-- !-----------------------------------------------

-- !-----------------------------------------------

INSERT INTO `culture` (Id_culture) VALUES (3), (4);

-- INSERT INTO
--     `production` (`Id_Product`, `product_name`)
-- VALUES (NULL, 'pétale de maïs'), (NULL, 'petit poids');

INSERT INTO
    `cult_give` (
        `Id_Product`, `Id_culture`, `date_cult`, `qtx_cult`
    )
VALUES (
        '1', '1', '2023-11-16 14:25:19', '10.00'
    );

-- !-----------------------------------------------

-- !-----------------------------------------------

-- ! see: "D:\formation\fil_rouge\test_vite_filrouge\bdd"

-- !-----------------------------------------------

-- !-----------------------------------------------

INSERT INTO
    `culture` (`Id_culture`)
VALUES ('5'),
    ('6'),
    ('7'),
    ('8'),
    ('9'),
    ('10'),
    ('11'),
    ('12'),
    ('13'),
    ('14'),
    ('15'),
    ('16'),
    ('17'),
    ('18'),
    ('19'),
    ('20'),
    ('21'),
    ('22'),
    ('23'),
    ('24'),
    ('25'),
    ('26'),
    ('27'),
    ('28'),
    ('29'),
    ('30'),
    ('31'),
    ('32'),
    ('33'),
    ('34'),
    ('35'),
    ('36'),
    ('37'),
    ('38'),
    ('39'),
    ('40'),
    ('41'),
    ('42'),
    ('43'),
    ('44'),
    ('45'),
    ('46'),
    ('47'),
    ('48'),
    ('49'),
    ('50'),
    ('51'),
    ('52'),
    ('53'),
    ('54'),
    ('55'),
    ('56'),
    ('57'),
    ('58'),
    ('59'),
    ('60'),
    ('61'),
    ('62'),
    ('63'),
    ('64'),
    ('65'),
    ('66'),
    ('67'),
    ('68'),
    ('69'),
    ('70'),
    ('71'),
    ('72'),
    ('73');

-- !-----------------------------------------------

-- *------------------------------------- Culture

-- !---------

-- * Cereales

INSERT INTO
    `cereal` (
        `Id_cereal`, `label_cereale`, `Id_culture`
    )
VALUES (NULL, 'blé', '1');

INSERT INTO
    `cereal` (
        `Id_cereal`, `label_cereale`, `Id_culture`
    )
VALUES (NULL, 'orge', '2');

INSERT INTO
    `cereal` (
        `Id_cereal`, `label_cereale`, `Id_culture`
    )
VALUES (NULL, 'maïs', '4');

-- !---------

-- * under earth

INSERT INTO
    `under_earth` (
        `Id_under_earth`, `label_under_earth`, `Id_culture`
    )
VALUES (NULL, 'pomme de terre', '5');

INSERT INTO
    `under_earth` (
        `Id_under_earth`, `label_under_earth`, `Id_culture`
    )
VALUES (NULL, 'carotte', '6'),
    (NULL, 'panais', '7'),
    (NULL, 'betterave', '8'),
    (NULL, 'navet', '9'),
    (NULL, 'radis', '10'),
    (NULL, 'céleri-rave', '11'),
    (NULL, 'gingembre', '12');

-- !---------

-- * feed

INSERT INTO
    `feed` (
        `Id_feed`, `label_feed`, `Id_culture`
    )
VALUES (NULL, 'foin', '13');

INSERT INTO
    `feed` (
        `Id_feed`, `label_feed`, `Id_culture`
    )
VALUES (NULL, 'paille', '14'),
    (NULL, 'fanes', '15');

-- !---------

-- * oleaginous

INSERT INTO
    `oleaginous` (
        `Id_oleaginous`, `label_oleaginous`, `Id_culture`
    )
VALUES (NULL, 'lin', '3');

INSERT INTO
    `oleaginous` (
        `Id_oleaginous`, `label_oleaginous`, `Id_culture`
    )
VALUES (NULL, 'tournesol', '16'),
    (NULL, 'soja', '17');

-- !-----------------------------------------------

-- *-------------------------------- Horti-Culture

INSERT INTO
    `horticulture` (`Id_Horticulture`)
VALUES ('3'),
    ('4'),
    ('5'),
    ('6'),
    ('7'),
    ('8'),
    ('9'),
    ('10'),
    ('11'),
    ('12'),
    ('13'),
    ('14'),
    ('15'),
    ('16'),
    ('17'),
    ('18'),
    ('19'),
    ('20');

-- !---------

-- * Vegetales

INSERT INTO
    `vegetable` (
        `Id_vegetable`, `label_vegetable`, `Id_Horticulture`
    )
VALUES (NULL, 'poireau', '3');

INSERT INTO
    `vegetable` (
        `Id_vegetable`, `label_vegetable`, `Id_Horticulture`
    )
VALUES (NULL, 'radis', '4'),
    (NULL, 'courgette', '5'),
    (NULL, 'laitue', '6');

-- !---------

-- * Fruits

INSERT INTO
    `fruit` (
        `Id_fruit`, `label_fruit`, `Id_Horticulture`
    )
VALUES (NULL, 'abricot', '7');

INSERT INTO
    `fruit` (
        `Id_fruit`, `label_fruit`, `Id_Horticulture`
    )
VALUES (NULL, 'poire', '8'),
    (NULL, 'pêche', '9'),
    (NULL, 'framboise', '10'),
    (NULL, 'groseille', '11'),
    (NULL, 'noisette', '12'),
    (NULL, 'amande', '13');

-- !-----------------------------------------------

-- *---------------------------------- Production
-- *Change names if needed, it's normaly product name here like "fraise de plougastel"

INSERT INTO
    `production` (`Id_Product`, `product_name`)
VALUES (NULL, 'blé'),
    (NULL, 'orge'),
    (NULL, 'maïs'),
    (NULL, 'pomme de terre'),
    (NULL, 'carotte'),
    (NULL, 'panais'),
    (NULL, 'betterave'),
    (NULL, 'navet'),
    (NULL, 'radis'),
    (NULL, 'céleri-rave'),
    (NULL, 'gingembre'),
    (NULL, 'foin'),
    (NULL, 'paille'),
    (NULL, 'fanes'),
    (NULL, 'lin'),
    (NULL, 'tournesol'),
    (NULL, 'soja');

INSERT INTO
    `production` (`Id_Product`, `product_name`)
VALUES (NULL, 'bouse');

-- !-----------------------------------------------

-- *---------------------------------- Breeding
INSERT INTO
    `breeding` (
        `Id_breeding`, `label_breeding`
    )
VALUES (NULL, 'groupe 1');

INSERT INTO
    `breeding` (
        `Id_breeding`, `label_breeding`
    )
VALUES (NULL, 'groupe 2'),
    (NULL, 'groupe 3'),
    (NULL, 'groupe 4'),
    (NULL, 'groupe 5');
-- !-----------------------------------------------

-- *---------------------------------- Animal
INSERT INTO
    `animal` (`Id_animal`, `animal_name`)
VALUES (NULL, 'Marguerite');

INSERT INTO
    `animal` (`Id_animal`, `animal_name`)
VALUES (NULL, 'Bessie'),
    (NULL, 'Brownie'),
    (NULL, 'Bouton d\'or'),
    (NULL, 'Clarabelle'),
    (NULL, 'Dottie'),
    (NULL, 'Guinness'),
    (NULL, 'Magic'),
    (NULL, 'Nellie'),
    (NULL, 'Penelope'),
    (NULL, 'Penny'),
    (NULL, 'Rosie'),
    (NULL, 'Flocon de neige'),
    (NULL, 'Sprinkles'),
    (NULL, 'Sucre'),
    (NULL, 'Gertie'),
    (NULL, 'Blackjack'),
    (NULL, 'Onyx'),
    (NULL, 'Ombre'),
    (NULL, 'Tux'),
    (NULL, 'Miel'),
    (NULL, 'Moka');

-- !-----------------------------------------------

-- *---------------------------------- Race

INSERT INTO
    `race` (`Id_race`, `label_race`)
VALUES (NULL, 'abondance');

INSERT INTO
    `race` (`Id_race`, `label_race`)
VALUES (NULL, 'aubrac'),
    (NULL, 'bazadaise'),
    (NULL, 'blanc bleu'),
    (NULL, 'bleu nord'),
    (NULL, 'blonde d\'aquitaine'),
    (NULL, 'bretonne pie noire'),
    (NULL, 'brune'),
    (NULL, 'camarguaise'),
    (NULL, 'charolaise'),
    (NULL, 'corse'),
    (NULL, 'gasconne'),
    (NULL, 'jersiaise'),
    (NULL, 'limousine'),
    (NULL, 'montbéliarde'),
    (NULL, 'normande'),
    (NULL, 'parthenaise'),
    (NULL, 'pie rouge des plaines'),
    (NULL, 'prim hosltein'),
    (NULL, 'rouge des prés'),
    (NULL, 'rouge flamande'),
    (NULL, 'salers'),
    (NULL, 'simmental française'),
    (NULL, 'tarentaise'),
    (NULL, 'vosgienne');
-- * race à viande : charolaise, limousine, blonde d'aquitaine, rouge des prés, la salers, gasconne, aubrac, blanc bleu, bazadaise, parthenaise
-- * race laitière : holstein,prim'hosltein, bretonne pie noire, jersaise, simmental,montbéliarde, brune, abondance,normande, rouge flamande,salers

-- !-----------------------------------------------

-- *---------------------------------- animal type
INSERT INTO
    `animal_type` (
        `Id_animal_type`, `label_atype`
    )
VALUES (NULL, 'viande'),
    (NULL, 'lait');

-- !-----------------------------------------------

-- *---------------------------------- unity

INSERT INTO
    `unity` (`Id_Unity`, `label_unity`)
VALUES (NULL, 'l'),
    (NULL, 'ha'),
    (NULL, 'm2');

-- !-----------------------------------------------

-- *---------------------------------- treatement type
INSERT INTO
    `treatement` (
        `Id_treatement`, `label_treatement`
    )
VALUES (NULL, 'herbicides');

INSERT INTO
    `treatement` (
        `Id_treatement`, `label_treatement`
    )
VALUES (NULL, 'fongicides'),
    (NULL, 'insecticides'),
    (NULL, 'engrais liquides');
-- !-----------------------------------------------

-- *---------------------------------- treatement
INSERT INTO
    `treatement` (
        `Id_treatement`, `label_treatement`
    )
VALUES (NULL, 'corne');

INSERT INTO
    `treatement` (
        `Id_treatement`, `label_treatement`
    )
VALUES (NULL, 'guano'),
    (NULL, 'sang desséché'),
    (NULL, 'poudre d\'os'),
    (NULL, 'tourteau de ricin'),
    (NULL, 'purin');

-- !-------------------------------------------------------------
-- *---------------------------------- premier pas insertion
-- !-----------------------------------------------
-- *--------------------- à partir de fiche élevage p.2 du pdf

-- TODO : insert 65 nom vache holstein et 15 normandes
-- TODO : insert "17v" comme groupe d'appartenance
-- TODO : insert "78" en nom de terrain et link le groupe à ce dernier
-- TODO : insert la prod de :
-- année 2014 70500 kg
-- année 2015 65200 kg
-- année 2016 69805 kg
-- année 2017 72110 kg
-- TODO : insert l'alimentation :
-- année 2014 - mais 7500 kg - soja 18000kg – fourrage 45000kg
-- année 2015 - mais 9500 kg - soja 15000kg – fourrage 44000kg
-- année 2016 - mais 6800 kg - soja 17000kg – fourrage 45000kg
-- année 2017 - mais 8500 kg - soja 19000kg – fourrage 45000kg

-- !-----------------------------------------------
-- *--------------------- 65 holst et 15 norm
INSERT INTO
    `animal` (`Id_animal`, `animal_name`)
VALUES (NULL, 'holstone'),
    (NULL, 'holsttwo'),
    (NULL, 'holstthree'),
    (NULL, 'holstfour'),
    (NULL, 'holstfive'),
    (NULL, 'holstsix'),
    (NULL, 'holstseven'),
    (NULL, 'holstnine'),
    (NULL, 'holstten'),
    (NULL, 'holsteleven'),
    (NULL, 'holsttwelve'),
    (NULL, 'holstthirteen'),
    (NULL, 'holstfourteen'),
    (NULL, 'holstfifteen'),
    (NULL, 'holstsixteen'),
    (NULL, 'holstseventeen'),
    (NULL, 'holsteighteen'),
    (NULL, 'holstnineteen'),
    (NULL, 'holsttwenty'),
    (NULL, 'holsttwentyone'),
    (NULL, 'holsttwentytwo'),
    (NULL, 'holsttwentythree'),
    (NULL, 'holsttwentyfour'),
    (NULL, 'holsttwentyfive'),
    (NULL, 'holsttwentysix'),
    (NULL, 'holsttwentyseven'),
    (NULL, 'holsttwentyeight'),
    (NULL, 'holsttwentynine'),
    (NULL, 'holstthirty'),
    (NULL, 'holstthirtyone'),
    (NULL, 'holstthirtytwo'),
    (NULL, 'holstthirtyfour'),
    (NULL, 'holstthirtyfive'),
    (NULL, 'holstthirtysix'),
    (NULL, 'holstthirtyseven'),
    (NULL, 'holstthirtyeight'),
    (NULL, 'holstthirtynine'),
    (NULL, 'holstforty'),
    (NULL, 'holstfortyone'),
    (NULL, 'holstfortytwo'),
    (NULL, 'holstfortythree'),
    (NULL, 'holstfortyfour'),
    (NULL, 'holstfortyfive'),
    (NULL, 'holstfortysix'),
    (NULL, 'holstfortyseven'),
    (NULL, 'holstfortyeight'),
    (NULL, 'holstfortynine'),
    (NULL, 'holstfivty'),
    (NULL, 'holstfivtyone'),
    (NULL, 'holstfivtytwo'),
    (NULL, 'holstfivtythree'),
    (NULL, 'holstfivtyfour'),
    (NULL, 'holstfivtyfive'),
    (NULL, 'holstfivtysix'),
    (NULL, 'holstfivtyseven'),
    (NULL, 'holstfivtyeight'),
    (NULL, 'holstfivtynine'),
    (NULL, 'holstsixty'),
    (NULL, 'holstsixtyone'),
    (NULL, 'holstsixtytwo'),
    (NULL, 'holstsixtythree'),
    (NULL, 'holstsixtyfour'),
    (NULL, 'holstsixtyfive'),
    (NULL, 'holstsixtysix'),
    (NULL, 'holstsixtyseven'),
    (NULL, 'holstsixtyeight'),
    (NULL, 'holstsixtynine'),
    (NULL, 'holstseventy'),
    (NULL, 'holstseventyone'),
    (NULL, 'holstseventytwo'),
    (NULL, 'holstseventythree'),
    (NULL, 'holstseventyfour'),
    (NULL, 'holstseventyfive'),
    (NULL, 'holstseventysix'),
    (NULL, 'holstseventyseven'),
    (NULL, 'holstseventyeight'),
    (NULL, 'holstseventynine');

INSERT INTO
    `animal` (`Id_animal`, `animal_name`)
VALUES (NULL, 'normone'),
    (NULL, 'normtwo'),
    (NULL, 'normthree'),
    (NULL, 'normfour'),
    (NULL, 'normfive'),
    (NULL, 'normsix'),
    (NULL, 'normseven'),
    (NULL, 'normnine'),
    (NULL, 'normten'),
    (NULL, 'normeleven'),
    (NULL, 'normtwelve'),
    (NULL, 'normthirteen'),
    (NULL, 'normfourteen'),
    (NULL, 'normfifteen');
-- *!---------------------------------------------
-- *!---------------31/01/24----------------------
-- *!---------------------------------------------

-- TODO : insert "17v" comme groupe d'appartenance

INSERT INTO
    `breeding` (
        `Id_breeding`, `label_breeding`
    )
VALUES (NULL, '17v');

-- TODO : insert "78" en nom de terrain et link le groupe à ce dernier
INSERT INTO
    `field` (
        `label_field`, `gps_id`, `Id_Type_Field`
    )
VALUES ('78', '0', '4');

INSERT INTO
    `field` (
        `label_field`, `gps_id`, `Id_Type_Field`
    )
VALUES (
        '42', '45,547896251 - 65,14562451', '5'
    ),
    (
        '47', '45,547896254 - 65,14562456', '4'
    );

-- TODO : insert la prod de :
-- année 2014 70500 kg
-- année 2015 65200 kg
-- année 2016 69805 kg
-- année 2017 72110 kg
-- TODO : Etape 1) is_part_of => gp = 17v <-> 65 holst et 15 norm

-- ! ATTENTION les FK doivent être en on cascade
-- TODO : Holst
INSERT INTO
    `is_part_of` (
        `Id_breeding`, `Id_animal`, `date_part_of`
    )
VALUES (
        '6', '177', '2014-01-01 10:40:28'
    );

INSERT INTO
    `is_part_of` (
        `Id_breeding`, `Id_animal`, `date_part_of`
    )
VALUES (
        '6', '178', '2014-01-01 10:40:28'
    ),
    (
        '6', '179', '2014-01-01 10:40:28'
    ),
    (
        '6', '180', '2014-01-01 10:40:28'
    ),
    (
        '6', '181', '2014-01-01 10:40:28'
    ),
    (
        '6', '182', '2014-01-01 10:40:28'
    ),
    (
        '6', '183', '2014-01-01 10:40:28'
    ),
    (
        '6', '184', '2014-01-01 10:40:28'
    ),
    (
        '6', '185', '2014-01-01 10:40:28'
    ),
    (
        '6', '186', '2014-01-01 10:40:28'
    ),
    (
        '6', '187', '2014-01-01 10:40:28'
    ),
    (
        '6', '188', '2014-01-01 10:40:28'
    ),
    (
        '6', '189', '2014-01-01 10:40:28'
    ),
    (
        '6', '190', '2014-01-01 10:40:28'
    ),
    (
        '6', '191', '2014-01-01 10:40:28'
    ),
    (
        '6', '192', '2014-01-01 10:40:28'
    ),
    (
        '6', '193', '2014-01-01 10:40:28'
    ),
    (
        '6', '194', '2014-01-01 10:40:28'
    ),
    (
        '6', '195', '2014-01-01 10:40:28'
    ),
    (
        '6', '196', '2014-01-01 10:40:28'
    ),
    (
        '6', '197', '2014-01-01 10:40:28'
    ),
    (
        '6', '198', '2014-01-01 10:40:28'
    ),
    (
        '6', '199', '2014-01-01 10:40:28'
    ),
    (
        '6', '200', '2014-01-01 10:40:28'
    ),
    (
        '6', '201', '2014-01-01 10:40:28'
    ),
    (
        '6', '202', '2014-01-01 10:40:28'
    ),
    (
        '6', '203', '2014-01-01 10:40:28'
    ),
    (
        '6', '204', '2014-01-01 10:40:28'
    ),
    (
        '6', '205', '2014-01-01 10:40:28'
    ),
    (
        '6', '206', '2014-01-01 10:40:28'
    ),
    (
        '6', '207', '2014-01-01 10:40:28'
    ),
    (
        '6', '208', '2014-01-01 10:40:28'
    ),
    (
        '6', '209', '2014-01-01 10:40:28'
    ),
    (
        '6', '210', '2014-01-01 10:40:28'
    ),
    (
        '6', '211', '2014-01-01 10:40:28'
    ),
    (
        '6', '212', '2014-01-01 10:40:28'
    ),
    (
        '6', '213', '2014-01-01 10:40:28'
    ),
    (
        '6', '214', '2014-01-01 10:40:28'
    ),
    (
        '6', '215', '2014-01-01 10:40:28'
    ),
    (
        '6', '216', '2014-01-01 10:40:28'
    ),
    (
        '6', '217', '2014-01-01 10:40:28'
    ),
    (
        '6', '218', '2014-01-01 10:40:28'
    ),
    (
        '6', '219', '2014-01-01 10:40:28'
    ),
    (
        '6', '220', '2014-01-01 10:40:28'
    ),
    (
        '6', '221', '2014-01-01 10:40:28'
    ),
    (
        '6', '222', '2014-01-01 10:40:28'
    ),
    (
        '6', '223', '2014-01-01 10:40:28'
    ),
    (
        '6', '224', '2014-01-01 10:40:28'
    ),
    (
        '6', '225', '2014-01-01 10:40:28'
    ),
    (
        '6', '226', '2014-01-01 10:40:28'
    ),
    (
        '6', '227', '2014-01-01 10:40:28'
    ),
    (
        '6', '228', '2014-01-01 10:40:28'
    ),
    (
        '6', '229', '2014-01-01 10:40:28'
    ),
    (
        '6', '230', '2014-01-01 10:40:28'
    ),
    (
        '6', '231', '2014-01-01 10:40:28'
    ),
    (
        '6', '232', '2014-01-01 10:40:28'
    ),
    (
        '6', '233', '2014-01-01 10:40:28'
    ),
    (
        '6', '234', '2014-01-01 10:40:28'
    ),
    (
        '6', '235', '2014-01-01 10:40:28'
    ),
    (
        '6', '236', '2014-01-01 10:40:28'
    ),
    (
        '6', '237', '2014-01-01 10:40:28'
    ),
    (
        '6', '238', '2014-01-01 10:40:28'
    ),
    (
        '6', '239', '2014-01-01 10:40:28'
    );

-- TODO : Norm

INSERT INTO
    `is_part_of` (
        `Id_breeding`, `Id_animal`, `date_part_of`
    )
VALUES (
        '6', '254', '2014-01-01 10:40:28'
    ),
    (
        '6', '255', '2014-01-01 10:40:28'
    ),
    (
        '6', '256', '2014-01-01 10:40:28'
    ),
    (
        '6', '257', '2014-01-01 10:40:28'
    ),
    (
        '6', '258', '2014-01-01 10:40:28'
    ),
    (
        '6', '259', '2014-01-01 10:40:28'
    ),
    (
        '6', '260', '2014-01-01 10:40:28'
    ),
    (
        '6', '261', '2014-01-01 10:40:28'
    ),
    (
        '6', '262', '2014-01-01 10:40:28'
    ),
    (
        '6', '263', '2014-01-01 10:40:28'
    ),
    (
        '6', '264', '2014-01-01 10:40:28'
    ),
    (
        '6', '265', '2014-01-01 10:40:28'
    ),
    (
        '6', '266', '2014-01-01 10:40:28'
    ),
    (
        '6', '267', '2014-01-01 10:40:28'
    );

-- TODO : Etape 2) production : bouse (Id_product : 20)
-- TODO : insert la prod de :
-- année 2014 70500 kg
-- année 2015 65200 kg
-- année 2016 69805 kg
-- année 2017 72110 kg

-- TODO : 2014
-- *Si on fait toutes les deux heures
-- 1161.29 sum(janv) 8.4% //sum(qtt_bouse) = 5921
-- 1039.10 sum(fev) 7.5% //sum(qb) = 5288
-- 1074.92 sum(mars)
-- 1188.36 sum(avr)
-- 1123.37 sum(mai)
-- 1061.41 sum(juin)
-- 1177.88 sum(juil)
-- 1173.25 sum(aout)
-- 998.95 sum(sep)
-- 1346.55 sum(oct)
-- 1214.54 sum(nov)
-- 1226.33 sum(dec)
--sum(tot) = 13785.95

--(janv)
-- [8.29;11.11;10.36;8.31;10.46;10.53;9.21;8.6;3.7;5.62;7.88;5.86]
--correspondance 31jours: [491;668;613.5;499;619;623.5;545;509;208;332.5;466.5;347]
--correspondance 1jour: [16;21.5;20;16;20;20;17.5;16;7;11;15;11]

-- janvier : mercredi 1 02.00.00
INSERT INTO
    `breed_give` (
        `Id_Product`, `Id_breeding`, `date_breed`, `qtx_give`
    )
VALUES (
        '20', '6', '2014-01-01 02:00:00', '16'
    );

INSERT INTO
    `breed_give` (
        `Id_Product`, `Id_breeding`, `date_breed`, `qtx_give`
    )
VALUES (
        '20', '6', '2014-01-01 04:00:00', '21.5'
    ),
    (
        '20', '6', '2014-01-01 06:00:00', '20'
    ),
    (
        '20', '6', '2014-01-01 08:00:00', '16'
    ),
    (
        '20', '6', '2014-01-01 10:00:00', '20'
    ),
    (
        '20', '6', '2014-01-01 12:00:00', '20'
    ),
    (
        '20', '6', '2014-01-01 14:00:00', '17.5'
    ),
    (
        '20', '6', '2014-01-01 16:00:00', '16'
    ),
    (
        '20', '6', '2014-01-01 18:00:00', '7'
    ),
    (
        '20', '6', '2014-01-01 20:00:00', '11'
    ),
    (
        '20', '6', '2014-01-01 22:00:00', '15'
    ),
    (
        '20', '6', '2014-01-01 23:59:59', '11'
    );

INSERT INTO
    `breed_give` (
        `Id_Product`, `Id_breeding`, `date_breed`, `qtx_give`
    )
VALUES (
        '20', '6', '2014-01-02 02:00:00', '16'
    ),
    (
        '20', '6', '2014-01-02 04:00:00', '21.5'
    ),
    (
        '20', '6', '2014-01-02 06:00:00', '20'
    ),
    (
        '20', '6', '2014-01-02 08:00:00', '16'
    ),
    (
        '20', '6', '2014-01-02 10:00:00', '20'
    ),
    (
        '20', '6', '2014-01-02 12:00:00', '20'
    ),
    (
        '20', '6', '2014-01-02 14:00:00', '17.5'
    ),
    (
        '20', '6', '2014-01-02 16:00:00', '16'
    ),
    (
        '20', '6', '2014-01-02 18:00:00', '7'
    ),
    (
        '20', '6', '2014-01-02 20:00:00', '11'
    ),
    (
        '20', '6', '2014-01-02 22:00:00', '15'
    ),
    (
        '20', '6', '2014-01-02 23:59:59', '11'
    );

-- !------------------------------------------------
-- !------------------------------------------------

--Culture give :
-- par mois en 2014
-- exemple : 7500kg maïs, 3750 pour oct et nov,

-- INSERT INTO
--     `cult_give` (
--         `Id_Product`, `Id_culture`, `date_cult`, `qtx_cult`
--     )
-- VALUES (
--         '5', '4', '2014-01-31 23:59:59', '625'
--     );

INSERT INTO
    `cult_give` (
        `Id_Product`, `Id_culture`, `date_cult`, `qtx_cult`
    )
VALUES (
        '5', '4', '2014-10-31 23:59:59', '3750'
    ),
    (
        '5', '4', '2014-11-30 23:59:59', '3750'
    );

-- !-----------------------------------

--Culture give :
-- par mois en 2014
-- exemple : 18000kg soja, 9000 pour sep et oct, id_culture :17
INSERT INTO
    `cult_give` (
        `Id_Product`, `Id_culture`, `date_cult`, `qtx_cult`
    )
VALUES (
        '19', '17', '2014-09-30 23:59:59', '9000'
    ),
    (
        '19', '17', '2014-10-31 23:59:59', '9000'
    );
-- !-----------------------------------
INSERT INTO
    `production` (`Id_Product`, `product_name`)
VALUES (NULL, 'fourrage');
--Culture give :
-- par mois en 2014
-- exemple : 45000kg fourrage, fourrage =  25_000 foin + 10_000 paille + 5_000 fanes + 2_500 betterave + 2_000 radis  + 500 maïs
INSERT INTO
    `cult_give` (
        `Id_Product`, `Id_culture`, `date_cult`, `qtx_cult`
    )
VALUES (
        '21', '13', '2014-06-30 23:59:59', '12500'
    ),
    (
        '21', '13', '2014-07-31 23:59:59', '12500'
    ),
    (
        '21', '14', '2014-06-30 23:59:59', '1667'
    ),
    (
        '21', '14', '2014-07-31 23:59:59', '1667'
    ),
    (
        '21', '14', '2014-08-31 23:59:59', '1667'
    ),
    (
        '21', '14', '2014-09-30 23:59:59', '1667'
    ),
    (
        '21', '14', '2014-10-31 23:59:59', '1667'
    ),
    (
        '21', '14', '2014-11-30 23:59:59', '1667'
    ),
    (
        '21', '15', '2014-03-31 23:59:59', '833.3'
    ),
    (
        '21', '15', '2014-04-30 23:59:59', '833.3'
    ),
    (
        '21', '15', '2014-05-31 23:59:59', '833.3'
    ),
    (
        '21', '15', '2014-06-30 23:59:59', '833.3'
    ),
    (
        '21', '15', '2014-07-31 23:59:59', '833.3'
    ),
    (
        '21', '15', '2014-08-31 23:59:59', '833.3'
    ),
    (
        '21', '8', '2014-06-30 23:59:59', '500'
    ),
    (
        '21', '8', '2014-07-31 23:59:59', '500'
    ),
    (
        '21', '8', '2014-08-31 23:59:59', '500'
    ),
    (
        '21', '8', '2014-09-30 23:59:59', '500'
    ),
    (
        '21', '8', '2014-10-31 23:59:59', '500'
    ),
    (
        '21', '10', '2014-06-30 23:59:59', '500'
    ),
    (
        '21', '10', '2014-07-31 23:59:59', '500'
    ),
    (
        '21', '10', '2014-08-31 23:59:59', '500'
    ),
    (
        '21', '10', '2014-09-30 23:59:59', '500'
    ),
    (
        '21', '10', '2014-10-31 23:59:59', '500'
    ),
    (
        '21', '4', '2014-10-31 23:59:59', '250'
    ),
    (
        '21', '4', '2014-11-30 23:59:59', '250'
    );

-- !----------------------------
--label : unity
-- kg id = 1
--
INSERT INTO
    `link_to_feed` (`Id_Unity`, `Id_feed`)
VALUES ('1', '1');

INSERT INTO
    `link_to_feed` (`Id_Unity`, `Id_feed`)
VALUES ('1', '2'),
    ('1', '3');

INSERT INTO
    `link_to_cereal` (`Id_Unity`, `Id_cereal`)
VALUES ('1', '5');

INSERT INTO
    `link_to_oleaginous` (`Id_Unity`, `Id_oleaginous`)
VALUES ('1', '3');

INSERT INTO
    `link_to_under_earth` (`Id_Unity`, `Id_under_earth`)
VALUES ('1', '4'),
    ('1', '6');

--!-----------------------------------------------
--!------------------ fin 2014 -------------------
--!-----------------------------------------------

-- *----------------------------------------------
-- *------------- culture 2023 -------------------
-- *----------------------------------------------
-- céréales en sol sableux 193 Tonnes (fin 2023)
-- céréales : (100 T) blé , (50 T) orge, (43 T) maïs
-- sol sableux : id = 2
-- !cult_is_for ne sert à rien ?!?
-- !avec et sans apport se differencie suivant le terrain, si c'est pas spécifié c'est sans.
-- * cult_giv et is_cult_affilied
-- * récolte pour la dernière période. (septembre/octobre)
-- *---------------
-- * Pomme de terre
INSERT INTO
    `cult_give` (
        `Id_Product`, `Id_culture`, `date_cult`, `qtx_cult`, `id_unity`
    )
VALUES (
        '6', '5', '2023-09-30 23:00:00.000000', '988', '6'
    );

INSERT INTO
    `cult_give` (
        `Id_Product`, `Id_culture`, `date_cult`, `qtx_cult`, `id_unity`
    )
VALUES (
        '6', '5', '2023-09-30 23:10:00.000000', '860', '6'
    );

INSERT INTO
    `is_cult_affilied` (
        `Num_Field`, `Id_culture`, `date_cult_affilied`
    )
VALUES (
        '15', '5', '2023-09-30 23:00:00.000000'
    ),
    (
        '25', '5', '2023-09-30 23:10:00.000000'
    );
-- *--------------------------------------------
INSERT INTO
    `cult_give` (
        `Id_Product`, `Id_culture`, `date_cult`, `qtx_cult`, `id_unity`
    )
VALUES (
        '6', '5', '2023-09-30 23:20:00.000000', '143', '6'
    ),
    (
        '6', '5', '2023-09-30 23:30:00.000000', '3152', '6'
    ),
    (
        '6', '5', '2023-09-30 23:40:00.000000', '7545', '6'
    ),
    (
        '6', '5', '2023-09-30 23:50:00.000000', '59', '6'
    ),
    (
        '6', '5', '2023-09-30 23:15:00.000000', '1780', '6'
    ),
    (
        '6', '5', '2023-09-30 23:25:00.000000', '11', '6'
    ),
    (
        '6', '5', '2023-09-30 23:35:00.000000', '287', '6'
    ),
    (
        '6', '5', '2023-09-30 23:45:00.000000', '244', '6'
    ),
    (
        '6', '5', '2023-09-30 23:55:00.000000', '86', '6'
    );

INSERT INTO
    `is_cult_affilied` (
        `Num_Field`, `Id_culture`, `date_cult_affilied`
    )
VALUES (
        '18', '5', '2023-09-30 23:20:00.000000'
    ),
    (
        '26', '5', '2023-09-30 23:30:00.000000'
    ),
    (
        '20', '5', '2023-09-30 23:40:00.000000'
    ),
    (
        '4', '5', '2023-09-30 23:50:00.000000'
    ),
    (
        '23', '5', '2023-09-30 23:15:00.000000'
    ),
    (
        '16', '5', '2023-09-30 23:25:00.000000'
    ),
    (
        '27', '5', '2023-09-30 23:35:00.000000'
    ),
    (
        '28', '5', '2023-09-30 23:45:00.000000'
    ),
    (
        '17', '5', '2023-09-30 23:55:00.000000'
    );

--*--------------------------------------------------
--!--------------------------------------------------
--TODO : HERE----------------------------------------
--TODO : Céréales => de la table "cereal" id_culture : 1, 2, 4
--TODO : reste => num_field associé
--* DONE : qtx,...etc.
--!--------------------------------------------------
INSERT INTO
    `cult_give` (
        `Id_Product`, `Id_culture`, `date_cult`, `qtx_cult`, `id_unity`
    )
VALUES (
        '3', '1', '2023-09-30 23:00:00.000000', '193', '6'
    ),
    (
        '4', '2', '2023-09-30 23:10:00.000000', '694', '6'
    ),
    (
        '5', '4', '2023-09-30 23:20:00.000000', '104', '6'
    ),
    (
        '3', '1', '2023-09-30 23:30:00.000000', '1605', '6'
    ),
    (
        '4', '2', '2023-09-30 23:40:00.000000', '713', '6'
    ),
    (
        '5', '4', '2023-09-30 23:50:00.000000', '5', '6'
    ),
    (
        '3', '1', '2023-09-30 23:15:00.000000', '54', '6'
    ),
    (
        '4', '2', '2023-09-30 23:25:00.000000', '4', '6'
    ),
    (
        '5', '4', '2023-09-30 23:35:00.000000', '11', '6'
    ),
    (
        '3', '1', '2023-09-30 23:45:00.000000', '60', '6'
    ),
    (
        '4', '2', '2023-09-30 23:55:00.000000', '37', '6'
    );

INSERT INTO
    `is_cult_affilied` (
        `Num_Field`, `Id_culture`, `date_cult_affilied`
    )
VALUES (
        '15', '1', '2023-09-30 23:00:00.000000'
    ),
    (
        '26', '2', '2023-09-30 23:10:00.000000'
    ),
    (
        '18', '4', '2023-09-30 23:20:00.000000'
    ),
    (
        '26', '1', '2023-09-30 23:30:00.000000'
    ),
    (
        '20', '2', '2023-09-30 23:40:00.000000'
    ),
    (
        '4', '4', '2023-09-30 23:50:00.000000'
    ),
    (
        '23', '1', '2023-09-30 23:15:00.000000'
    ),
    (
        '16', '2', '2023-09-30 23:25:00.000000'
    ),
    (
        '27', '4', '2023-09-30 23:35:00.000000'
    ),
    (
        '28', '1', '2023-09-30 23:45:00.000000'
    ),
    (
        '17', '2', '2023-09-30 23:55:00.000000'
    );

--*--------------------------------------------------
--!--------------------------------------------------
--TODO : END HERE------------------------------------
--!--------------------------------------------------

--TODO : relier les produits blé, orge, maïs à un field qui a pour type sable
--TODO : faire des fields

----------TODO :
--Cadre dispo
--48.453961, -1.046988 --49.234798, 5.997437
--43.782179, -0.871206 --43.524430, 5.979131

--Data GPS :48.453961, -1.046988 // 48.360699, 0.743968

--Data GPS Autre:48.398290, 2.951226//48.351297, 5.512211
--47.612584, -0.840730 // 47.831509, 1.309932 // 47.831509, 3.432295 // 47.831509, 5.073589

--46.601445, -0.090828 // 46.620884, 1.762702 // 46.679160, 3.757724 //

-- 46.679160, 5.229229

--45.640367, -0.204021//45.660148, 1.239186 //45.749078, 2.611648 //

--45.778690, 4.083153

--44.882904, -0.072478 //
--*---------------------------------------------------------
--* stop
--44.957040, 2.719488 //45.018748, 4.726213 // 45.055740, 5.965148
INSERT INTO
    `field` (
        `Num_Field`, `label_field`, `gps_id`, `Id_Type_Field`
    )
VALUES (
        NULL, '3', '43.782179, -0.871206', '1'
    );

INSERT INTO
    `field` (
        `Num_Field`, `label_field`, `gps_id`, `Id_Type_Field`
    )
VALUES (
        NULL, '4', '43.524430, 5.979131', '2'
    ),
    (
        NULL, '5', '46.620884, 1.762702', '3'
    ),
    (
        NULL, '6', '48.360699, 0.743968', '4'
    ),
    (
        NULL, '7', '48.398290, 2.951226', '5'
    ),
    (
        NULL, '8', '48.351297, 5.512211', '1'
    ),
    (
        NULL, '9', '47.612584, -0.840730', '2'
    ),
    (
        NULL, '10', '47.831509, 1.309932', '3'
    ),
    (
        NULL, '11', '47.831509, 3.432295', '4'
    ),
    (
        NULL, '12', '47.831509, 5.073589', '5'
    ),
    (
        NULL, '13', '46.601445, -0.090828', '1'
    );

INSERT INTO
    `field` (
        `Num_Field`, `label_field`, `gps_id`, `Id_Type_Field`
    )
VALUES (
        NULL, '14', '46.679160, 5.229229', '6'
    );

INSERT INTO
    `field` (
        `Num_Field`, `label_field`, `gps_id`, `Id_Type_Field`
    )
VALUES (
        NULL, '15', '45.640367, -0.204021', '6'
    );

INSERT INTO
    `field` (
        `Num_Field`, `label_field`, `gps_id`, `Id_Type_Field`
    )
VALUES (
        NULL, '16', '45.660148, 1.239186', '7'
    );

INSERT INTO
    `field` (
        `Num_Field`, `label_field`, `gps_id`, `Id_Type_Field`
    )
VALUES (
        NULL, '17', '45.778690, 4.083153', '8'
    );

INSERT INTO
    `field` (
        `Num_Field`, `label_field`, `gps_id`, `Id_Type_Field`
    )
VALUES (
        NULL, '18', '44.882904, -0.072478', '6'
    );
-- !----------------------------------------
-- !----------Canva d'insert----------------
-- !----------------------------------------
INSERT INTO
    `field` (
        `Num_Field`, `label_field`, `gps_id`, `Id_Type_Field`
    )
VALUES (
        NULL, '19', '44.957040, 2.719488', '2'
    ),
    (
        NULL, '20', '45.018748, 4.726213', '6'
    ),
    (
        NULL, '21', '45.055740, 5.965148', '5'
    ),
    (
        NULL, '22', '48.630793, 4.747854', '6'
    ),
    (
        NULL, '23', '48.572672, 5.780569', '2'
    ),
    (
        NULL, '24', '45.519501, 0.353323', '1'
    ),
    (
        NULL, '25', '45.504103, 1.034476', '5'
    ),
    (
        NULL, '26', '45.303551, 2.199026', '3'
    ),
    (
        NULL, '25', '45.795938, 3.407522', '7'
    ),
    (
        NULL, '26', '44.760064, 5.011526', '8'
    ),
    (
        NULL, '26', '44.274379, 6.110159', '4'
    );

--!-----------------------------------------------
--!------------------ fin 2023 -------------------
--!-----------------------------------------------