const handler = (req, res) => {
  res
    .status(200)
    .json({ query: req.query, method: req.method, body: req.body });
};

export default handler;
