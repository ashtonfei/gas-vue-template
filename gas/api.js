const login = (email, password, userType) => {
    const app = new App()
    const data = app.login(email, password, userType)
    return JSON.stringify(data)
}

const logout = (user) => {
    user = JSON.parse(user)
    new App().logout(user)
}