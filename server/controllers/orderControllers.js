const { v4: uuidv4 } = require("uuid");

let orders = [];

// create a parcel delivery order
exports.createOrder = (req, res) => {
  const order = req.body;
  //   push new order to the orders array
  orders.push({ ...order, id: uuidv4() });
  res.send(`Parcel order ${order.name} created successfully`);
};

// get all parcel delivery orders
exports.getAllOrders = (req, res) => {
  res.send(orders);
};

// get a specific parcel delivery order
exports.getAnOrder = (req, res) => {
  const { id } = req.params;

  const foundOrder = orders.find((order) => order.id === id);
  res.send(foundOrder);
};

// cancel a delivery order
exports.cancelOrder = (req, res) => {
  const { id } = req.params;

  orders = orders.filter((order) => order.id !== id);
  res.send(`Parcel order with the id ${id} cancelled successfully`);
};

// change destination of a parcel delivery order
exports.changeOrderDestination = (req, res) => {
  const { id } = req.params;
  const { destination } = req.body;
  const order = orders.find((order) => order.id === id);

  if (destination) order.destination = destination;

  return res
    .status(200)
    .json({ message: `Order with the id ${id} has been updated` });
};
