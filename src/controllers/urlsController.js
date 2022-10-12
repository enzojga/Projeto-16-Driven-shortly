import psql from "../db/db.js";
import joi from "joi";
import { nanoid } from 'nanoid'

const connection = psql();

const shortenUrl = async (req, res) => {

    try {
        const { url } = req.body;

        const urlSchema = joi.object({
            url: joi.string().uri().required()
        });

        const validation = urlSchema.validate({ ...req.body }, { abortEarly: false });

        if (validation.error) {
            return res.status(422).send(validation.error.details.map(d => d.message));
        }

        const shortenUrl = nanoid(8);
        console.log(res.locals.userId);

        await connection.query('INSERT INTO urls (url, short_url, user_id) VALUES ($1, $2, $3)', [url, shortenUrl, res.locals.userId]);

        res.status(201).send({shortUrl: shortenUrl});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

const getUrlId = async (req, res) => {

    try{
        const { id } = req.params;

        const url = await connection.query('SELECT * FROM urls WHERE id=$1', [id]);

        if(!url.rows[0]){
            return res.sendStatus(404);
        }

        console.log(url.rows[0]);
        delete url.rows[0].user_id;
        delete url.rows[0].createdAt;

        res.status(200).send(url.rows[0]);
    } catch ( err ){
        console.log(err);
        res.sendStatus(500);
    }
}

export { shortenUrl, getUrlId }