const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT id, name, cohort_id
FROM students
LIMIT 5;
`)
.then(res => {
  console.log(res.rows);
})
.catch(err => console.error('query error', err.stack));

const cohortName = process.argv[2];
const limitRows = process.argv[3];

pool.query(`
SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${cohortName}%'
LIMIT ${limitRows || 5};
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an ID of ${user.student_id} and was in the ${user.cohort} cohort.`);
  })
})
.catch(err => console.error('query error', err.stack));