# Privilèges pour `admin`@`localhost`

GRANT
SELECT,
INSERT
,
UPDATE,
DELETE,
INDEX,
EXECUTE ON *.* TO `admin` @`localhost`;

GRANT
SELECT,
INSERT
,
UPDATE,
DELETE,
CREATE,
DROP,
INDEX,
ALTER,
EXECUTE ON `fil\_rouge\_farm3`.* TO `admin` @`localhost`;

GRANT
SELECT,
INSERT
,
UPDATE,
DELETE,
CREATE,
DROP,
ALTER,
TRIGGER ON `fil_rouge_farm3`.`agriculteur` TO `admin` @`localhost`;

GRANT
SELECT,
INSERT
,
UPDATE,
DELETE,
CREATE,
DROP,
ALTER,
TRIGGER ON `fil_rouge_farm3`.`employee` TO `admin` @`localhost`;

GRANT
SELECT, INDEX,
CREATE VIEW,
SHOW VIEW, TRIGGER ON `fil_rouge_farm3`.`energy` TO `admin` @`localhost`;

GRANT
SELECT,
INSERT
,
UPDATE,
DELETE,
CREATE,
DROP,
ALTER,
TRIGGER ON `fil_rouge_farm3`.`product_energy` TO `admin` @`localhost`;

GRANT
SELECT,
INSERT
,
UPDATE,
DELETE,
CREATE,
DROP,
ALTER,
TRIGGER ON `fil_rouge_farm3`.`rh` TO `admin` @`localhost`;

GRANT
SELECT,
INSERT
,
UPDATE,
DELETE,
CREATE,
DROP,
ALTER,
TRIGGER ON `fil_rouge_farm3`.`speciality` TO `admin` @`localhost`;

GRANT
SELECT, INDEX,
CREATE VIEW,
SHOW VIEW, TRIGGER ON `fil_rouge_farm3`.`unity` TO `admin` @`localhost`;

# Privilèges pour `invited`@`localhost`

GRANT SELECT, EXECUTE ON *.* TO `invited` @`localhost`;

GRANT
SELECT,
EXECUTE ON `fil\_rouge\_farm3`.* TO `invited` @`localhost`;

GRANT
SELECT ON `fil_rouge_farm3`.`agriculteur` TO `invited` @`localhost`;

GRANT
SELECT ON `fil_rouge_farm3`.`employee` TO `invited` @`localhost`;

GRANT SELECT ON `fil_rouge_farm3`.`rh` TO `invited` @`localhost`;

GRANT SELECT ON `fil_rouge_farm3`.`role` TO `invited` @`localhost`;

GRANT
SELECT ON `fil_rouge_farm3`.`speciality` TO `invited` @`localhost`;

# Privilèges pour `rh`@`localhost`

GRANT SELECT, UPDATE, DELETE, EXECUTE ON *.* TO `rh` @`localhost`;

GRANT
SELECT,
UPDATE, DELETE,
EXECUTE ON `fil\_rouge\_farm3`.* TO `rh` @`localhost`;

GRANT
SELECT,
UPDATE, DELETE ON `fil_rouge_farm3`.`agriculteur` TO `rh` @`localhost`;

GRANT
SELECT,
INSERT (`Id_Role`, `Id_Speciality`),
UPDATE,
DELETE ON `fil_rouge_farm3`.`employee` TO `rh` @`localhost`;

GRANT
SELECT,
UPDATE, DELETE ON `fil_rouge_farm3`.`rh` TO `rh` @`localhost`;

GRANT
SELECT,
UPDATE, DELETE ON `fil_rouge_farm3`.`role` TO `rh` @`localhost`;

GRANT
SELECT,
UPDATE, DELETE ON `fil_rouge_farm3`.`speciality` TO `rh` @`localhost`;