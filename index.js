const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const employeeRoutes = require('./routes/employees');

const app = express();
const PORT = 3000;

const db=require('./db')
// db.execute('select * from employees')
// .then(result=>{
//     console.log(result)
// })
// .catch(error=>{
//     console.log(error)
// })

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/employees', employeeRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
