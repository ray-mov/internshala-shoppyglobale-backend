function validateNewUser(req, res, next) {

  const { firstName, lastName, hobby } = req.body

  if (!firstName && !lastName && !hobby) {
    return res.status(400).json({ message: "All field must be provided" })
  } else if (!(typeof firstName === 'string')) {
    return res.status(400).json({ message: "First name should be string" })
  } else if (!(typeof lastName === 'string')) {
    return res.status(400).json({ message: "Last name should be string" })
  } else if (!(typeof hobby === 'string')) {
    return res.status(400).json({ message: "Hobby should be string" })
  }

  next()
}


function validateUpdateUser(req, res, next) {

  const { firstName, lastName, hobby } = req.body

  if (firstName && !(typeof firstName === 'string')) {
    return res.status(400).json({ message: "First name should be string" })
  } else if (lastName && !(typeof lastName === 'string')) {
    return res.status(400).json({ message: "Last name should be string" })
  } else if (hobby && !(typeof hobby === 'string')) {
    return res.status(400).json({ message: "Hobby should be string" })
  }

  next()
}


export { validateNewUser, validateUpdateUser }