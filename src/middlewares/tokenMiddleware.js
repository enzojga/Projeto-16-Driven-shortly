import psql from "../db/db.js";
const connection = psql();

const verifyToken = async (req, res, next) => {
    try{
        const { authorization } = req.headers;
        const tokenHeader = authorization?.replace('Bearer ', '');

        const session = await connection.query('SELECT * FROM sessions WHERE token=$1',[tokenHeader]);

        if(!session.rows[0]){
            return res.sendStatus(401);
        }

        res.locals.userId = session.rows[0].user_id;

        next();
    }catch (err){
        res.sendStatus(500);
    }
}

export { verifyToken }