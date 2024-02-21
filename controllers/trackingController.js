function getLocation(req, res) {
  res.send("location =>  x:45.45  y:30.47");
}

function updateLocation(req, res) {
  res.send("Location Update successfully");
}
function track(req, res) {
  res.render("tracker");
}

export { getLocation, updateLocation, track };
