
const findSomething = (user,searchFor) => {
    if (user.firstName.toLowerCase().includes(searchFor)) {
        return user
    }
    if (user.lastName.toLowerCase().includes(searchFor)) {
        return user
    }
    if (user.username.toLowerCase().includes(searchFor)) {
        return user
    }
    if (user.username.toLowerCase().includes(searchFor)) {
        return user
    }
    if (user.role.toLowerCase().includes(searchFor)) {
        return user
    }
    if (user.createdDate.toLowerCase().includes(searchFor)) {
        return user
    }
}

export {findSomething}
