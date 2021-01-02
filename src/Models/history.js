/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const db = require("../Configs/db")
const history = {}

history.getHistory = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id, cashier, date, orders, amount FROM public.history ORDER BY id ASC`)
            .then((res) => {
                if (res.rows.length == 0) {
                    resolve("Data is empty");
                }
                else {
                    resolve(res.rows);
                }
            }).catch((err) => {
                reject(err);
            });
    })
}

history.addHistory = (data) => {
    return new Promise((resolve, reject) => {
        if (data.cashier != undefined && data.date != undefined && data.orders != undefined && data.amount != undefined) {
            db.query(`INSERT INTO public.history(cashier, date, orders, amount)
                VALUES ('${data.cashier}', '${data.date}', '${data.orders}', ${data.amount});`)
                .then((res) => {
                    resolve(data)
                }).catch((err) => {
                    reject(err)
                });
        }
        else {
            resolve("Make sure all data is filled.")
        }
    })
}

history.updateHistory = (data) => {
    return new Promise((resolve, reject) => {
        if (data.id == undefined) {
            resolve(`ID must be filled`)
        }
        else {
            db.query(`SELECT id, cashier, date, orders, amount FROM public.history
                WHERE id = ${data.id}`)
                .then((res) => {
                    if (res.rows.length == 0) {
                        resolve(`Data with ID = ${data.id} doesn't exist`)
                    }
                    else {
                        if (data.cashier != undefined && data.date != undefined && data.orders != undefined && data.amount != undefined) {
                            db.query(`UPDATE public.history SET cashier='${data.cashier}', date='${data.date}', orders='${data.orders}', amount=${data.amount}
                            WHERE id = ${data.id};`)
                                .then((res) => {
                                    resolve(data)
                                }).catch((err) => {
                                    reject(err);
                                });
                        }
                        else {
                            resolve("Make sure all data is filled.")
                        }
                    }
                }).catch((err) => {
                    reject(err);
                });
        }
    })
}

history.delHistory = (id) => {
    return new Promise((resolve, reject) => {
        if (id != undefined) {
            db.query(`SELECT id, cashier, date, orders, amount FROM public.history
                WHERE id = '${id}'`)
                .then((res) => {
                    if (res.rows.length != 0) {
                        db.query(`DELETE FROM public.history WHERE id = ${id};`)
                            .then((res) => {
                                resolve(`Data with ID = ${id} was deleted`)
                            }).catch((err) => {
                                reject(err);
                            });
                    }
                    else {
                        resolve(`Data with ID = ${id} doesn't exist`)
                    }
                }).catch((err) => {
                    reject(err)
                });
        }
        else {
            resolve(`ID must be filled`)
        }
    })
}

module.exports = history