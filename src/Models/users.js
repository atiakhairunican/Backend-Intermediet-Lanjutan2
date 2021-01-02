/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const db = require("../Configs/db")
const loggers = require("../Configs/wins")

class Users {
    async add(data) {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO public.users(name, email, password, role)
                VALUES ('${data.name}', '${data.email}', '${data.password}', '${data.role}');`)
                .then((res) => {
                    resolve(data)
                }).catch((err) => {
                    loggers.warn("Failed add users", err)
                    reject(err)
                });
        })
    }

    async getAll() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id, name, email, password, role FROM public.users ORDER BY id ASC;`)
                .then((res) => {
                    if (res.rows.length == 0) {
                        resolve("Data is empty");
                    }
                    else {
                        resolve(res.rows);
                    }
                }).catch((err) => {
                    loggers.warn("Failed get all users", err)
                    reject(err);
                });
        })
    }

    async getByEmail(email) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id, name, email, password, role FROM public.users WHERE email = '${email}';`)
                .then((res) => {
                    resolve(res.rows)
                }).catch((err) => {
                    loggers.warn("Failed get email users", err)
                    reject(err);
                });
        })
    }

    async update(data) {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE public.users SET name='${data.name}', email='${data.email}', password='${data.password}', role='${data.role}'
            WHERE id=${data.id};`)
                .then((res) => {
                    resolve(data)
                }).catch((err) => {
                    loggers.warn("Failed update users", err)
                    reject(err);
                });
        })
    }

    async del(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id, name, email, password, role FROM public.users WHERE id = '${id}';`)
                .then((res) => {
                    if (res.rows.length == 0) {
                        resolve(`Data with ID = ${id} doesn't exist`)
                    }
                    else {
                        db.query(`DELETE FROM public.users WHERE id = ${id};`)
                            .then((res) => {
                                resolve(`Data with ID = ${id} was deleted`)
                            }).catch((err) => {
                                loggers.warn("Failed delete users", err)
                                reject(err);
                            });
                    }
                }).catch((err) => {
                    loggers.warn("Failed get id users", err)
                    reject(err);
                });
        })
    }
}

module.exports = new Users()