use mysql as my;
use mysql::Pool;

pub struct Database{
    database_ur: String,
    pool: Result<Pool, E>
}

impl database{
    pub fn new(database_ur: String) -> Self{
        database {
            database_ur,
            pool: my::Pool::new(database)
        }
    }
    pub fn insert(&self, record: String) -> String {
        let response = self::pool.prep_exec(record);
        response
    }
}
