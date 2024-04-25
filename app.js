import express, { json } from 'express';
import { get } from 'axios';


const app = express ();
app.use(json());


app.get('/activity', async (req, res) => {
    try {
        // Fetch activity from Bored API
        const response = await get('https://www.boredapi.com/api/activity');
        const activityData = response.data;

        // Map accessibility
        let accessibilityLevel;
        if (activityData.accessibility <= 0.25) {
            accessibilityLevel = "High";
        } else if (activityData.accessibility > 0.25 && activityData.accessibility <= 0.75) {
            accessibilityLevel = "Medium";
        } else if (activityData.accessibility > 0.75) {
            accessibilityLevel = "Low";
        }

        // Map price
        let priceLevel;
        if (activityData.price === 0) {
            priceLevel = "Free";
        } else if (activityData.price <= 0.5) {
            priceLevel = "Low";
        } else if (activityData.price > 0.5){
            priceLevel = "High";
        }

        // Construct response with mapped accessibility and price
        const mappedActivity = {
            activity: activityData.activity,
            accessibility: accessibilityLevel,
            type: activityData.type,
            participants: activityData.participants,
            price: priceLevel,
            link: activityData.link,
            key: activityData.key
        };

        // Send the response
        res.json(mappedActivity);
    } catch (error) {
        console.error("Error fetching activity");
        res.status(500).json({ error: "Failed to fetch activity" });
    }
});

module.exports = app
