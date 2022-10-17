import psql from "../db/db.js";

const connection = psql();

const getUser = async (req, res) => {

    try{
        const user = await connection.query(`SELECT users.id, users.name, COUNT(urls.user_id) as visitCount FROM url_visits
        JOIN urls ON url_visits.url_id = urls.id 
        RIGHT JOIN users ON urls.user_id=users.id 
        WHERE users.id = $1 
        GROUP BY users.id;`, [res.locals.userId]);

        const urls = await connection.query(`SELECT urls.id AS id, urls.short_url, urls.url, COUNT(url_visits.url_id) AS "visitCount"
        FROM urls LEFT JOIN url_visits ON url_visits.url_id = urls.id 
        WHERE urls.user_id = $1 
        GROUP BY urls.id, url_visits.url_id;`, [res.locals.userId]);

        const objSend = {
            ...user.rows[0],
            shortenedUrls:urls.rows
        }

        /*if(!urls.rows[0]){
            const user = await connection.query(`SELECT id,name FROM users WHERE id=$1`, [res.locals.userId]);
            const objSend = {
                ...user.rows[0],
                visitCount: 0,
                shortenedUrls:urls.rows
            }
            return res.status(200).send(objSend);
        }else{
            const user = await connection.query(`SELECT users.id, users.name, COUNT(urls.user_id) as visitCount FROM url_visits
            JOIN urls ON url_visits.url_id = urls.id 
            JOIN users ON urls.user_id=users.id 
            WHERE users.id = $1 
            GROUP BY users.id;`, [res.locals.userId]);
            const objSend = {
                ...user.rows[0],
                shortenedUrls:urls.rows
            }
            
        }*/
        return res.status(200).send(objSend);
        } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export { getUser }