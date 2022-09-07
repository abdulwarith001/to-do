const error = (err, req, res, next) => {
  console.error(err)
  res.status(500).json({msg:'Something went wrong pls try again later.'})
}

module.exports = error