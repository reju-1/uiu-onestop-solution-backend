import Event from "../../models/event.js";

async function uploadEvent(req, res) {
   //  console.log(req.body, req.file);
  try {
    const { name, description, date } = req.body;

    const newEvent = new Event({
      name: name,
      description: description,
      date: date,
      logo: req.file.path.replace(/^public\//, ''),
    });

    await newEvent.save();

    res.status(200).json({ message: "Event Saved Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "There is an error Saving the event" });
  }
}

async function getEvents(req, res) {
  try {
    const events = await Event.find().limit(30);

    res.json(events);
  } catch (error) {
    console.log(error);
    res.json({ error: "There is and Error Fetching Events" });
  }
}

async function getEventByID(req, res) {
  try {
    const event = await Event.findById(req.params.id);

    res.json(event);
  } catch (error) {
    console.log(error);
    res.json({ error: "Invalid ObjsId or Event Not fount" });
  }
}

const deleteEvent = async (req, res) => {

  try {
    const deleteRes = await Event.findByIdAndDelete(req.params.id);

    res.json(deleteRes)

  }catch(err){
    console.log("error deleting event " , err)
    res.json({ error: "Invalid ObjsId or Event Not fount" });
  }

}

export { uploadEvent, getEvents, getEventByID, deleteEvent };
