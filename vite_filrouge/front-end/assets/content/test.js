// import Chart from "@toast-ui/chart";
// var pdt;
// *init selects choices and first url shawn
var choice = { apport: "", filtre: "Pomme de Terre" };
var urlpdt = "http://localhost:3001/culture/pommedeterre";
// *change data and front if choices send with click button
document.getElementById("form_chosen").addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(e);
  var test = {};
  for (let i = 0; i < e.target.length - 1; i++) {
    // console.log(e.target[i].id);
    test[`${e.target[i].id}`] = `${e.target[i].value}`;
  }
  // console.log(test);
  choice = test;
  // *In construction
  if (choice.diagramme == "bar") {
    // console.log("bar");
    if (choice.filtre == "betterave") {
      switch (choice.apport) {
        case "with":
          // *init the target for front
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/betterave";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/betteravesans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/betterave";
          const request1 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request1);
          break;
      }
    } else if (choice.filtre == "pomme de terre") {
      switch (choice.apport) {
        case "with":
          // *init the target for front
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/pommedeterre";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/pommedeterresans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/pommedeterre";
          const request1 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request1);
          break;
      }
    } else if (choice.filtre == "cereales") {
      switch (choice.apport) {
        case "with":
          // *init the target for front
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/cereal";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/cerealsans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/cereal";
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
          urlpdt = "http://localhost:3001/culture/totsol";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/totsolsans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/totsol";
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
          urlpdt = "http://localhost:3001/culture/totcult";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/totcultsans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/totcult";
          const request1 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient_bar(request1);
          break;
      }
    } else {
      document.getElementById("chart_pie").innerHTML = ``;
      urlpdt = "http://localhost:3001/culture/pommedeterre";
      const request1 = new Request(urlpdt, {
        method: "GET",
      });
      request_ingredient_bar(request1);
    }
  } else {
    if (choice.filtre == "betterave") {
      switch (choice.apport) {
        case "with":
          // *init the target for front
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/betterave";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/betteravesans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/betterave";
          const request1 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request1);
          break;
      }
    } else if (choice.filtre == "pomme de terre") {
      switch (choice.apport) {
        case "with":
          // *init the target for front
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/pommedeterre";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/pommedeterresans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/pommedeterre";
          const request1 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request1);
          break;
      }
    } else if (choice.filtre == "cereales") {
      switch (choice.apport) {
        case "with":
          // *init the target for front
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/cereal";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/cerealsans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/cereal";
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
          urlpdt = "http://localhost:3001/culture/totsol";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/totsolsans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/totsol";
          const request1 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request1);
          break;
      }
    } else if (choice.filtre == "tot cult") {
      switch (choice.apport) {
        case "with":
          // *init the target for front
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/totcult";
          const request2 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request2);
          break;
        case "out":
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/totcultsans";
          const request3 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request3);
          break;
        default:
          document.getElementById("chart_pie").innerHTML = ``;
          urlpdt = "http://localhost:3001/culture/totcult";
          const request1 = new Request(urlpdt, {
            method: "GET",
          });
          request_ingredient(request1);
          break;
      }
    } else {
      document.getElementById("chart_pie").innerHTML = ``;
      urlpdt = "http://localhost:3001/culture/pommedeterre";
      const request1 = new Request(urlpdt, {
        method: "GET",
      });
      request_ingredient(request1);
    }
  }
});

// *---------------------------------
// !---------------------------------
// const request2 = new Request(urlpdt, {
//   method: "GET",
// });
// *first page / first choice
const initialisation = new Request(urlpdt, {
  method: "GET",
});
const request_ingredient = (e) =>
  fetch(e)
    .then((response) => {
      if (response.status === 200) {
        let infos = response.json();
        // console.log(infos);
        // console.log("choice" + choice.diagramme + "; Filtre " + choice.filtre);
        return infos;
      } else {
        throw new Error("Something went wrong on API server!");
      }
    })
    .then((datas) => {
      // console.log(datas);
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
        // console.log(infos);
        // console.log("choice" + choice.diagramme + "; Filtre " + choice.filtre);
        return infos;
      } else {
        throw new Error("Something went wrong on API server!");
      }
    })
    .then((datas) => {
      // console.log(datas);
      let test = datas;
      for (let i = 0; i < test.length; i++) {
        let arr = [];
        arr.push(test[i].data);
        test[i].data = arr;
        // console.log(d["data"]);
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

// const data = {
//   categories: ["Jun"],
//   series: [
//     {
//       name: "Budget",
//       data: [5000],
//     },
//     {
//       name: "Income",
//       data: [8000],
//     },
//     {
//       name: "Expenses",
//       data: [4000],
//     },
//     {
//       name: "Debt",
//       data: [3000],
//     },
//   ],
// };
// const options = {
//   theme: {
//     chart: {
//       fontFamily: "Verdana",
//       backgroundColor: "rgba(0, 0, 0, 0)",
//     },
//   },
//   chart: { title: "Monthly Revenue", height: "auto", width: "auto" },
//   responsive: {
//     animation: { duration: 100 },
//   },
// };

// request_ingredient();
// switch (choice.apport) {
//   case "with":
//     urlpdt = "http://localhost:3001/pommedeterre";
//     const request2 = new Request(urlpdt, {
//       method: "GET",
//     });
//     request_ingredient(request2);
//     break;
//   case "out":
//     urlpdt = "http://localhost:3001/pommedeterresans";
//     const request3 = new Request(urlpdt, {
//       method: "GET",
//     });
//     request_ingredient(request3);
//     break;
//   default:
//     urlpdt = "http://localhost:3001/pommedeterre";
//     const request1 = new Request(urlpdt, {
//       method: "GET",
//     });
//     request_ingredient(request1);
//     break;
// }
// .then(() => console.log(pdt));

// const data = {
//   categories: ["Browser"],
//   series: [
//     {
//       name: "Chrome",
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

// const el = document.getElementById("chart_pie");
// const options = {
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

// const chart = toastui.Chart.pieChart({ el, data, options });
// * https://nhn.github.io/tui.chart/latest/tutorial-example09-11-pie-chart-visible-data
// const el = document.getElementById("chart_pie");
// // console.log(el);
// const options = {
//   series: {
//     selectable: true,
//   },
// };

// const chart = toastui.Chart.pieChart({ el, data, options });
const data2 = {
  categories: ["Browser"],
  series: [
    {
      name: "ZzZ",
      data: 46.02,
    },
    {
      name: "IE",
      data: 20.47,
    },
    {
      name: "Firefox",
      data: 17.71,
    },
    {
      name: "Safari",
      data: 5.45,
    },
    {
      name: "Opera",
      data: 3.1,
    },
    {
      name: "Etc",
      data: 7.25,
    },
  ],
};
// *https://github.com/nhn/tui.chart/blob/main/docs/en/common-theme.md
const options2 = {
  theme: {
    chart: {
      fontFamily: "Verdana",
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
  },
  chart: {
    title: "Pie Chart",
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
const el2 = document.getElementById("chart_pie2");
const el3 = document.getElementById("chart_pie3");
const el4 = document.getElementById("chart_pie4");
// console.log(el2, el3, el4);

const chart2 = toastui.Chart.pieChart({
  el: el2,
  data: data2,
  options: options2,
});
const chart3 = toastui.Chart.pieChart({ el: el3, data, options });
const chart4 = toastui.Chart.pieChart({ el: el4, data, options });
