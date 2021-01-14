const TOKEN_EXP_IN_SECONDS = 21600

class App {
    constructor() {
        this.cache = CacheService.getScriptCache()
    }

    getUsers() {
        return [{ email: 'test@gmail.com', password: 'pwd123456' }]
    }

    getUserByEmail(email) {
        const users = this.getUsers()
        const user = users.find(user => user.email === email)
        if (user) return user
        return null
    }

    createToken(email) {
        const token = Utilities.base64EncodeWebSafe(Utilities.getUuid())
        this.cache.put(token, email, TOKEN_EXP_IN_SECONDS)
        return token
    }

    login(email, password) {
        const user = this.getUserByEmail(email)
        if (!user) return {
            user: {
                error: true,
                message: `Wrong User Name or Password.`
            }
        }
        const userPassword = user.password
        if (userPassword !== password) return {
            user: {
                error: true,
                message: `Wrong User Name or Password.`
            }
        }
        const token = this.createToken(email)
        user.token = token
        return {
            user
        }
    }

    logout(user) {
        console.log(user)
    }
}