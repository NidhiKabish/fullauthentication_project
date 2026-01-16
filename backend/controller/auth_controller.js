const q = require ('q'),
  bcrypt = require ('bcrypt'),
  jwt = require ('jsonwebtoken'),
  //   generateVerificationCode = require('../../utils/generateVerificationCode'),
  userModel = require ('../models/user_model');

let auth = {};

/**
 * Function: is using for new user registeration
 * Developer: Nidhi
 * 
 */
  auth.signup = async (req, res) => {
    const {email, password, name} = req.body;
    console.log ('signup controller==================');
    console.log (email);
    console.log (password);
    console.log (name);
    try {
      if (!email || !password || !name) {
        throw new Error ('all fields are required');
      }

      const userAlreadyExists = await userModel.alreadyUser ({email});

      if (userAlreadyExists) {
        return res
          .status (400)
          .json ({success: false, message: 'User already exists'});
      } else {
        const hashedPassword = await bcrypt.hash (password, 10);
        console.log ('hashedPassswotfdddd===', hashedPassword);
        const verificationToken = Math.floor (
          100000 + Math.random () * 900000
        ).toString ();

        const createUser = await userModel.insertNewUser (
          req.body,
          hashedPassword,
          verificationToken
        );

        console.log ('userInsertedResult========controller', createUser);

        if (createUser) {
          console.log ('user inserted successfully====');
          // await sendEmail(name,`${name}, You registered successfully!`);
          return res
            .status (200)
            .json ({
              success: true,
              message: 'User registered successfully!check you email.',
            });
        } else {
          return res
            .status (401)
            .json ({success: false, message: 'Something went wrong!'});
        }
      }
    } catch (error) {
      return res.status (400).json ({success: false, message: error.message});
    }
  };

/**
 * Function: is using for login to a registered user 
 * Developer: Nidhi
 * 
 */

auth.login = async (req, res) => {
  const {email, password} = req.body;

  console.log(req.body);
  try {
    if (!email || !password) {
     return res.status (400).json ({
        success: false,
        message: 'Internal server error',
      });
    } else {
      let result = await userModel.getUserByEmail(email);
      console.log ('reslut=============', result);
      if (result) {
        const isMatch = await bcrypt.compare(password, result.au_password);
        if (!isMatch) {
          return res.status (401).json ({
            success: false,
            message: 'Invalid password',
          });
        } else {


          console.log("match =============")
          const token = jwt.sign (
            {
              id: result.au_id,
              email: result.au_email,
            },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
          );

         return res.json ({
            success: true,
            token,
          });
        }
      } else {
        return res.status (401).json ({
          success: false,
          message: 'Invalid user',
        });
      }
    }
  } catch (error) {
      console.error("Login error:", error); 

    return res.status (500).json ({
      success: false,
      message: 'Server error',
    });
  }
};




auth.dashboard = async function(req,res){

     res.json({
    success: true,
    message: "Dashboard opened",
    user: req.user
  });
}
/**
 * Function: is using for logout
 * Developer: Nidhi
 * 
 */

auth.logout = async (req, res) => {
  console.log ('logout successfullly======');
};

module.exports = auth;
