import psql from "../db/db.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

const connection = psql();

const signUp = async (req, res) => {

    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(422).send("As senhas não coincidem ");
        }

        const emailVerify = await connection.query("SELECT * FROM users WHERE email=$1", [email]);

        if (emailVerify.rows[0]) {
            return res.status(409).send("E-mail já cadastrado");
        }

        const cryptoPassword = bcrypt.hashSync(password, 10);

        await connection.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
            [name, email, cryptoPassword]);

        return res.sendStatus(201);
    } catch (err) {

        console.log(err);
        res.sendStatus(500);

    }

}

const signIn = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await connection.query('SELECT * FROM users WHERE email=$1', [email]);

        if(!user.rows[0] || !bcrypt.compareSync(password, user.rows[0].password)){
            return res.status(401).send("Usuário ou senha incompatível ");
        }

        const token = uuid();
        await connection.query('INSERT INTO sessions (token, user_id) VALUES ($1, $2)', [token, user.rows[0].id]);
        
        res.status(200).send(token);

    } catch (err) {
        res.sendStatus(500);
    }
}

export { signUp, signIn }