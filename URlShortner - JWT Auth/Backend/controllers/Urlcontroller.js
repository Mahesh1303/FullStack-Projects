const URLDB = require("../models/Urlmodel");

const HandleGenerateShortURL = async (req, res) => {
  const { nanoid } = await import("nanoid");
  const body = req.body;
  if (!body.url) {
    res.status(400).json({
      error: "URL is required ",
    });
  }
  const shortid = nanoid(5);

  await URLDB.create({
    shortId: shortid,
    redirectURL: body.url,
    VisitHistory: [],
    Createdby:req.user._id
  });
  return res.json({ id: shortid });
};

const RedirectOrgURL = async (req, res) => {
  const shortId = req.params.id;

  const userURL = await URLDB.findOneAndUpdate(
    { shortId },
    {
      $push: {
        VisitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!userURL) {
    return res.status(400).json({
      msg: "NO URL found",
    });
  }
  return res.redirect(userURL.redirectURL);
};




const HandlegetAnalyticsCount = async (req, res) => {
  const shortId = req.params.id;
  const result = await URLDB.findOne({ shortId });

  return res.json({
    TotalClicks: result.VisitHistory.length,
    VisitHistory: result.VisitHistory,
  });
};




const HandleGetAllUrl = async (req, res) => {
  try {
    const user = req.user; 
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const AllUrl = await URLDB.find({ Createdby: user._id });

    return res.json(AllUrl);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



const HandleDeleteUrl = async (req, res) => {
  const shortId = req.params.id;
  await URLDB.findOneAndDelete({ shortId });
  return res.json({
    message: "Url Deleted Successfully",
  });
};

module.exports = {
  HandleGenerateShortURL,
  RedirectOrgURL,
  HandlegetAnalyticsCount,
  HandleGetAllUrl,
  HandleDeleteUrl,
};
