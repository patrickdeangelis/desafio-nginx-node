const express = require("express")
const mysql = require("mysql")

const port = 3000
const app = express()
const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'node_app'
})



app.get("/", async (req, res) => {
    const queryInsert = "INSERT INTO people(name) VALUE ('fulano')"
    const querySelected = "SELECT name FROM people;"

    connection.query(queryInsert, function (error, results, fields) {
        if (error) throw error

        connection.query(querySelected, function (error, results, fields) {
            if (error) throw error

            let result = "<h1>Full Cycle Rocks!</h1><ul>"
            for (i=0; i<results.length; i++) {
                const people = results[i]
                console.log(people)
                result += `<li>${people.name}</li>`
            }
            result += "</ul>"

            return res.send(result)
        })
    })        
})

app.listen(port, () => {
    console.log(`Running server on port: ${port}`)
})
