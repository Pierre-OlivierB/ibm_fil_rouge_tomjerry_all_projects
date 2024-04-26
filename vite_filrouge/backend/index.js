const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(3001, () => {
  console.log("3001, ok");
});
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fil_rouge_farm3",
  multipleStatements: true,
});

app.get("/electricity", (req, res) => {
  const sql =
    "SELECT Id_Energy, tp.begin_hour,mp.label_name,ebt.qtx_ener" +
    " FROM energy_by_time as ebt, month_product as mp, time_period as tp" +
    " WHERE Id_Energy = 1 AND mp.Id_Month = ebt.Id_Month AND tp.Id_time_period=ebt.Id_time_period" +
    " ORDER BY ebt.Id_Month ASC, tp.Id_time_period ASC;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
});
app.post("/getelecbymonth", (req, res) => {
  // console.log(res);

  let values = req.body.data;
  const frame = [
    "00:00:00",
    "02:00:00",
    "04:00:00",
    "06:00:00",
    "08:00:00",
    "10:00:00",
    "12:00:00",
    "14:00:00",
    "16:00:00",
    "18:00:00",
    "20:00:00",
    "22:00:00",
  ];
  let hour =
    values.begin_hour > 0 || values.begin_hour < 13
      ? frame[values.begin_hour - 1]
      : null;
  let month = values.label_name;
  // console.log("test", hour, month);
  let dataSend = [hour, month];
  const sql =
    " SELECT DISTINCT ebt.qtx_ener" +
    " FROM energy_by_time as ebt, month_product as mp, time_period as tp" +
    " WHERE ebt.Id_time_period=(SELECT tp.Id_time_period FROM time_period as tp WHERE tp.begin_hour=?) AND ebt.Id_Month=(SELECT mp.Id_Month FROM month_product as mp WHERE mp.label_name=?);";
  // console.log(dataSend);
  console.log(dataSend);
  db.query(sql, [...dataSend], (err, result) => {
    // console.log(result);
    if (err) return res.json("error");
    return res.send({ value: result[0] });
  });

  // console.log(req);
  // res.send({ key: "POST ok" });
});
// app.get("/pommedeterre", (req, res) => {
//   const sql =
//     "SELECT tf.name_field as name, cg.qtx_cult as data" +
//     " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c" +
//     " WHERE f.id_type_field=tf.id_type_field" +
//     " AND f.num_field=ica.Num_Field" +
//     " AND ica.Id_culture=5" +
//     " AND cg.Id_culture=5" +
//     " AND c.Id_culture=5" +
//     " AND ica.date_cult_affilied = cg.date_cult;";
//   db.query(sql, (err, result) => {
//     if (err) console.log(err);
//     return res.json(result);
//   });
// });
// !--------------------------------------------
// *New Test
// SELECT tf.name_field as name, cg.qtx_cult as data,WITH_BONUS(f.Num_Field) AS treatement
// FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c
// WHERE f.id_type_field=tf.id_type_field
// AND f.num_field=ica.Num_Field
// AND ica.Id_culture=5
// AND cg.Id_culture=5
// AND c.Id_culture=5
// AND ica.date_cult_affilied = cg.date_cult;
app.get("/culture/pommedeterre", (req, res) => {
  const sql =
    "SELECT CONCAT(tf.name_field,' ',WITH_BONUS(f.Num_Field)) as name, cg.qtx_cult as data" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=5" +
    " AND cg.Id_culture=5" +
    " AND c.Id_culture=5" +
    " AND ica.date_cult_affilied = cg.date_cult;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
});
// !------------------------------------------------------------
app.get("/culture/pommedeterresans", (req, res) => {
  const sql =
    "SELECT DISTINCT(tf.name_field) as name, cg.qtx_cult as data" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c, is_treated as fit" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=5" +
    " AND cg.Id_culture=5" +
    " AND c.Id_culture=5" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit)";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
});
// SELECT DISTINCT(tf.name_field) as name, cg.qtx_cult as data
// FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c, is_treated as fit
// WHERE f.id_type_field=tf.id_type_field
// AND f.num_field=ica.Num_Field
// AND ica.Id_culture=5
// AND cg.Id_culture=5
// AND c.Id_culture=5
// AND ica.date_cult_affilied = cg.date_cult
// AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit)
// !------------------------------------------------------------
app.get("/culture/betterave", (req, res) => {
  const sql =
    "SELECT CONCAT(tf.name_field,' ',WITH_BONUS(f.Num_Field)) as name, cg.qtx_cult as data" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=8" +
    " AND cg.Id_culture=8" +
    " AND c.Id_culture=8" +
    " AND ica.date_cult_affilied = cg.date_cult;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
});
// !------------------------------------------------------------
app.get("/culture/betteravesans", (req, res) => {
  const sql =
    "SELECT DISTINCT(tf.name_field) as name, cg.qtx_cult as data" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c, is_treated as fit" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=8" +
    " AND cg.Id_culture=8" +
    " AND c.Id_culture=8" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit)";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
});
// !------------------------------------------------------------
app.get("/culture/cereal", (req, res) => {
  const sql =
    "SELECT CONCAT(tf.name_field,' ',WITH_BONUS(f.Num_Field)) as name, cg.qtx_cult as data" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c, cereal as cer" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=cer.Id_culture" +
    " AND cg.Id_culture=cer.Id_culture" +
    " AND c.Id_culture=cer.Id_culture" +
    " AND ica.date_cult_affilied = cg.date_cult;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
});
// !------------------------------------------------------------
app.get("/culture/cerealsans", (req, res) => {
  const sql =
    "SELECT DISTINCT(tf.name_field) as name, cg.qtx_cult as data" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c, is_treated as fit, cereal as cer" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=cer.Id_culture" +
    " AND cg.Id_culture=cer.Id_culture" +
    " AND c.Id_culture=cer.Id_culture" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit)";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
});

// !-------------------------------------------------------

app.get("/culture/totsol", (req, res) => {
  const sql =
    "SELECT total_data.name, sum(total_data.data)  as data" +
    " FROM(SELECT DISTINCT CONCAT(tf.name_field,' ',WITH_BONUS(f.Num_Field)) as name, SUM(cg.qtx_cult) as data" +
    " FROM field as f" +
    " JOIN type_field as tf ON f.id_type_field = tf.id_type_field" +
    " JOIN is_cult_affilied as ica ON f.num_field = ica.Num_Field" +
    " JOIN cult_give as cg ON ica.date_cult_affilied = cg.date_cult" +
    " JOIN culture as c ON ica.Id_culture = c.Id_culture" +
    " JOIN cereal as cer ON cer.Id_culture = c.Id_culture" +
    " WHERE ica.Id_culture IN (8,5,cer.Id_culture)" +
    " AND cg.Id_culture IN (8,5,cer.Id_culture)" +
    " AND c.Id_culture IN (8,5,cer.Id_culture)" +
    " GROUP BY name,c.Id_culture,cg.Id_culture,ica.Id_culture) AS total_data" +
    " GROUP BY name";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
});

// !-------------------------------------------------------

app.get("/culture/totsolsans", (req, res) => {
  const sql =
    "SELECT total_data.name, sum(total_data.data) as data" +
    " FROM(SELECT DISTINCT(tf.name_field) as name, cg.qtx_cult as data" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c, is_treated as fit,cereal as cer" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture IN (8,5,cer.Id_culture)" +
    " AND cg.Id_culture IN (8,5,cer.Id_culture)" +
    " AND c.Id_culture IN (8,5,cer.Id_culture)" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit)" +
    " GROUP BY name,c.Id_culture,cg.Id_culture,ica.Id_culture) AS total_data" +
    " GROUP BY name;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
});

// !------------------------------------------------------------
app.get("/culture/totcult", async (req, res) => {
  const sql1 =
    "SELECT Sum(cg.qtx_cult) as data " +
    "FROM field as f, type_field as tf, cult_give as cg, is_cult_affilied as ica, culture as c, cereal as cer " +
    "WHERE f.id_type_field = tf.id_type_field " +
    "AND f.num_field = ica.Num_Field " +
    "AND ica.Id_culture = cer.Id_culture " +
    "AND cg.Id_culture = cer.Id_culture " +
    "AND c.Id_culture = cer.Id_culture " +
    "AND ica.date_cult_affilied = cg.date_cult;" +
    "SELECT SUM(cg.qtx_cult) as data " +
    "FROM field as f, type_field as tf, cult_give as cg, is_cult_affilied as ica, culture as c " +
    "WHERE f.id_type_field = tf.id_type_field " +
    "AND f.num_field = ica.Num_Field " +
    "AND ica.Id_culture = 8 " +
    "AND cg.Id_culture = 8 " +
    "AND c.Id_culture = 8 " +
    "AND ica.date_cult_affilied = cg.date_cult;" +
    "SELECT Sum(cg.qtx_cult) as data " +
    "FROM field as f, type_field as tf, cult_give as cg, is_cult_affilied as ica, culture as c " +
    "WHERE f.id_type_field = tf.id_type_field " +
    "AND f.num_field = ica.Num_Field " +
    "AND ica.Id_culture = 5 " +
    "AND cg.Id_culture = 5 " +
    "AND c.Id_culture = 5 " +
    "AND ica.date_cult_affilied = cg.date_cult;";

  // let lambda = [];
  // console.log("test");

  // const test = await db.query(sql1);
  db.query(sql1, (err, result) => {
    if (err) console.log(err);
    // console.log(result[1][0].data);
    return res.json([
      { name: "cereales", data: result[0][0].data },
      { name: "betterave", data: result[1][0].data },
      { name: "pomme de terre", data: result[2][0].data },
    ]);
  });

  // db.query(sql3, (err, result) => {
  //   if (err) console.log(err);
  //   lambda.push(res.json(result));
  //   console.log("test lambda ", result[0].data);
  // });
  // console.log(res1, res2, res3);
  // console.log("resultat : ", lambda);
});

// !-------------------------------------------------------

app.get("/culture/totcultsans", (req, res) => {
  const sql =
    "SELECT SUM(datas) as data from (SELECT tf.name_field, cg.qtx_cult as datas" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c, is_treated as fit" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=5" +
    " AND cg.Id_culture=5" +
    " AND c.Id_culture=5" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit) GROUP BY tf.name_field)src;" +
    " SELECT SUM(datas) as data from (SELECT tf.name_field, cg.qtx_cult as datas" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c, is_treated as fit" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=8" +
    " AND cg.Id_culture=8" +
    " AND c.Id_culture=8" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit) GROUP BY tf.name_field)src;" +
    " SELECT SUM(datas) as data from (SELECT tf.name_field, cg.qtx_cult as datas" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c, is_treated as fit, cereal as cer" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=cer.Id_culture" +
    " AND cg.Id_culture=cer.Id_culture" +
    " AND c.Id_culture=cer.Id_culture" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit) GROUP BY tf.name_field)src;";

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    // console.log(result);
    return res.json([
      { name: "pomme de terre", data: result[0][0].data },
      { name: "betterave", data: result[1][0].data },
      { name: "cereales", data: result[2][0].data },
    ]);
  });
});

// !-------------------------------------------------
// !-------------------------------------------------
// *-------horticulture------------------------------
// !-------------------------------------------------
// !-------------------------------------------------

app.get("/horticulture/legume", (req, res) => {
  const sql =
    "SELECT f.num_field, CONCAT(" +
    "tf.name_field, ' ', WITH_BONUS (f.Num_Field)" +
    ") as name, hg.qtx_horti as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " vegetable as veg" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = veg.Id_Horticulture" +
    " AND hg.Id_Horticulture = veg.Id_Horticulture" +
    " AND h.Id_Horticulture = veg.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
});

// !-------------------------------------------------------

app.get("/horticulture/legumesans", (req, res) => {
  const sql =
    "SELECT f.num_field, CONCAT(" +
    "tf.name_field, ' ', WITH_BONUS (f.Num_Field)" +
    ") as name, hg.qtx_horti as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " vegetable as veg" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = veg.Id_Horticulture" +
    " AND hg.Id_Horticulture = veg.Id_Horticulture" +
    " AND h.Id_Horticulture = veg.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit);";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
});

// !-------------------------------------------------------

app.get("/horticulture/fruit", (req, res) => {
  const sql =
    "SELECT f.num_field, CONCAT(" +
    "tf.name_field, ' ', WITH_BONUS (f.Num_Field)" +
    ") as name, hg.qtx_horti as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " fruit as frt" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = frt.Id_Horticulture" +
    " AND hg.Id_Horticulture = frt.Id_Horticulture" +
    " AND h.Id_Horticulture = frt.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field<96;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
});

// !-------------------------------------------------------

app.get("/horticulture/fruitsans", (req, res) => {
  const sql =
    "SELECT f.num_field, CONCAT(" +
    "tf.name_field, ' ', WITH_BONUS (f.Num_Field)" +
    ") as name, hg.qtx_horti as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " vegetable as veg" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = veg.Id_Horticulture" +
    " AND hg.Id_Horticulture = veg.Id_Horticulture" +
    " AND h.Id_Horticulture = veg.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field<96" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit);";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
});
// !-------------------------------------------------------

app.get("/horticulture/fruitsousserre", (req, res) => {
  const sql =
    "SELECT f.num_field, CONCAT(" +
    "tf.name_field, ' ', WITH_BONUS (f.Num_Field)" +
    ") as name, hg.qtx_horti as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " fruit as frt" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = frt.Id_Horticulture" +
    " AND hg.Id_Horticulture = frt.Id_Horticulture" +
    " AND h.Id_Horticulture = frt.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field>95;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
});

// !-------------------------------------------------------

app.get("/horticulture/fruitsousserresans", (req, res) => {
  const sql =
    "SELECT f.num_field, CONCAT(" +
    "tf.name_field, ' ', WITH_BONUS (f.Num_Field)" +
    ") as name, hg.qtx_horti as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " fruit as frt" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = frt.Id_Horticulture" +
    " AND hg.Id_Horticulture = frt.Id_Horticulture" +
    " AND h.Id_Horticulture = frt.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field>95" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit);";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
});

// !-------------------------------------------------------
// !------------------------------------------------------------------------------------------------------------------------

app.get("/horticulture/totsol", (req, res) => {
  const sql =
    "SELECT total_data.name, sum(total_data.datas) as data" +
    " FROM (SELECT DISTINCT CONCAT(tf.name_field, ' ', WITH_BONUS (f.Num_Field)) as name, hg.qtx_horti as datas" +
    " FROM" +
    " field as f, type_field as tf, horti_give as hg, is_horti_affilied as iha, horticulture as h, is_treated as fit, vegetable as veg, fruit as frt" +
    " WHERE" +
    " f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture IN (" +
    " frt.Id_Horticulture, veg.Id_Horticulture" +
    ")" +
    " AND iha.date_horti_affilied = hg.date_horti ) AS total_data" +
    " GROUP BY" +
    " name;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
});

// !-------------------------------------------------------
app.get("/horticulture/totsolsans", (req, res) => {
  const sql =
    "SELECT total_data.name, sum(total_data.datas) as data" +
    " FROM (SELECT DISTINCT CONCAT(tf.name_field, ' ', WITH_BONUS (f.Num_Field)) as name, hg.qtx_horti as datas" +
    " FROM" +
    " field as f, type_field as tf, horti_give as hg, is_horti_affilied as iha, horticulture as h, is_treated as fit, vegetable as veg, fruit as frt" +
    " WHERE" +
    " f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture IN (" +
    " frt.Id_Horticulture, veg.Id_Horticulture" +
    ")" +
    " AND iha.date_horti_affilied = hg.date_horti " +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit)" +
    ") AS total_data" +
    " GROUP BY" +
    " name;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
});

// !------------------------------------------------------------
app.get("/horticulture/tothorti", async (req, res) => {
  const sql1 =
    "SELECT SUM(hg.qtx_horti) as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " vegetable as veg" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = veg.Id_Horticulture" +
    " AND hg.Id_Horticulture = veg.Id_Horticulture" +
    " AND h.Id_Horticulture = veg.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti;" +
    "SELECT SUM(hg.qtx_horti) as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " fruit as frt" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = frt.Id_Horticulture" +
    " AND hg.Id_Horticulture = frt.Id_Horticulture" +
    " AND h.Id_Horticulture = frt.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field<96;" +
    "SELECT SUM(hg.qtx_horti) as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " fruit as frt" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = frt.Id_Horticulture" +
    " AND hg.Id_Horticulture = frt.Id_Horticulture" +
    " AND h.Id_Horticulture = frt.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field>95;";

  // let lambda = [];
  // console.log("test");

  // const test = await db.query(sql1);
  db.query(sql1, (err, result) => {
    if (err) console.log(err);
    // console.log(result[1][0].data);
    return res.json([
      { name: "legume", data: result[0][0].data },
      { name: "fruit", data: result[1][0].data },
      { name: "fruit sous serre", data: result[2][0].data },
    ]);
  });

  // db.query(sql3, (err, result) => {
  //   if (err) console.log(err);
  //   lambda.push(res.json(result));
  //   console.log("test lambda ", result[0].data);
  // });
  // console.log(res1, res2, res3);
  // console.log("resultat : ", lambda);
});

// !-------------------------------------------------------

app.get("/horticulture/tothortisans", (req, res) => {
  const sql =
    "SELECT SUM(hg.qtx_horti) as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " vegetable as veg" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = veg.Id_Horticulture" +
    " AND hg.Id_Horticulture = veg.Id_Horticulture" +
    " AND h.Id_Horticulture = veg.Id_Horticulture" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit)" +
    " AND iha.date_horti_affilied = hg.date_horti;" +
    "SELECT SUM(hg.qtx_horti) as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " fruit as frt" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = frt.Id_Horticulture" +
    " AND hg.Id_Horticulture = frt.Id_Horticulture" +
    " AND h.Id_Horticulture = frt.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit)" +
    " AND f.Num_Field<96;" +
    "SELECT SUM(hg.qtx_horti) as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " fruit as frt" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = frt.Id_Horticulture" +
    " AND hg.Id_Horticulture = frt.Id_Horticulture" +
    " AND h.Id_Horticulture = frt.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit)" +
    " AND f.Num_Field>95;";

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    // console.log(result);
    return res.json([
      { name: "legume", data: result[0][0].data },
      { name: "fruit", data: result[1][0].data },
      { name: "fruit sous serre", data: result[2][0].data },
    ]);
  });
});
// !--------------------------------------------------------------
// !--------------------------------------------
// *-------------------Fields-------------------
// !--------------------------------------------
app.get("/fields", (req, res) => {
  const sql =
    "SELECT ue.label_under_earth as label, SUM(fs.set_delivered) as data" +
    " FROM" +
    " field as f," +
    " type_field as tf," +
    " cult_give as cg," +
    " is_cult_affilied as ica," +
    " culture as c," +
    " field_set as fs," +
    " under_earth as ue" +
    " WHERE" +
    " f.id_type_field = tf.id_type_field" +
    " AND f.num_field = ica.Num_Field" +
    " AND ica.Id_culture = 5" +
    " AND cg.Id_culture = 5" +
    " AND c.Id_culture = 5" +
    " AND ue.Id_culture = 5" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND fs.Num_field = f.num_field" +
    " AND fs.Id_Unity = 5;" +
    "SELECT ue.label_under_earth as label, SUM(fs.set_delivered) as data" +
    " FROM" +
    " field as f," +
    " type_field as tf," +
    " cult_give as cg," +
    " is_cult_affilied as ica," +
    " culture as c," +
    " field_set as fs," +
    " under_earth as ue" +
    " WHERE" +
    " f.id_type_field = tf.id_type_field" +
    " AND f.num_field = ica.Num_Field" +
    " AND ica.Id_culture = 8" +
    " AND cg.Id_culture = 8" +
    " AND c.Id_culture = 8" +
    " AND ue.Id_culture = 8" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND fs.Num_field = f.num_field" +
    " AND fs.Id_Unity = 5;" +
    "SELECT SUM(fs.set_delivered) as data" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c, cereal as cer,field_set as fs" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=cer.Id_culture" +
    " AND cg.Id_culture=cer.Id_culture" +
    " AND c.Id_culture=cer.Id_culture" +
    " AND fs.num_field=f.num_field" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND fs.Id_Unity =5;" +
    "SELECT SUM(fs.set_delivered) as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " vegetable as veg," +
    " field_set as fs" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = veg.Id_Horticulture" +
    " AND hg.Id_Horticulture = veg.Id_Horticulture" +
    " AND h.Id_Horticulture = veg.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND fs.Num_Field=f.Num_Field" +
    " AND fs.Id_Unity =5;" +
    " SELECT SUM(fs.set_delivered) as data" +
    " FROM" +
    " field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " fruit as frt," +
    " field_set as fs" +
    " WHERE " +
    " f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = frt.Id_Horticulture" +
    " AND hg.Id_Horticulture = frt.Id_Horticulture" +
    " AND h.Id_Horticulture = frt.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field<96" +
    " AND fs.Num_Field=f.Num_Field" +
    " AND fs.Id_Unity =5 ;" +
    " SELECT SUM(fs.set_delivered) as data" +
    " FROM" +
    " field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " fruit as frt," +
    " field_set as fs" +
    " WHERE " +
    " f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = frt.Id_Horticulture" +
    " AND hg.Id_Horticulture = frt.Id_Horticulture" +
    " AND h.Id_Horticulture = frt.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field>95" +
    " AND fs.Num_Field=f.Num_Field" +
    " AND fs.Id_Unity =5 ;";

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    // console.log(result);
    return res.json([
      {
        label: "Culture",
        children: [
          { label: result[0][0].label, data: result[0][0].data },
          { label: result[1][0].label, data: result[1][0].data },
          { label: "cereales", data: result[2][0].data },
        ],
      },
      {
        label: "horticulture",
        children: [
          { label: "legume", data: result[3][0].data },
          { label: "fruit", data: result[4][0].data },
          { label: "fruit sous serre", data: result[5][0].data },
        ],
      },
    ]);
  });
});

// TODO: Old request
/*"SELECT Id_Energy," +
    "Id_time_period," +
    "Id_Month," +
    "qtx_ener" +
    " FROM energy_by_time" +
    " WHERE Id_Energy = 1 " +
    "AND Id_Month = 1;"*/
// TODO: New request
/*SELECT Id_Energy, tp.begin_hour,mp.label_name,ebt.qtx_ener 
FROM energy_by_time as ebt, month_product as mp, time_period as tp
WHERE Id_Energy = 1 AND mp.Id_Month = ebt.Id_Month AND tp.Id_time_period=ebt.Id_time_period 
ORDER BY ebt.Id_Month ASC; */
// !-------------------------------------------------
// *select de pomme de terre suivant les sols et les apports
// TODO : pomme de terre
// *SELECT cg.date_cult, cg.qtx_cult FROM cult_give as cg WHERE cg.Id_culture=5
// TODO : les sols de type
// *SELECT f.num_field, tf.name_field FROM field as f,type_field as tf WHERE f.id_type_field=tf.id_type_field
// TODO : les dates/heures qui correspondent au field
// *SELECT ica.num_field, ica.date_cult_affilied FROM is_cult_affilied as ica WHERE ica.Id_culture=5
// TODO :
// * test
// !SELECT tf.name_field
// !FROM field as f,type_field as tf
// !WHERE f.id_type_field=tf.id_type_field AND f.num_field=(
// !SELECT ica.num_field FROM is_cult_affilied as ica WHERE ica.Id_culture=5)
// *-------------------
// *test 2
//* SELECT ica.num_field FROM is_cult_affilied as ica WHERE ica.Id_culture=5 AND ica.Num_Field=f.num_field
// =>
// SELECT tf.name_field
// FROM field as f,type_field as tf
// WHERE f.id_type_field=tf.id_type_field AND f.num_field=(
// SELECT ica.num_field FROM is_cult_affilied as ica WHERE ica.Id_culture=5 AND ica.Num_Field=f.num_field)
// *-------------------
// *TODO : pomme de terre suivant une heure
// *SELECT cg.qtx_cult FROM cult_give as cg WHERE cg.Id_culture=5 and cg.date_cult = (SELECT ica.date_cult_affilied FROM is_cult_affilied as ica WHERE ica.Id_culture=5)
// (SELECT ica.date_cult_affilied
// FROM is_cult_affilied as ica
// WHERE ica.Id_culture=5)
// !------------------------------------
// SELECT tf.name_field, cg.qtx_cult
// FROM field as f,type_field as tf,cult_give as cg
// WHERE f.id_type_field=tf.id_type_field AND f.num_field=(
// SELECT ica.num_field FROM is_cult_affilied as ica WHERE ica.Id_culture=5 AND ica.Num_Field=f.num_field) AND cg.Id_culture=5 AND cg.date_cult=ica.date_cult_affilied
// !-------------------------------------
// SELECT tf.name_field, cg.qtx_cult
// FROM field as f,type_field as tf,cult_give as cg,is_cult_affilied as icad
// WHERE f.id_type_field=tf.id_type_field
// AND f.num_field=(
// SELECT ica.num_field FROM is_cult_affilied as ica WHERE ica.Id_culture=5 AND ica.Num_Field=f.num_field)
// AND cg.Id_culture=5
// AND cg.date_cult=icad.date_cult_affilied
// !--------------------------------------
// SELECT tf.name_field, cg.qtx_cult
// FROM field as f,type_field as tf,cult_give as cg
// WHERE f.id_type_field=tf.id_type_field AND f.num_field=(
// SELECT DISTINCT ica.num_field FROM is_cult_affilied as ica,cult_give as cgi  WHERE ica.Id_culture=5 AND cgi.date_cult=ica.date_cult_affilied) AND cg.Id_culture=5
// *---------------------------------------
// *-------Good----------------------------
// SELECT tf.name_field, cg.qtx_cult
// FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica
// WHERE f.id_type_field=tf.id_type_field AND f.num_field=18 AND ica.Num_Field=18 AND cg.Id_culture=5 AND ica.date_cult_affilied = cg.date_cult

// !----------------------------------------
// SELECT tf.name_field, cg.qtx_cult
// FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c
// WHERE f.id_type_field=tf.id_type_field
// AND f.num_field=ica.Num_Field
// AND ica.Id_culture=5
// AND cg.Id_culture=5
// AND ica.date_cult_affilied = cg.date_cult
// *--------------------------------------
// *--------Very good---------------------
// SELECT tf.name_field, cg.qtx_cult
// FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c
// WHERE f.id_type_field=tf.id_type_field
// AND f.num_field=ica.Num_Field
// AND ica.Id_culture=5
// AND cg.Id_culture=5
// AND c.Id_culture=5
// AND ica.date_cult_affilied = cg.date_cult
// *----------------------------------------------------------------
// *---------------------Pomme de terre-----------------------------
// *----------------------------------------------------------------
// SELECT tf.name_field, cg.qtx_cult
// FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c
// WHERE f.id_type_field=tf.id_type_field
// AND f.num_field=ica.Num_Field
// AND ica.Id_culture=5
// AND cg.Id_culture=5
// AND c.Id_culture=5
// AND ica.date_cult_affilied = cg.date_cult

// *----------------------------------------------------------------
// *------------------Betterave sucrière----------------------------
// *----------------------------------------------------------------
// SELECT tf.name_field, cg.qtx_cult
// FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c
// WHERE f.id_type_field=tf.id_type_field
// AND f.num_field=ica.Num_Field
// AND ica.Id_culture=8
// AND cg.Id_culture=8
// AND c.Id_culture=8
// AND ica.date_cult_affilied = cg.date_cult

// *----------------------------------------------------------------
// *------------------------Céréales--------------------------------
// *----------------------------------------------------------------
// TODO : test
// SELECT tf.name_field, cg.qtx_cult
// FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c
// WHERE f.id_type_field=tf.id_type_field
// AND f.num_field=ica.Num_Field
// AND ica.Id_culture=(SELECT Id_culture FROM `cereal`)
// AND cg.Id_culture=(SELECT Id_culture FROM `cereal`)
// AND c.Id_culture=(SELECT Id_culture FROM `cereal`)
// AND ica.date_cult_affilied = cg.date_cult
// *----------------------------------------------------------------
// *--------------------------------------
// *--------Very good---------------------
// SELECT tf.name_field, cg.qtx_cult
// FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c
// WHERE f.id_type_field=tf.id_type_field
// AND f.num_field=ica.Num_Field
// AND ((ica.Id_culture=1 AND cg.Id_culture=1 AND c.Id_culture=1)
// OR (ica.Id_culture=2 AND cg.Id_culture=2 AND c.Id_culture=2)
// OR (ica.Id_culture=4 AND cg.Id_culture=4 AND c.Id_culture=4))
// AND ica.date_cult_affilied = cg.date_cult
// !----------------------------------------------------------------
// !---------------------Horticulture-------------------------------
// !----------------------------------------------------------------
// *----------------------------------------------------------------
// *------------------------Légumes---------------------------------
// *----------------------------------------------------------------

// *test :
// SELECT tf.name_field, cg.qtx_cult
// FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c
// WHERE f.id_type_field=tf.id_type_field
// AND f.num_field=ica.Num_Field
// AND ((ica.Id_culture=1 AND cg.Id_culture=1 AND c.Id_culture=1)
// OR (ica.Id_culture=2 AND cg.Id_culture=2 AND c.Id_culture=2)
// OR (ica.Id_culture=4 AND cg.Id_culture=4 AND c.Id_culture=4))
// AND ica.date_cult_affilied = cg.date_cult

// *---------------------------------------------------------------
// SELECT *
// from horti_give as hg,vegetable as v
// WHERE EXISTS (
// 	select *
//     FROM vegetable
//     WHERE hg.Id_Horticulture=v.Id_Horticulture
// );
// *---------------------------------------------------------------
// SELECT DISTINCT tf.name_field, hg.qtx_horti
// from horti_give as hg,vegetable as v, field as f,type_field as tf, is_horti_affilied as iha
// WHERE EXISTS (
// 	select *
//     FROM vegetable
//     WHERE hg.Id_Horticulture=v.Id_Horticulture
// )
// AND f.id_type_field=tf.id_type_field
// AND f.num_field=iha.Num_Field
// AND iha.date_horti_affilied = hg.date_horti
// *---------------------------------------------------------------
// *----------------------------------------------------------------
// *--------------------------------------
// *--------Very good---------------------
// SELECT tf.name_field, hg.qtx_horti
// from horti_give as hg,vegetable as v, field as f,type_field as tf, is_horti_affilied as iha
// WHERE f.id_type_field=tf.id_type_field
// AND f.num_field=iha.Num_Field
// AND iha.date_horti_affilied = hg.date_horti
// AND EXISTS (
// 	select *
//     FROM vegetable
//     WHERE hg.Id_Horticulture=v.Id_Horticulture
// )
// GROUP BY hg.date_horti

// *----------------------------------------------------------------
// *------------------------Fruits---------------------------------
// *----------------------------------------------------------------
// SELECT tf.name_field, hg.qtx_horti
// from horti_give as hg,fruit, field as f,type_field as tf, is_horti_affilied as iha
// WHERE f.id_type_field=tf.id_type_field
// AND f.num_field=iha.Num_Field
// AND iha.date_horti_affilied = hg.date_horti
// AND EXISTS (
// 	select *
//     FROM fruit
//     WHERE hg.Id_Horticulture=fruit.Id_Horticulture
// )
// GROUP BY hg.date_horti
// *------------------------------------------------------------
// SELECT tf.name_field, hg.qtx_horti
// from horti_give as hg,fruit, field as f,type_field as tf, is_horti_affilied as iha
// WHERE f.id_type_field=tf.id_type_field
// AND f.num_field=iha.Num_Field
// AND iha.date_horti_affilied = hg.date_horti
// AND EXISTS (
// 	select *
//     FROM fruit
//     WHERE hg.Id_Horticulture=fruit.Id_Horticulture
// )
// AND TIME(hg.date_horti) >= '23:00:00'
// GROUP BY hg.date_horti

// *----------------------------------------------------------------
// *--------------Fruits sous serre---------------------------------
// *----------------------------------------------------------------
// SELECT tf.name_field, hg.qtx_horti
// from horti_give as hg,fruit, field as f,type_field as tf, is_horti_affilied as iha
// WHERE f.id_type_field=tf.id_type_field
// AND f.num_field=iha.Num_Field
// AND iha.date_horti_affilied = hg.date_horti
// AND EXISTS (
// 	select *
//     FROM fruit
//     WHERE hg.Id_Horticulture=fruit.Id_Horticulture
// )
// AND TIME(hg.date_horti) >= '22:00:00'
// AND TIME(hg.date_horti) <= '23:00:00'
// GROUP BY hg.date_horti
