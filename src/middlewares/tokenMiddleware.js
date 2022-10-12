import psql from "../db/db";
const connection = psql();

const verifyToken = async (req, res, next) => {
    const { token } = req.headers;

    if(!token){
        return res.sendStatus(409);
    }

    const session = await connection.query('SELECT * FROM sessions WHERE token=$1',[token]);

    if(!session.rows[0]){
        res.sendStatus(409);
    }

    next();
}