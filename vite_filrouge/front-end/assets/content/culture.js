// *init selects choices and first url shawn
var choice = { apport: "", filtre: "Pomme de Terre" };
var urlpdt = "http://localhost:3001/culture/pommedeterre";
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
