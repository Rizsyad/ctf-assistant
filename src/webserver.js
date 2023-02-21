const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("CTF Assitent"));
app.listen(3000, () => console.log(`Web is On`));
