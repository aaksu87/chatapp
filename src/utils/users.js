const users = [];

//addUser, removeUser, getUser, getUsersInRoom

const addUser = ({id, username, room}) => {
    
    //clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //validate data
    if(!username || !room){
        return {
            error : 'Username and room required'
        }
    }

    //check for existing user
    const existingUseer = users.find((user) => {
        return user.room === room && user.username === username
    });

    if(existingUseer){
        return {
            error : 'Allready joined user'
        }
    }

    //store user 
    const user = { id, username, room }
    users.push(user);

    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => {
        return user.id === id
    });
}

const getUsersInRoom = (room) => {
    return users.filter((user) => {
        return user.room === room
    });
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}