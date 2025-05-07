import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const user = req.user;
    return res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,        
        email: user.email,
        profileImage: user.profileImage || ""
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error while getting user data" });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) return res.status(400).json({ success: false, message: "Username and email required" });

    const update = { username, email };
    if (req.file) update.profileImage = `/uploads/${req.file.filename}`;

    const updated = await userModel.findByIdAndUpdate(req.user._id, update, { new: true }).select("-password");
    return res.json({ success: true, message: "Updated", user: {
      id: updated._id,
      username: updated.username,
      email: updated.email,
      profileImage: updated.profileImage || ""
    }});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error while updating" });
  }
};
