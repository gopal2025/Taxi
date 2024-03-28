const { adjMatrix } = require("../utils/utils");
const Cars = require("../models/Cars");
const nodemailer = require("nodemailer");

const showAvailableCars = async (req, res) => {
  try {
    const { source, destination, email } = req.body;

    if (!source || !destination || !email) {
      return;
    }

    const cars = await Cars.find();
    const distance =
      adjMatrix[source.charCodeAt(0) - "A".charCodeAt(0)][
        destination.charCodeAt(0) - "A".charCodeAt(0)
      ];
    const currentTimeInMillis = Date.now();
    const currentTimeInMinutes = Math.floor(currentTimeInMillis / 60000);
    const availableCars = [];

    if (!cars) {
      return res.status(200).json(availableCars);
    }

    cars.forEach((car) => {
      if (car.endTime - currentTimeInMinutes <= 0) {
        availableCars.push({
          carName: car.name,
          pricePerMin: car.price,
          timeToReach: distance,
          price: car.price * distance,
          img: car.img,
        });
      }
    });

    return res.status(200).json(availableCars);
  } catch (error) {
    res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
};

const bookCar = async (req, res) => {
  try {
    const { carName, source, destination, email } = req.body;
    const distance =
      adjMatrix[source.charCodeAt(0) - "A".charCodeAt(0)][
        destination.charCodeAt(0) - "A".charCodeAt(0)
      ];
    const currentTimeInMillis = Date.now();
    const currentTimeInMinutes = Math.floor(currentTimeInMillis / 60000);
    const car = await Cars.findOne({ name: carName });

    if (!car) {
      return res.status(404).json({ msg: "Car not found!" });
    } else {
      car.bookedBy = email;
      car.occupied = true;
      car.bookTime = currentTimeInMinutes;
      car.endTime = currentTimeInMinutes + distance;
    }

    await car.save();

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
};

const getAllCars = async (req, res) => {
  try {
    const cars = await Cars.find();
    const carsDetails = [];
    const currentTimeInMillis = Date.now();
    const currentTimeInMinutes = Math.floor(currentTimeInMillis / 60000);

    cars.forEach((car) => {
      let timeLeft = car.endTime - currentTimeInMinutes;
      car.available = false;
      if (timeLeft <= 0) {
        car.available = true;
        car.bookedBy = null;
        timeLeft = 0;
      }
      carsDetails.push({
        carName: car.name,
        available: car.available,
        bookedBy: car.bookedBy,
        timeLeft: timeLeft,
        img: car.img,
        price: car.price,
      });
    });

    res.status(200).json(carsDetails);
  } catch (error) {
    res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
};

const sentMail = async (req, res) => {
  try {
    const { email, source, destination, carName, time, price } = req.body;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.Email_User,
        pass: process.env.Email_Pass,
      },
    });

    const msg = {
      from: '"CityCabbie" <talibbkhann555@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Your CityCabbie Ride Confirmation", // Subject line
      text: `Dear Sir/Madam,
      We are pleased to inform you that your cab reservation has been successfully confirmed.
      
      Reservation Details:
      - Source City: City ${source}
      - Destination City: City ${destination}
      - Car Name: Car ${carName}
      - Estimated time of Journey: ${time} minutes
      - Estimated Cost of Journey: ₹${price}
      
      Thank you for choosing our cab service. If you have any questions or need further assistance, please don't hesitate to contact us.
      
      Best regards,
      CityCabbie
      `, // plain text body
    };
    // send mail with defined transport object
    const info = await transporter.sendMail(msg);

    res.status(200).json({ msg: "Email sent!" });
  } catch (error) {
    res.status(500).json({ msg: "INTERNAL SERVER ERROR" });
  }
};

module.exports = { showAvailableCars, bookCar, getAllCars, sentMail };
