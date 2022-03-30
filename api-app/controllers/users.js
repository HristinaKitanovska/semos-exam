const User = require('../models/user');
const bcrypt = require('bcryptjs');
const response = require('../lib/response_handler');
const jwt = require('jsonwebtoken');

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await User.find();
        res.send({
            error: false,
            message: 'All users from database',
            users: users
        });
    },

    getIDUser: async (req, res) => {
        const user = await User.findById(req.params.id);
        res.send({
            error: false,
            message: `User with id #${user._id}`,
            user: user
        });
    },

    register: async (req, res) => {
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return response(res, 400, 'Bad request. User exists with the provided email');
            }
        
        req.body.password = bcrypt.hashSync(req.body.password);
        console.log(user) 
        user = await User.create(req.body);
         
        response(res, 201, 'New user has been registered', { user })
        } catch (error) {
            console.log("EROR" + error)
            response(res, 500, error.msg);
        }
    },
    login: async(req, res) => {
        try {
      const user = await User.findOne({ email: req.body.email }); 
      if (user) { 
        if(bcrypt.compareSync(req.body.password, user.password)) { 
            console.log(user.password)
          
          const payload = { 
              id: user._id,
              email: user.email,
              full_name: user.full_name,
              role: user.role
          }
          const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { 
              expiresIn: '50m'
          });

          response(res, 200, 'You have logged in successfully', { token })
        } else {
            response(res, 401, 'Invalid credentials');
        }
      } else {
          response(res, 401, 'Invalid credentials');
      }
        } catch (error) {
          response(res, 500, error.msg); 
        }
    },

    patch: async (req, res) => {
        await User.findByIdAndUpdate(req.params.id, req.body);
        const user = await User.findById(req.params.id);
        res.send({
            error: false,
            message: `User with id #${user._id} has been updated`,
            user: user
        });
    },

    delete: async (req, res) => {
        await User.findByIdAndDelete(req.params.id);
        res.send({
            error: false,
            message: `User with id #${req.params.id} has been deleted`
        });
    }
}