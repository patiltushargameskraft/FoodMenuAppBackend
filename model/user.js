const checkUser = (name, password) => {
    return (
        `
        select * from user
        where name = "${name}" and password = "${password}"
        `
    )
}

const addUser = (name, password) => {
    return (
        `
        insert into user(name, password)
        values ("${name}", "${password}")
        `
    )
}

module.exports = {checkUser, addUser}