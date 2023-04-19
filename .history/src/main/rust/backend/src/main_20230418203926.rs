#[macro_use] extern crate rocket;

use rocket::serde::{json::Json, Deserialize, Serialize};
use rocket::response::status;
use rocket::State;
use rocket::Config;

use mysql_async::{Pool, Conn, Row, Opts, OptsBuilder};
use mysql_async::prelude::Queryable;

pub struct Database {
    pool: Pool,
}

impl Database {
    pub fn new() -> Self {
        let url = OptsBuilder::default()
            .user(Some("user1"))
            .pass(Some("P!cknewPWD"))
            .db_name(Some("tracker_edge"))
            .ip_or_hostname("localhost")
            .tcp_port(3306);

        let opts = Opts::from(url);
        let pool = Pool::new(opts);
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
pub struct SqlRequest {
    query: String,
}


#[post("/sql", format = "json", data = "<sql_object>")]
pub async fn sql(db: &State<Database>, sql_object: Json<SqlRequest>) -> Result<status::Accepted<String>, rocket::http::Status> {
    match db.run(&sql_object.query).await {
        Ok(result) => Ok(status::Accepted(Some(format!("Result: {:?}", result)))),
        Err(_) => Err(rocket::http::Status::InternalServerError),
    }
}
#[post("/sql_test", format = "json", data = "<sql_object>")]
pub async fn sql_test(db: &State<Database>, sql_object: Json<SqlRequest>) -> Result<status::Accepted<String>, rocket::http::Status> {
    // Print the SQL query instead of executing it
    println!("SQL query: {}", sql_object.query);

    // You can return a response indicating that the query was printed
    Ok(status::Accepted(Some(format!("Printed SQL query: {}", sql_object.query))))
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Event {
    pub event_id: String,
    pub event_name: String,
    pub event_date: String,
    pub event_start_time: String,
    pub event_end_time: String,
    pub event_location: Option<String>,
    pub event_repeat: Option<String>,
    pub event_description: Option<String>,
}

impl Event {
    pub fn new(
        event_name: String,
        event_date: String,
        event_start_time: String,
        event_end_time: String,
        event_location: Option<String>,
        event_repeat: Option<String>,
        event_description: Option<String>,
    ) -> Self {
        let event_id = Uuid::new_v4().to_string();
        Event {
            event_id,
            event_name,
            event_date,
            event_start_time,
            event_end_time,
            event_location,
            event_repeat,
            event_description,
        }
    }

    pub fn into_insert_query(self) -> String {
        format!(
            "INSERT INTO events (event_id, eventName, eventDate, eventStartTime, eventEndTime, \
            eventLocation, eventRepeat, eventDescription) VALUES ('{}', '{}', '{}', '{}', '{}', \
            '{}', '{}', '{}')",
            self.event_id,
            self.event_name,
            self.event_date,
            self.event_start_time,
            self.event_end_time,
            self.event_location.unwrap_or_default(),
            self.event_repeat.unwrap_or_default(),
            self.event_description.unwrap_or_default(),
        )
    }
}


#[launch]
fn rocket() -> _ {
    let db = Database::new();

    let config = Config {
        address: "0.0.0.0".parse().unwrap(),
        port: 8000,
        ..Config::default()
    };

    rocket::custom(config)
        .mount("/", routes![sql,sql_test])
        .manage(db)
}


// #[get("/check")]
// fn check() -> status::Accepted<String> { status::Accepted(Some("Here".parse().unwrap())) }

// #[post("/check_in", format = "application/json", data = "<check_in>", rank = 2)]
// fn check_in(check_in: Json<CheckIn<'_>>) -> status::Accepted<String> {
//     // Insert into database
//     //DATABASE.insert(entry.into_inner());
//     //print!(entry);
//     status::Accepted(Some(format!("id: '{}'", check_in.uuid)))
// }

// #[post("/login", format = "application/json", data = "<login>", rank = 3)]
// fn login(login: Json<Login<'_>>) -> status::Accepted<String> {
//     // Insert into database
//     //DATABASE.insert(entry.into_inner());
//     //print!(entry);
//     status::Accepted(Some(format!("Welcome {}!", login.name)))
// }
