#[macro_use] extern crate rocket;

use rocket::serde::{json::Json, Deserialize, Serialize};
use rocket::response::status;
use rocket::State;

use mysql_async::{Pool, Conn, Row};
use mysql_async::prelude::Queryable;

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

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
struct SqlRequest {
    query: String,
}

#[post("/sql", format = "json", data = "<sql_object>")]
pub async fn sql_req(db: &State<Database>, sql_object: Json<SqlRequest>) -> Result<status::Accepted<String>, rocket::http::Status> {
    match db.run(&sql_object.query).await {
        Ok(result) => Ok(status::Accepted(Some(format!("Result: {:?}", result)))),
        Err(_) => Err(rocket::http::Status::InternalServerError),
    }
}




#[get("/check")]
fn check() -> status::Accepted<String> { status::Accepted(Some("Here".parse().unwrap())) }

#[post("/check_in", format = "application/json", data = "<check_in>", rank = 2)]
fn check_in(check_in: Json<CheckIn<'_>>) -> status::Accepted<String> {
    // Insert into database
    //DATABASE.insert(entry.into_inner());
    //print!(entry);
    status::Accepted(Some(format!("id: '{}'", check_in.uuid)))
}

#[post("/sql_req", format = "json", data = "<sql_object>")]
pub async fn sql_req(sql_object: Json<SqlRequest>) -> Result<status::Accepted<String>, Status> {
    let db = Database::new().await;
    match db.run(&sql_object.query).await {
        Ok(result) => Ok(status::Accepted(Some(format!("Result: {:?}", result)))),
        Err(_) => Err(Status::InternalServerError),
    }
}

// #[post("/login", format = "application/json", data = "<login>", rank = 3)]
// fn login(login: Json<Login<'_>>) -> status::Accepted<String> {
//     // Insert into database
//     //DATABASE.insert(entry.into_inner());
//     //print!(entry);
//     status::Accepted(Some(format!("Welcome {}!", login.name)))
// }

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", rocket::routes![check, check_in, sql_req])

}