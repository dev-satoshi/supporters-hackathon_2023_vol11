const { Pool } = require('pg');

// PostgreSQLデータベース設定を構成します。
const pool = new Pool({
    user: 'tono',       // PostgreSQLユーザー名
    host: 'localhost',           // PostgreSQLのホスト
    database: 'vol_11_2023',   // PostgreSQLデータベース名
    port: 5432,                  // PostgreSQLのポート
});

// INSERT文を実行する非同期関数です。
async function insertTask() {
    const client = await pool.connect();
    try {
        const insertQuery = `
      INSERT INTO tasks(user_id, subject_symbol, task_title, task_overview, task_deadline, is_on_time)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *;`;

        // 挿入する値です。実際の値に置き換えてください。
        const values = [
            1, // user_id
            'MATH101', // subject_symbol
            'Calculus Homework', // task_title
            'Homework about derivatives', // task_overview
            '2023-12-01 23:59:59', // task_deadline
            true // is_on_time
        ];

        // クエリの実行
        const res = await client.query(insertQuery, values);

        console.log('Inserted row:', res.rows[0]);
    } catch (err) {
        console.error('Error executing the query', err.stack);
    } finally {
        client.release(); // クライアントをプールに戻す
    }
}

// 関数を実行します。
insertTask();
