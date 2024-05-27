const userService = require('../services/userService');

class UserController {
    getAllUsers(req, res) {
        const users = userService.getAllUsers();
        res.json(users);
    }

    getUserById(req, res) {
        const user = userService.getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    }

    createUser(req, res) {
        const newUser = userService.createUser(req.body);
        res.status(201).json(newUser);
    }

    updateUser(req, res) {
        const updatedUser = userService.updateUser(req.params.id, req.body);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).send('User not found');
        }
    }

    deleteUser(req, res) {
        const success = userService.deleteUser(req.params.id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).send('User not found');
        }
    }
}

module.exports = new UserController();
