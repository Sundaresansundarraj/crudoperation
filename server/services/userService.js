const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/users.json');

const readDataFromFile = () => {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

const writeDataToFile = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

class UserService {
    getAllUsers() {
        return readDataFromFile();
    }

    getUserById(id) {
        const users = readDataFromFile();
        return users.find(user => user.id === id);
    }

    createUser(user) {
        const users = readDataFromFile();
        user.id = Date.now().toString();
        users.push(user);
        writeDataToFile(users);
        return user;
    }

    updateUser(id, updatedUser) {
        const users = readDataFromFile();
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...updatedUser };
            writeDataToFile(users);
            return users[index];
        }
        return null;
    }

    deleteUser(id) {
        const users = readDataFromFile();
        const newUsers = users.filter(user => user.id !== id);
        writeDataToFile(newUsers);
        return users.length !== newUsers.length;
    }
}

module.exports = new UserService();
