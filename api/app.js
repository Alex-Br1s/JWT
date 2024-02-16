const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());


app.listen(3001, () =>{
    console.log("Server listening on port 3001")
});

app.post('/login', (req, res) => {
    const user = req.body.user;
    console.log('Datos del formulario:', user); // Mostrar los datos del formulario en la consola
    const token = jwt.sign(user, 'elkeyser', {expiresIn: '3m'});
    console.log('Token JWT generado:', token); // Mostrar el token JWT en la consola
    res.status(200).json(token);
});

app.post('/prueba', (req, res) => {
    const token = req.headers['authorization'];
    console.log('Token JWT recibido:', token); // Mostrar el token JWT recibido en la consola
    jwt.verify(token, 'elkeyser', (err, user) => {
        if (err) {
            console.error('Error de verificación de token:', err); // Mostrar errores de verificación del token en la consola
            res.status(403).json({ msg: 'No autorizado' });
        } else {
            console.log('Datos del usuario extraídos del token:', user); // Mostrar los datos del usuario extraídos del token en la consola
            res.status(200).json({ msg: 'Éxito', user });
        }
    });
});


app.post('/prueba', (req, res) => {
    const token = req.headers['authorization'];
    jwt.verify(token, 'elkeyser', (err, user) => {
        if (err) {
            res.status(403).json({ msg: 'No autorizado' });
        } else {
            res.status(200).json({ msg: 'Éxito', user });
        }
    });
});

