import {
  connectDatabase,
  disconnectDatabase,
  insertDocument,
} from "../../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    try {
      await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connection to Database Failed" });
      console.log(error);
      return;
    }

    try {
      await insertDocument("newsletter", { email: email });
      disconnectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Inserting Data Failed" });
      console.log(error);
      return;
    }

    res.status(201).json({
      message: "Registration Successful",
    });
  }
}

export default handler;
