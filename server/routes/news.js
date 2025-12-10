import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await fetch(
            "https://content.guardianapis.com/search?api-key=test&show-fields=thumbnail,trailText"
        );
        const data = await response.json();

        const articles = data.response.results.map(item => ({
            id: item.id,
            title: item.webTitle,
            summary: item.fields?.trailText || "",
            image: item.fields?.thumbnail || "",
            link: item.webUrl,
            date: item.webPublicationDate,
            category: "hot",
            author: "The Guardian"
        }));

        res.json(articles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
