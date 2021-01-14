import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const KEY_USER = "KEY_USER"

export default new Vuex.Store({
    state: {
        appName: "gas-vue-template",
        university: "University of Sulaimani",
        loading: false,
        submitting: false,
        keyUser: KEY_USER,
        user: {
            error: false,
            stage: 1,
            semesters: [1, 2],
            email: "yunjia.fei@gmail.com",
            courseCode: "UOS090010",
            name: "Ashton Fei",
            college: "Engineering",
            department: "IT",
        },
        modulesInfo: [],
        studentsInfo: [],
        pages: [{
            icon: "mdi-home",
            path: "/",
            label: "Home"
        },
        {
            icon: "mdi-information",
            path: "/about",
            label: "About"
        },
        ],
        outlined: true,
        showSnackbar: false,
        snackbarMessage: null,
        snackbarColor: "message",
    },
    getters: {},
    actions: {
        OPEN_SNACKBAR({
            commit
        }, {
            message,
            color
        }) {
            commit("openSnackbar", {
                message,
                color
            })
        },
        LOGIN({
            commit
        }, {
            email,
            password,
            userType
        }) {
            return new Promise((resolve, reject) => {
                try {
                    google.script.run
                        .withSuccessHandler(response => {
                            const {
                                user,
                                modulesInfo
                            } = JSON.parse(response);
                            if (user.error) {
                                reject(user.message)
                            } else {
                                commit('updateUser', user)
                                commit('updateModulesInfo', modulesInfo)
                                try {
                                    localStorage.setItem(KEY_USER, JSON.stringify(user))
                                } catch (e) {
                                    //pass
                                }
                                resolve(`Welcome ${user.name}!`)
                            }
                        })
                        .withFailureHandler(e => {
                            reject(e.message)
                        })
                        .login(email, password, userType);
                } catch (e) {
                    resolve(`Frontend updated, backend error: ${e.message}`)
                }
            })
        },
        LOGOUT({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                try {
                    google.script.run
                        .withSuccessHandler(() => {
                            commit('updateUser', {
                                error: true
                            })
                            try {
                                localStorage.removeItem(KEY_USER)
                            } catch (e) {
                                //pass
                            }
                            resolve('Logout successfully.')
                        })
                        .withFailureHandler(e => {
                            reject(e.message)
                        })
                        .logout(JSON.stringify(state.user))
                } catch (e) {
                    commit('updateUser', {
                        error: true
                    })
                    try {
                        localStorage.removeItem(KEY_USER)
                    } catch (e) {
                        //pass
                    }
                    resolve(`Frontend logged out, backend error: ${e.message}`)
                }
            })
        },
        GET_MODULES_INFO({
            commit
        }) {
            const module1 = {
                courseCode: "UOS090010S0101",
                moduleNameEnglish: "University Work Environment (UWE)",
                moduleNameKurdish: "University Work Environment (UWE) (Kurdish)",
                moduleNameArabic: "University Work Environment (UWE) (Arabic)",
                language: "Kurdish",
                notation: "DU",
                theory: 2,
                practical: 3,
                lab: 0,
                project: 2,
                exam: false,
                continousEvaluation: true,
                ects: 4,
                pre: 40,
                final: 60,
            }
            const module2 = {
                courseCode: "UOS090010S0102",
                moduleNameEnglish: "Kurdology (KUR) (UWE)",
                moduleNameKurdish: "Kurdology (KUR) (UWE) (Kurdish)",
                moduleNameArabic: "Kurdology (KUR) (UWE) (Arabic)",
                language: "Kurdish",
                notation: "DU",
                theory: 2,
                practical: 0,
                lab: 0,
                project: 3,
                exam: true,
                continousEvaluation: false,
                ects: 4,
                pre: 40,
                final: 60,
            }
            return new Promise((resolve, reject) => {
                try {
                    google.script.run
                        .withSuccessHandler(response => {
                            const modulesInfo = JSON.parse(response)
                            commit("updateModulesInfo", modulesInfo)
                            resolve("Modules Info has been refreshed")
                        })
                        .withFailureHandler(e => {
                            reject(e.message)
                        })
                        .getModulesInfo()
                } catch (e) {
                    commit("updateModulesInfo", [module1, module2])
                    resolve(`Frontend updated, backend error: ${e.message}`)
                }
            })
        },
        GET_STUDENTS_INFO({
            commit
        }) {
            const student1 = {
                index: 1,
                name: "Ashton Fei",
                kurdishName: "Ashton Fei (Kurdish)",
                gender: "Male",
                collegeCode: "090",
                departmentCode: "010",
                academicYear: "19",
                genderCode: "1",
                academicStage: "1",
                status: "Permanent Student",
                statusCode: "0",
                sequence: "073",
                code: "UOS09001019110073",
                email: "yunjia.fei@gmail.com",
                password: "pwd123456",
                stage: "1",
                semester: "2",
                notes: "no notes",
            }
            const student2 = {
                index: 2,
                name: "Yuki Yu",
                kurdishName: "Yuki Yu (Kurdish)",
                gender: "Female",
                collegeCode: "090",
                departmentCode: "010",
                academicYear: "19",
                genderCode: "1",
                academicStage: "1",
                status: "Permanent Student",
                statusCode: "0",
                sequence: "074",
                code: "UOS09001019110074",
                email: "yuki.yu@gmail.com",
                password: "pwd123456",
                stage: "1",
                semester: "2",
                notes: "no notes",
            }
            return new Promise((resolve, reject) => {
                try {
                    google.script.run
                        .withSuccessHandler(response => {
                            const studentsInfo = JSON.parse(response)
                            commit("updateStudentsInfo", studentsInfo)
                            resolve("Students Info has been refreshed")
                        })
                        .withFailureHandler(e => {
                            reject(e.message)
                        })
                        .getStudentsInfo()
                } catch (e) {
                    commit("updateStudentsInfo", [student1, student2])
                    resolve(`Frontend updated, backend error: ${e.message}`)
                }
            })
        },
        CREATE_MODULES_INFO({
            commit
        }, values) {
            return new Promise((resolve, reject) => {
                try {
                    google.script.run
                        .withSuccessHandler((response) => {
                            const modulesInfo = JSON.parse(response)
                            commit("updateModulesInfo", modulesInfo)
                            resolve("New Modules Info has been added")
                        })
                        .withFailureHandler((e) => {
                            reject(e.message)
                        })
                        .createModulesInfo(JSON.stringify(values))
                } catch (e) {
                    resolve(`Frontend updated, backend error: ${e.message}`)
                }
            })
        },
        EDIT_MODULES_INFO({
            commit
        }, item) {
            return new Promise((resolve, reject) => {
                try {
                    google.script.run
                        .withSuccessHandler((response) => {
                            const modulesInfo = JSON.parse(response)
                            commit("updateModulesInfo", modulesInfo)
                            resolve("Changes on Modules Info have been saved")
                        })
                        .withFailureHandler((e) => {
                            reject(e.message)
                        })
                        .editModulesInfo(JSON.stringify(item))
                } catch (e) {
                    resolve(`Frontend updated, backend error: ${e.message}`)
                }
            })
        },
        DELETE_MODULES_INFO({
            commit
        }, item) {
            return new Promise((resolve, reject) => {
                try {
                    const courseCode = item.courseCode
                    google.script.run
                        .withSuccessHandler(() => {
                            commit('deleteModulesInfo', item)
                            resolve("Modules info has been deleted")
                        })
                        .withFailureHandler(e => {
                            reject(e.message)
                        })
                        .deleteModulesInfo(courseCode)
                } catch (e) {
                    commit('deleteModulesInfo', item)
                    resolve(`Frontend updated, backend error: ${e.message}`)
                }
            })
        },
        DELETE_STUDENTS_INFO({
            commit
        }, item) {
            return new Promise((resolve, reject) => {
                try {
                    const code = item.code
                    google.script.run
                        .withSuccessHandler(() => {
                            commit('deleteStudentsInfo', item)
                            resolve("Students info has been deleted")
                        })
                        .withFailureHandler(e => {
                            reject(e.message)
                        })
                        .deleteStudentsInfo(code)
                } catch (e) {
                    commit('deleteStudentsInfo', item)
                    resolve(`Frontend updated, backend error: ${e.message}`)
                }
            })
        },
    },
    mutations: {
        updateUser: (state, user) => state.user = user,
        updateModulesInfo: (state, modulesInfo) => state.modulesInfo = modulesInfo,
        deleteModulesInfo: (state, item) => state.modulesInfo = state.modulesInfo.filter(v => v.courseCode !== item.courseCode),
        updateStudentsInfo: (state, studentsInfo) => state.studentsInfo = studentsInfo,
        deleteStudentsInfo: (state, item) => state.studentsInfo = state.studentsInfo.filter(v => v.code !== item.code),
        openSnackbar: (state, {
            message,
            color
        }) => {
            state.showSnackbar = true
            state.snackbarMessage = message
            state.snackbarColor = color || "message"
        },
        updateShowSnackbar: (state, value) => {
            state.showSnackbar = value
        },
    },
})