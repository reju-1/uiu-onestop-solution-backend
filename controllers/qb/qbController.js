async function handleUpload(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log(req.file);
    console.log(req.body);
    console.log(req.hash);

    res.json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading file");
  }
}

export { handleUpload };
