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
            username,
            password,
            database_name,
        );


        let pool = Pool::new(url);
        Database { pool }
    }

    pub async fn get_connection(&self) -> Result<Conn, mysql_async::Error> {
        self.pool.get_conn().await
    }
}