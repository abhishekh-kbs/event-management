require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

async function get_all_events({ city, category }) {
    const res = await axios.get("http://localhost:4000/api/events/view-events", {
        params: { city, category },
    });

    const events = res.data?.data?.events || res.data?.data || res.data || [];

    return Array.isArray(events)
        ? events
            .filter(e => e != null)
            .map((e) => ({
                title: e.title,
                city: e.city,
                category: e.category,
                eventDate: new Date(e.eventDate).toDateString(),
                venueName: e.venueName,
                spotsLeft: e.spotsLeft,
                description: e.description,
                link: `http://192.168.5.147:5173/events/${e.id}`,
            }))
        : [];
}

async function get_my_registered_events({ token }) {
    const res = await axios.get("http://localhost:4000/api/registrations/my-applications", {
        headers: { Authorization: `Bearer ${token}` },
    });

    const regs =
        res.data?.data?.registrations ||
        res.data?.data?.events ||
        res.data?.data ||
        res.data || [];

    return Array.isArray(regs)
        ? regs.slice(0, 9).map((r) => ({
            title: r.Event?.title || r.title,
            city: r.Event?.city || r.city,
            category: r.Event?.category || r.category,
            eventDate: new Date(r.Event?.eventDate || r.eventDate).toDateString(),
            spotsLeft: r.spotsLeft,
            status: r.status,
            link: `http://192.168.5.147:5173/events/${r.id}`,

        }))
        : [];
}

async function get_event_by_title({ title }) {
    const res = await axios.get("http://localhost:4000/api/events/view-events");

    const events = res.data?.data?.events || res.data?.data || res.data || [];

    const match = Array.isArray(events)
        ? events.filter(e =>
            e != null &&
            e.title?.toLowerCase().includes(title.toLowerCase())
        )
        : [];

    return match.map((e) => ({
        title: e.title || "Untitled",
        city: e.city || "TBA",
        category: e.category || "General",
        eventDate: e.eventDate ? new Date(e.eventDate).toDateString() : "TBA",
        venueName: e.venueName || "TBA",
        spotsLeft: e.spotsLeft ?? "N/A",
        description: e.description || "",
        link: `http://localhost:5173/events/${e.id}`,
    }));
}

app.post("/run-tool", async (req, res) => {
    const { toolName, toolArgs } = req.body;
    console.log(`MCP tool called: ${toolName}`, toolArgs);

    try {
        let result;

        if (toolName === "get_all_events") {
            result = await get_all_events(toolArgs);
        } else if (toolName === "get_my_registered_events") {
            result = await get_my_registered_events(toolArgs);
        } else if (toolName = "get_event_by_title") {
            result = await get_event_by_title(toolArgs);
        }
        else {
            return res.status(400).json({ error: "Unknown tool" });
        }

        console.log(`Tool result:`, result);
        return res.json({ success: true, data: result });

    } catch (err) {
        console.error("MCP tool error:", err.message);
        return res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(5050, () => {
    console.log("MCP server running on http://localhost:5050");
});