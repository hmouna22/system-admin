const express = require('express');
const client = require('../db'); // Database connection
const router = express.Router();

// Add a new intervention
router.post('/', async (req, res) => {
  const { asset_id, title, description, date } = req.body;

  try {
    const result = await client.query(
      `INSERT INTO interventions (asset_id, title, description, date)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [asset_id, title, description, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating intervention' });
  }
});

// Get all interventions
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM interventions');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching interventions' });
  }
});

// Get a specific intervention (by id)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query(
      `SELECT * FROM interventions WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Intervention not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching intervention' });
  }
});

// Update an intervention
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { asset_id, title, description, date } = req.body;

  try {
    const result = await client.query(
      `UPDATE interventions
       SET asset_id = $1, title = $2, description = $3, date = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5 RETURNING *`,
      [asset_id, title, description, date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Intervention not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating intervention' });
  }
});

// Delete an intervention
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query(
      `DELETE FROM interventions WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Intervention not found' });
    }

    res.json({ message: 'Intervention deleted successfully', intervention: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting intervention' });
  }
});

module.exports = router;
