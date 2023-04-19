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
            env::var("MYSQL_USER").unwrap(),
            env::var("MYSQL_PASSWORD").unwrap(),
            env::var("MYSQL_DATABASE").unwrap(),
        );

        let pool = Pool::new(url);
        Database { pool }
    }

    pub async fn get_connection(&self) -> Result<Conn, mysql_async::Error> {
        self.pool.get_conn().await
    }
}