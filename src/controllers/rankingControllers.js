import psql from "../db/db.js";

const connection = psql();

const getRanking = async (req,res) => {
    try{
        const ranking = await connection.query(`SELECT users.id, users.name,COUNT(url_visits.url_id) AS visits, 
        (SELECT COUNT(urls.user_id) FROM urls WHERE users.id=urls.user_id) AS links FROM users 
        LEFT JOIN urls ON urls.user_id=users.id 
        LEFT JOIN url_visits ON urls.id=url_visits.url_id 
        GROUP BY users.id, urls.user_id 
        ORDER BY visits 
        DESC 
        LIMIT 10`);

        res.status(200).send(ranking.rows);
    } catch (err){
        console.log(err);
        res.sendStatus(500);
    }
}

export default getRanking;