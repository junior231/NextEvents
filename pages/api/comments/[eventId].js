import {
  connectDatabase,
  disconnectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const { eventId } = req.query;

  try {
    await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connection to Database Failed" });
    console.log(error);
    return;
  }

  if (req.method === "POST") {
    const { email, name, comment } = req.body;

    // add server side validation
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !comment ||
      comment.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      disconnectDatabase();
      return;
    }

    const newComment = {
      email,
      name,
      comment,
      eventId,
    };

    let result;

    try {
      result = await insertDocument("comments", newComment);

      // add unique id from mongoDB result to  newComment object
      newComment._id = result.insertedId;

      res.status(201).json({ message: "Added comment", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting Data Failed" });
      console.log(error);
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(
        "comments",
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed." });
    }
  }

  disconnectDatabase();
}

export default handler;
