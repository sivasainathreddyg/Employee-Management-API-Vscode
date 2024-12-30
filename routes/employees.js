const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all employees
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM employees');
        console.log('Retrieved Employees:', rows);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Get employee by ID
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM employees WHERE id = ?', [req.params.id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new employee
router.post('/', async (req, res) => {
    const { name, position, department, salary, hire_date } = req.body;
    try {
        const [result] = await db.query('INSERT INTO employees (name, position, department, salary, hire_date) VALUES (?, ?, ?, ?, ?)', [name, position, department, salary, hire_date]);
        res.json({ id: result.insertId, name, position, department, salary, hire_date });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Update employee
router.put('/:id', async (req, res) => {
    const { name, position, department, salary, hire_date } = req.body;
    try {
        await db.query('UPDATE employees SET name = ?, position = ?, department = ?, salary = ?, hire_date = ? WHERE id = ?', [name, position, department, salary, hire_date, req.params.id]);
        res.json({ message: 'Employee updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete employee
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM employees WHERE id = ?', [req.params.id]);
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
