// TODO : mettre le node horticulture

// *init selects choices and first url shawn
var choice = { apport: "", filtre: "Pomme de Terre" };
var urlpdt = "http://localhost:3001/horticulture/legume";
// *change data and front if choices send with click button
document.getElementById("form_chosen").addEventListener("submit", (e) => {
  e.preventDefault();
  var test = {};
  for (let i = 0; i < e.target.length - 1; i++) {
    test[`${e.target[i].id}`] = `${e.target[i].value}`;
  }
  choice = test;
  // *In construction
  if (choice.diagramme == "bar") {
    if (choice.filtre == "legume") {
      switch (choice.apport) {
        case "with":
          // *init the target for front
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/legume";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/legumesans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/legume";
          const request1 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request1);
          break;
      }
    } else if (choice.filtre == "fruit") {
      switch (choice.apport) {
        case "with":
          // *init the target for front
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/fruit";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/fruitsans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/fruit";
          const request1 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request1);
          break;
      }
    } else if (choice.filtre == "fruit sous serre") {
      switch (choice.apport) {
        case "with":
          // *init the target for front
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/fruitsousserre";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/fruitsousserresans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/fruitsousserre";
          const request1 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request1);
          break;
      }
    } else if (choice.filtre == "tot sol") {
      switch (choice.apport) {
        case "with":
          // *init the target for front
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/totsol";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/totsolsans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/totsol";
          const request1 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request1);
          break;
      }
    } else if (choice.filtre == "tot cult") {
      switch (choice.apport) {
        case "with":
          // *init the target for front
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/tothorti";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/tothortisans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/tothorti";
          const request1 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request1);
          break;
      }
    } else {
      document.getElementById("chart_pie").innerHTML = ``;
      urlpdt = "http://localhost:3001/horticulture/legume";
      const request1 = new Request(urlpdt, {
        method: "GET",
      });
      request_ingredient_bar(request1);
    }
  } else {
    if (choice.filtre == "legume") {
      switch (choice.apport) {
        case "with":
          // *init the target for front
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/legume";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/legumesans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/legume";
          const request1 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request1);
          break;
      }
    } else if (choice.filtre == "fruit") {
      switch (choice.apport) {
        case "with":
          // *init the target for front
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/fruit";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/fruitsans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/fruit";
          const request1 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request1);
          break;
      }
    } else if (choice.filtre == "fruit sous serre") {
      switch (choice.apport) {
        case "with":
          // *init the target for front
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/fruitsousserre";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/fruitsousserresans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/fruitsousserre";
          const request1 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request1);
          break;
      }
    } else if (choice.filtre == "tot sol") {
      switch (choice.apport) {
        case "with":
          // *init the target for front
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/totsol";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/totsolsans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/totsol";
          const request1 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request1);
          break;
      }
    } else if (choice.filtre == "tot horti") {
      switch (choice.apport) {
        case "with":
          // *init the target for front
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/tothorti";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/tothortisans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/horticulture/tothorti";
          const request1 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request1);
          break;
      }
    } else {
      document.getElementById("chart_pie").innerHTML = ``;
      urlpdt = "http://localhost:3001/horticulture/legume";
      const request1 = new Request(urlpdt, {
        method: "GET",
      });
      request_ingredient(request1);
    }
  }
});

// *---------------------------------
// !---------------------------------
// *first page / first choice
const initialisation = new Request(urlpdt, {
  method: "GET",
});
const request_ingredient = (e) =>
  fetch(e)
    .then((response) => {
      if (response.status === 200) {
        let infos = response.json();
        return infos;
      } else {
        throw new Error("Something went wrong on API server!");
      }
    })
    .then((datas) => {
      const data = {
        categories: ["Pomme de terre"],
        series: datas,
      };

      const el = document.getElementById("chart_pie");
      const options = {
        theme: {
          chart: {
            fontFamily: "Verdana",
            backgroundColor: "rgba(0, 0, 0, 0)",
          },
        },
        chart: {
          title: choice.filtre,
          height: "auto",
          width: "auto",
        },
        responsive: {
          animation: { duration: 100 },
        },
        series: {
          dataLabels: {
            visible: true,
            anchor: "outer",
            pieSeriesName: {
              visible: true,
            },
          },
        },
        exportMenu: {
          visible: false,
        },
      };

      const chart = toastui.Chart.pieChart({ el, data, options });
    });
// *----------------------------------------------------
// *initialisation
request_ingredient(initialisation);

// !----------------------------------------------------
// !----------------REQUEST BAR-------------------------
// *----------------------------------------------------

// !-----------------------
const request_ingredient_bar = (e) =>
  fetch(e)
    .then((response) => {
      if (response.status === 200) {
        let infos = response.json();
        return infos;
      } else {
        throw new Error("Something went wrong on API server!");
      }
    })
    .then((datas) => {
      let test = datas;
      for (let i = 0; i < test.length; i++) {
        let arr = [];
        arr.push(test[i].data);
        test[i].data = arr;
      }
      const data = {
        categories: ["Pomme de terre"],
        series: datas,
      };

      const el = document.getElementById("chart_pie");
      const options = {
        theme: {
          chart: {
            fontFamily: "Verdana",
            backgroundColor: "rgba(0, 0, 0, 0)",
          },
        },
        chart: {
          title: choice.filtre,
          height: "auto",
          width: "auto",
        },
        responsive: {
          animation: { duration: 100 },
        },
        series: {
          dataLabels: {
            visible: true,
            anchor: "outer",
            pieSeriesName: {
              visible: true,
            },
          },
        },
        exportMenu: {
          visible: false,
        },
      };

      const chart = toastui.Chart.barChart({ el, data, options });
    });

// const data2 = {
//   categories: ["Browser"],
//   series: [
//     {
//       name: "ZzZ",
//       data: 46.02,
//     },
//     {
//       name: "IE",
//       data: 20.47,
//     },
//     {
//       name: "Firefox",
//       data: 17.71,
//     },
//     {
//       name: "Safari",
//       data: 5.45,
//     },
//     {
//       name: "Opera",
//       data: 3.1,
//     },
//     {
//       name: "Etc",
//       data: 7.25,
//     },
//   ],
// };

// const options2 = {
//   theme: {
//     chart: {
//       fontFamily: "Verdana",
//       backgroundColor: "rgba(0, 0, 0, 0)",
//     },
//   },
//   chart: {
//     title: "Pie Chart",
//     height: "auto",
//     width: "auto",
//   },
//   responsive: {
//     animation: { duration: 100 },
//   },
//   series: {
//     dataLabels: {
//       visible: true,
//       anchor: "outer",
//       pieSeriesName: {
//         visible: true,
//       },
//     },
//   },
//   exportMenu: {
//     visible: false,
//   },
// };
// const el2 = document.getElementById("chart_pie2");
// const el3 = document.getElementById("chart_pie3");
// const el4 = document.getElementById("chart_pie4");

// const chart2 = toastui.Chart.pieChart({
//   el: el2,
//   data: data2,
//   options: options2,
// });
// const chart3 = toastui.Chart.pieChart({ el: el3, data, options });
// const chart4 = toastui.Chart.pieChart({ el: el4, data, options });
