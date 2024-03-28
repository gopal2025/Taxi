const Connection = require("../models/Connection");
const Cars = require("../models/Cars");

const populateDatabase = async () => {
  try {
    applyFloydWarshall();
    const existingConnections = await Connection.find();
    if (existingConnections.length > 0) {
      return;
    }

    const connectionsData = [
      { source: "A", destination: "B", time: 5 },
      { source: "A", destination: "C", time: 7 },
      { source: "B", destination: "A", time: 5 },
      { source: "B", destination: "D", time: 15 },
      { source: "B", destination: "E", time: 20 },
      { source: "C", destination: "A", time: 7 },
      { source: "C", destination: "D", time: 5 },
      { source: "C", destination: "E", time: 35 },
      { source: "D", destination: "B", time: 15 },
      { source: "D", destination: "C", time: 5 },
      { source: "D", destination: "F", time: 20 },
      { source: "E", destination: "C", time: 35 },
      { source: "E", destination: "B", time: 20 },
      { source: "E", destination: "F", time: 10 },
      { source: "F", destination: "D", time: 20 },
      { source: "F", destination: "E", time: 10 },
    ];
    await Connection.create(connectionsData);
  } catch (error) {
    console.error("Error populating the database:", error);
  }
};

const populateCarsDatabase = async () => {
  try {
    const exitistingCars = await Cars.find();
    if (exitistingCars.length > 0) {
      return;
    }

    const carsData = [
      {
        name: "A",
        img: "https://imgd.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80",
        price: 1500,
        bookedBy: null,
        occupied: false,
        bookTime: null,
        endTime: null,
      },
      {
        name: "B",
        img: "https://imgd.aeplcdn.com/370x208/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-71.jpeg?isig=0&q=80",
        price: 1200,
        bookedBy: null,
        occupied: false,
        bookTime: null,
        endTime: null,
      },
      {
        name: "C",
        img: "https://imgd.aeplcdn.com/642x336/cw/ec/42611/Tata-Nexon-Exterior-172215.jpg?wm=0&q=80",
        price: 800,
        bookedBy: null,
        occupied: false,
        bookTime: null,
        endTime: null,
      },
      {
        name: "D",
        img: "https://imgd.aeplcdn.com/642x336/n/cw/ec/121341/nexon-ev-max-exterior-right-front-three-quarter-7.jpeg?isig=0&q=80",
        price: 600,
        bookedBy: null,
        occupied: false,
        bookTime: null,
        endTime: null,
      },
      {
        name: "E",
        img: "https://imgd.aeplcdn.com/664x374/n/cw/ec/41645/tata-nexon-right-front-three-quarter3.jpeg?q=80",
        price: 250,
        bookedBy: null,
        occupied: false,
        bookTime: null,
        endTime: null,
      },
    ];
    await Cars.create(carsData);
  } catch (error) {
    console.error("Error populating the database:", error);
  }
};

const adjMatrix = [];

async function applyFloydWarshall() {
  try {
    const connections = await Connection.find();
    const citiesSet = new Set();
    connections.forEach((connection) => {
      citiesSet.add(connection.source);
      citiesSet.add(connection.destination);
    });
    const totalCity = citiesSet.size;

    for (let i = 0; i < totalCity; i++) {
      adjMatrix[i] = [];
      for (let j = 0; j < totalCity; j++) {
        if (i === j) adjMatrix[i][j] = 0;
        else adjMatrix[i][j] = Infinity;
      }
    }

    connections.forEach((connection) => {
      const sourceIndex = connection.source.charCodeAt(0) - "A".charCodeAt(0);
      const destinationIndex =
        connection.destination.charCodeAt(0) - "A".charCodeAt(0);
      adjMatrix[sourceIndex][destinationIndex] = connection.time;
    });

    for (let k = 0; k < totalCity; k++) {
      for (let i = 0; i < totalCity; i++) {
        for (let j = 0; j < totalCity; j++) {
          if (adjMatrix[i][k] + adjMatrix[k][j] < adjMatrix[i][j]) {
            adjMatrix[i][j] = adjMatrix[i][k] + adjMatrix[k][j];
          }
        }
      }
    }

    // console.table(adjMatrix);
  } catch (error) {
    console.error("Error finding shortest path", error);
  }
}

module.exports = { populateDatabase, adjMatrix, populateCarsDatabase };
