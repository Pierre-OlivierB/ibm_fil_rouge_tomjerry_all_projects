INSERT INTO
    save_employee (
        `Id_employee`,
        `First_name`,
        `Last_name`,
        `N_SS`,
        `Id_Role`,
        `Id_Speciality`,
        `pwrd`,
        `email`
    )
VALUES (
        old.`Id_employee`,
        old.`First_name`,
        old.`Last_name`,
        old.`N_SS`,
        old.`Id_Role`,
        old.`Id_Speciality`,
        old.`pwrd`,
        old.`email`
    );

CREATE TRIGGER `trg_save_employee` AFTER DELETE ON `employee` FOR EACH ROW
INSERT INTO
    save_employee (
        `Id_employee`,
        `First_name`,
        `Last_name`,
        `N_SS`,
        `Id_Role`,
        `Id_Speciality`,
        `pwrd`,
        `email`
    )
VALUES (
        old.`Id_employee`,
        old.`First_name`,
        old.`Last_name`,
        old.`N_SS`,
        old.`Id_Role`,
        old.`Id_Speciality`,
        old.`pwrd`,
        old.`email`
    )

    
    CREATE PROCEDURE `countemployee`(IN `numemployee` INT) NOT DETERMINISTIC CONTAINS SQL SQL SECURITY DEFINER BEGIN SELECT COUNT(*) INTO numemployee FROM employee; END

CREATE VIEW view_electricity AS
SELECT Id_Energy, tp.begin_hour, mp.label_name, ebt.qtx_ener
FROM
    energy_by_time as ebt,
    month_product as mp,
    time_period as tp
WHERE
    Id_Energy = 1
    AND mp.Id_Month = ebt.Id_Month
    AND tp.Id_time_period = ebt.Id_time_period
ORDER BY ebt.Id_Month ASC, tp.Id_time_period ASC;