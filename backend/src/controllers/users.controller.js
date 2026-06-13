import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Todo from "../models/todos.model.js";
import User from "../models/users.model.js";
import sendEmail from "../config/nodemailer.js";

export const generateAccessToken = (userId) => {
    return jwt.sign(
        {
            id: userId
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "15m",
        }
    );
};

export const generateRefreshToken = (userId) => {
    return jwt.sign(
        {
            id: userId,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d",
        }
    );
};


export const generatePasswordResetToken = (userId) => {
    return jwt.sign(
        {
            id: userId,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "15m",
        }
    );
};

export const register = async (req, res) => {
    try {
        console.log("hit");


        const { name, email, password } =
            req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,

        });
        const accessToken = generateAccessToken(user._id);

        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;

        await user.save();

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });


        res.status(201).json({
            success: true,
            user: {
                name: user.name, email: user.email, role: user.role
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }

        const accessToken = generateAccessToken(user._id);

        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;

        await user.save();

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({
            success: true,
            message: "Login Success",
            user: {
                name: user.name,
                id: user._id,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


export const getProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);


        res.status(200).json({
            success: true,
            message: "user profile fetched",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                user: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


export const logout = async (req, res) => {

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({
        success: true,
        message: "Logout Success",
    });
};

export const updateUser = async (req, res) => {
    try {

        const id = req.user.id

        const user = await User.findByIdAndUpdate(id, req.body, { new: true }).select("-password -refreshToken");

        res.status(200).json({
            success: true,
            message: "user updated successfully",
            user


        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


export const deleteUser = async (req, res) => {
    try {

        const id = req.user.id

        const user = await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "user deleted successfully",

        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        const findUser = await User.findOne({ email });


        if (!findUser) {
            return res.status(400).json({
                message: "No match in our app!"
            })
        }
        console.log(findUser)


        //token created
        const pwResetToken = generatePasswordResetToken(findUser._id);
        /*
         to: options.email,
            subject: options.subject,
            html: options.html,
        
        */

        const resetLink = `http://localhost:3000/api/auth/reset-password/${pwResetToken}`

        const option = {
            to: email,
            subject: "Password Reset Request",
            html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 10px; background-color: #f9fafb;">
      <h2 style="color: #2563eb; text-align: center;">
        Password Reset Request
      </h2>

      <p style="font-size: 16px; color: #374151;">
        Hello,
      </p>

      <p style="font-size: 16px; color: #374151; line-height: 1.6;">
        We received a request to reset your password. Click the button below to create a new password.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a
          href="${resetLink}"
          style="
            background-color: #2563eb;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            display: inline-block;
            font-weight: bold;
          "
        >
          Reset Password
        </a>
      </div>

      <p style="font-size: 14px; color: #6b7280;">
        If you didn't request a password reset, you can safely ignore this email.
      </p>

      <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />

      <p style="font-size: 12px; color: #9ca3af; text-align: center;">
        This link will expire in 15 minutes for security reasons.
      </p>
    </div>
  `
        };
        await sendEmail(option);


        res.status(200).json({
            success: true,
            message: "password reset link sent successfully",

        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const resetPassword = async (req, res) => {

    try {
        const token = req.params.token;
        const checkToken = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        if (!checkToken) {
            return res.status(400).json({
                success: false,
                message: "token is not correct"
            })
        }


        const { password } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        const findUser = await User.findByIdAndUpdate(checkToken.id, { password: hashPassword }, { new: true }).select("-password -refreshToken");


        res.status(200).json({
            success: true,
            message: "password reset  successfully",

        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: "Access Denied: No Refresh Token Provided" });
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decodedUser) => {
            if (err) {
                // Token is either expired or tampered with
                return res.status(403).json({ message: "Invalid or expired refresh token" });
            }

            // Token is valid! Generate a brand new Access Token
            const newAccessToken = jwt.sign(
                { id: decodedUser.id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' } // Short-lived access token
            );

            // Send the new access token back as an HttpOnly cookie
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,     // Prevents XSS attacks (JS can't read it)
                secure: process.env.NODE_ENV === 'production', // true in production (HTTPS only)
                sameSite: 'lax',    // Helps protect against CSRF attacks
                maxAge: 15 * 60 * 1000 // 15 minutes in milliseconds
            });
            // const user = await User.findById(decodedUser._id).select("-password -refrshToken");

            return res.status(200).json({ message: "Token refreshed successfully" });
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
