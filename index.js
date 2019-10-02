const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs');

const port = 5000
app.listen(port, () => console.log(`App is listening to port ${port}!`))


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/users', function (req, res) {
    res.sendFile(path.join(__dirname+'/users.json'));
});
  
app.post('/users', function (req, res) {      
    let usersdata = fs.readFileSync("users.json");
    let users = JSON.parse(usersdata);
    const newUser = {
        "name": req.query.name,
        "surname": req.query.surname,
        "short": req.query.short
    }
    users.users.push(newUser);
    users.count++;
    let data = JSON.stringify(users);
    fs.writeFileSync(('users.json'), data);

    response = {  
        added: true,
        name: req.query.name,
        surname: req.query.surname,
        short: req.query.short
    };
    res.end(JSON.stringify(response));  
});
