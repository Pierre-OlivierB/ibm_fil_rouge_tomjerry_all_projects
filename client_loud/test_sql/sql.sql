SELECT emp.Id_employee, emp.First_name, emp.Last_name, emp.N_SS, rh.label_rh_job, spe.speciality_label, emp.email
FROM
    `employee` as emp,
    `speciality` as spe,
    `role` as ro,
    `rh`,
    `agriculteur` as agr
WHERE
    emp.Id_employee = 1
    AND emp.Id_Speciality = spe.Id_Speciality
    AND rh.Id_Role = emp.Id_Role;

-- *------------------------------------------------------------------
SELECT emp.Id_employee, emp.First_name, spe.speciality_label
FROM
    `employee` as emp,
    `speciality` as spe
WHERE
    emp.Id_Speciality = spe.Id_Speciality
    -- *---------------------------------------------------
SELECT emp.Id_employee, emp.First_name, rh.label_rh_job, emp.email
FROM `employee` as emp, `rh`
WHERE
    rh.Id_Role = emp.Id_Role;
-- *------------------------------------------------------
SELECT emp.Id_employee, emp.First_name, emp.Last_name, emp.N_SS, rh.label_rh_job, emp.email, spe.speciality_label
FROM
    `employee` as emp,
    `speciality` as spe,
    `rh`
WHERE
    rh.Id_Role = emp.Id_Role
    AND emp.Id_Speciality = spe.Id_Speciality
    AND emp.Id_employee = 1;

-- *--------------------------------------------------
SELECT emp.Id_employee, emp.First_name, emp.Last_name, emp.N_SS, CONCAT(
        rh.label_rh_job, agr.label_agr_job
    ) as job, emp.email, spe.speciality_label
FROM
    `employee` as emp,
    `speciality` as spe,
    `rh`,
    `agriculteur` as agr
WHERE
    emp.Id_employee = 1
    AND (
        emp.Id_Role = rh.label_rh_job
        OR emp.Id_Role = agr.Id_Role
    )
    AND emp.Id_Speciality = spe.Id_Speciality;

-- *--------------------------------------------------
SELECT *
FROM `rh`
UNION
select *
from `agriculteur`
    -- *-----------------------------------------------