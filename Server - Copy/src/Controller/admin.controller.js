const { User } = require("../models/user.model");



// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving users." });
    }
};

// Get single user by ID (admin only)
const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ msg: "User not found." });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving user." });
    }
};

// Update a user (admin only)
const updateUser = async (req, res) => {
    try {
        const updated = await User.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            res.json({ msg: "User updated successfully." });
        } else {
            res.status(404).json({ msg: "User not found." });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error updating user." });
    }
};

// Delete a user (admin only)
const deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.json({ msg: "User deleted successfully." });
        } else {
            res.status(404).json({ msg: "User not found." });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error deleting user." });
    }
};

module.exports = { getUser, getAllUsers, updateUser, deleteUser };
