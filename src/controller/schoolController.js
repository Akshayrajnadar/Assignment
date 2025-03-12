const pool = require('../config/db');
const School = require('../models/schoolModel');

// 📌 Add School
const addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    try {
        const query = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
        const [result] = await pool.query(query, [name, address, latitude, longitude]);
        res.json({ message: 'School added successfully', schoolId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
};

// 📌 List Schools Sorted by Distance
const listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;
    console.log(latitude, longitude);

    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }

    try {
        const query = `
            SELECT *, 
            (6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(latitude)) * 
            COS(RADIANS(longitude) - RADIANS(?)) + SIN(RADIANS(?)) * 
            SIN(RADIANS(latitude)))) AS distance 
            FROM schools 
            ORDER BY distance ASC`;

        const [schools] = await pool.query(query, [latitude, longitude, latitude]);
        res.json(schools.map(school => new School(school.id, school.name, school.address, school.latitude, school.longitude)));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
};

module.exports= {addSchool,     
                listSchools,};
