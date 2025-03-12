const pool = require('../config/db');
const School = require('../models/schoolModel');

// 📌 Utility function for validating input data
const validateSchoolData = (name, address, latitude, longitude) => {
    if (!name || !address || latitude === undefined || longitude === undefined) {
        return 'All fields are required';
    }
    if (typeof name !== 'string' || typeof address !== 'string') {
        return 'Name and address must be strings';
    }
    if (isNaN(latitude) || isNaN(longitude)) {
        return 'Latitude and longitude must be valid numbers';
    }
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        return 'Latitude must be between -90 and 90, and longitude must be between -180 and 180';
    }
    return null;
};

// 📌 Add School
const addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    // Validate input data
    const validationError = validateSchoolData(name, address, latitude, longitude);
    if (validationError) {
        return res.status(400).json({ error: validationError });
    }

    try {
        if (!pool) {
            throw new Error('Database connection is not available');
        }

        const query = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
        const [result] = await pool.query(query, [name, address, latitude, longitude]);

        res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
    } catch (error) {
        console.error('Database error:', error);

        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            return res.status(500).json({ error: 'Database access denied' });
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            return res.status(500).json({ error: 'Database not found' });
        } else if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'School with this name already exists' });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
};

// 📌 List Schools Sorted by Distance
const listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }

    try {
        if (!pool) {
            throw new Error('Database connection is not available');
        }

        const query = `
            SELECT *, 
            (6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(latitude)) * 
            COS(RADIANS(longitude) - RADIANS(?)) + SIN(RADIANS(?)) * 
            SIN(RADIANS(latitude)))) AS distance 
            FROM schools 
            ORDER BY distance ASC`;

        const [schools] = await pool.query(query, [latitude, longitude, latitude]);

        if (!schools.length) {
            return res.status(404).json({ message: 'No schools found' });
        }

        res.json(schools.map(school => new School(school.id, school.name, school.address, school.latitude, school.longitude)));
    } catch (error) {
        console.error('Database error:', error);

        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            return res.status(500).json({ error: 'Database access denied' });
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            return res.status(500).json({ error: 'Database not found' });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addSchool,
    listSchools,
};
