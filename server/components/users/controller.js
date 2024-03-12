const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const authMiddleware = require('../../middleware/auth.middleware')

const retrieveUser = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json(error)
    }
}

const signup = async(req, res) => {
    const { email, password } = req.body
    try {
      user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ msg: 'Email already exists' })
      }

      user = new User({
        email,
        password,
      })

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()


      const token = jwt.sign(
        {
          user: { 
            email: user.email, 
            id: user.id, 
            date: user.date 
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: '3 hours' },
      )

      res.status(200).send({ token, user })
    } catch (err) {
      res.status(500).send('Error while signup')
    }
}

const signin = async(req, res) => {
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ msg: 'Email or password incorrect' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ msg: 'Email or password incorrect' })
      }

      const token = jwt.sign(
        {
          user: { 
            email: user.email, 
            id: user.id, 
            date: user.date,
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: '3 hours' },
      )

      res.status(200).send({ token, user })
    } catch (err) {
      res.status(500).send('Server while signin')
    }
}

module.exports = {
    retrieveUser,
    signup,
    signin,
}