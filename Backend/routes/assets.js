const express = require('express');
const client = require('../db');
const router = express.Router();

// Get all assets
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM assets');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database query error' });
  }
});


// Get an asset using id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM assets WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Asset not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Database query error' });
  }
});

// Post new asset
router.post('/', async (req, res) => {
  const { name, status, location, ip_address, next_preventive_maintenance } = req.body;
  try {
    const result = await client.query(
      `INSERT INTO assets (name, status, location, ip_address, next_preventive_maintenance)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, status, location, ip_address, next_preventive_maintenance]
    );
    res.status(201).json({ message: 'Asset created successfully', asset: result.rows[0] } );
  } catch (err) {
    res.status(500).json({ error: 'Error creating asset' });
  }
});

//Update asset
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, status, location, ip_address, next_preventive_maintenance } = req.body;
  try {
    const result = await client.query(
      `UPDATE assets
       SET name = $1, status = $2, location = $3, ip_address = $4, next_preventive_maintenance = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 RETURNING *`,
      [name, status, location, ip_address, next_preventive_maintenance, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Asset not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: 'Error updating asset' });
  }
});

//Delete asset
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await client.query('DELETE FROM assets WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Asset not found' });
    } else {
      res.json({ message: 'Asset deleted successfully', asset: result.rows[0] });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error deleting asset' });
  }
});

module.exports = router;
