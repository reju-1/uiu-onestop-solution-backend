function getLocation(req, res) {
  res.send("location =>  x:45.45  y:30.47");
}

function updateLocation(req, res) {
  let location = req.body;
  console.log(req.body);
  res.json({ status: "Successful" });
}

function track(req, res) {
  res.render("tracker");
}

export { getLocation, updateLocation, track };
