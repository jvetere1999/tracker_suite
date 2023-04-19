use mysql_async::{Pool, Conn};
use mysql_async::prelude::Queryable;
use std::env;

pub struct Database {
    pool: Pool,
}

impl Database {
    pub fn new() -> Self {
        let url = format!(
            "mysql://{}:{}@localhost:3306/{}",
            "user1",
            "P!cknewPWD",
            "tracker_edge",
        );


        let pool = Pool::new(url);
        Database { pool }
    }

    pub async fn get_connection(&self) -> Result<Conn, mysql_async::Error> {
        self.pool.get_conn().await
    }
    pub async fn run(&self, query: &str) -> Result<Vec<Row>, mysql_async::Error> {
        let mut conn = self.get_connection().await?;
        let result = conn.query_map(query, |row| row).await?;
        conn.disconnect().await?;
        Ok(result)
    }
}