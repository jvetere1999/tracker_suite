#[macro_use] extern crate rocket;

use rocket::serde::{json::Json, Deserialize, Serialize};
use rocket::response::status;
use rocket::State;
use rocket::config::{Config, TlsConfig};

use mysql_async::{Pool, Conn, Row, Opts, OptsBuilder};
use mysql_async::prelude::Queryable;

use uuid::Uuid;
use std::time::{SystemTime, UNIX_EPOCH};



pub struct Database {
    pool: Pool,
}

impl Database {
    pub fn new() -> Self {
        let url = OptsBuilder::default()
            .user(Some("user1"))
            .pass(Some("P!cknewPWD"))
            .db_name(Some("tracker_edge"))
            .ip_or_hostname("50.122.223.254")
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




#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Event {
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
        Event {
            event_name,
            event_date,
            event_start_time,
            event_end_time,
            event_location,
            event_repeat,
            event_description,
        }
    }
    
    pub fn into_insert_query(&self) -> String {
        let location = self.event_location.as_ref().map(|s| s.as_str()).unwrap_or_default();
        let repeat = self.event_repeat.as_ref().map(|s| s.as_str()).unwrap_or_default();
        let description = self.event_description.as_ref().map(|s| s.as_str()).unwrap_or_default();

        format!(
            "INSERT INTO event (eventID, eventName, eventDate, eventStartTime, eventEndTime, eventLocation, eventRepeat, eventDescription) VALUES ('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}')",
            Uuid::new_v4().to_string(),
            self.event_name,
            self.event_date,
            self.event_start_time,
            self.event_end_time,
            location,
            repeat,
            description,
        )
    }
}



#[post("/create_event_test", format = "json", data = "<event>")]
pub async fn create_event_test(db: &State<Database>, event: Json<Event>) -> Result<status::Accepted<String>, rocket::http::Status> {
    let inner_event = event.into_inner(); // dereference Json<Event> to get Event
    // Print the SQL query instead of executing it
    println!("SQL query: {}", inner_event.into_insert_query());

    // You can return a response indicating that the query was printed
    Ok(status::Accepted(Some(format!("Printed SQL query: {}", inner_event.into_insert_query()))))
}


#[post("/create_event", format = "json", data = "<event>")]
pub async fn create_event(db: &State<Database>, event: Json<Event>) -> Result<status::Accepted<String>, rocket::http::Status> {
    let event = event.into_inner();
    let event_id = Uuid::new_v4().to_string();
    let query = format!(
        "INSERT INTO event (eventID, eventName, eventDate, eventStartTime, eventEndTime, eventLocation, eventRepeat, eventDescription) VALUES ('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}')",
        event_id,
        event.event_name,
        event.event_date,
        event.event_start_time,
        event.event_end_time,
        event.event_location.unwrap_or_default(),
        event.event_repeat.unwrap_or_default(),
        event.event_description.unwrap_or_default(),
    );
    match db.run(&query).await {
        Ok(_) => Ok(status::Accepted(Some(event_id))),
        Err(_) => Err(rocket::http::Status::InternalServerError),
    }
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct CheckIn {
    pub profile_id: String,
    pub event_id: String,
}

impl CheckIn {
    pub fn new(profile_id: String, event_id: String) -> Self {
        CheckIn {
            profile_id,
            event_id,
        }
    }

    pub fn into_insert_query(&self) -> String {
        let system_time = SystemTime::now();
        let duration = system_time.duration_since(UNIX_EPOCH).unwrap();
        let timestamp = duration.as_secs().to_string();
        format!(
            "INSERT INTO checkin (checkintime, profileid, eventid) VALUES ('{}', '{}', '{}')",
            timestamp, self.profile_id, self.event_id
        )
    }
}

#[post("/check_in_test", format = "json", data = "<check_in>")]
pub async fn check_in_test(db: &State<Database>, check_in: Json<CheckIn>) -> Result<status::Accepted<String>, rocket::http::Status> {
    let inner_check_in = check_in.into_inner(); // dereference Json<CheckIn> to get CheckIn
    // Print the SQL query instead of executing it
    println!("SQL query: {}", inner_check_in.into_insert_query());

    // You can return a response indicating that the query was printed
    Ok(status::Accepted(Some(format!("Printed SQL query: {}", inner_check_in.into_insert_query()))))
}

#[post("/check_in", format = "json", data = "<check_in>")]
pub async fn check_in(db: &State<Database>, check_in: Json<CheckIn>) -> Result<status::Accepted<String>, rocket::http::Status> {
    let check_in = check_in.into_inner();
    match db.run(&check_in.into_insert_query()).await {
        Ok(result) => Ok(status::Accepted(Some(format!("Result: {:?}", result)))),
        Err(_) => Err(rocket::http::Status::InternalServerError),
    }
}

// #[derive(Serialize, Deserialize)]
// #[serde(crate = "rocket::serde")]
// pub struct EventHistory {
//     pub profile_id: String
// }

// #[post("/event_history", format = "json", data = "<history>")]
// pub async fn get_event_history(db: &State<Database>, history: Json<EventHistory>) -> Result<Json<Vec<Event>>, rocket::http::Status> {
//     let profile_id = &history.profile_id;

//     match db.run(&format!("SELECT * FROM event JOIN checkin ON event.eventID = checkin.eventid WHERE checkin.profileid = '{}'", profile_id)).await {
//         Ok(result) => {
//             let events: Vec<Event> = result.iter()
//                 .map(|row| {
//                     Event {
//                         event_id: row.get(0).unwrap(),
//                         event_name: row.get(1).unwrap(),
//                         event_date: row.get(2).unwrap(),
//                         event_start_time: row.get(3).unwrap(),
//                         event_end_time: row.get(4).unwrap(),
//                         event_location: row.get(5).unwrap_or_default(),
//                         event_repeat: row.get(6).unwrap_or_default(),
//                         event_description: row.get(7).unwrap_or_default(),
//                     }
//                 })
//                 .collect();
//             Ok(Json(events))
//         },
//         Err(_) => Err(rocket::http::Status::InternalServerError),
//     }
// }



// #[post("/event_history_test", format = "json", data = "<history>")]
// pub fn event_history_test(history: Json<EventHistory>) -> String {
//     let profile_id = history.profile_id;
//     let select_statement = format!("SELECT eid, ename, date, loc, starttime, endtime FROM event JOIN checkin ON event.eventID = checkin.eventid WHERE profileid = '{}';", profile_id);

//     println!("SELECT statement: {}", select_statement);

//     select_statement
// }
#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Profile {
    pub username: String,
    pub password: String,
}

impl Profile {
    pub fn new(username: String, password: String) -> Self {
        Profile { username, password }
    }

    pub fn into_insert_query(&self) -> String {
        format!(
            "INSERT INTO profile (username, password) VALUES ('{}', '{}')",
            self.username, self.password
        )
    }
}

#[post("/create_profile", format = "json", data = "<profile>")]
pub async fn create_profile(
    db: &State<Database>,
    profile: Json<Profile>,
) -> Result<status::Accepted<String>, rocket::http::Status> {
    let profile = profile.into_inner();
    match db.run(&profile.into_insert_query()).await {
        Ok(result) => Ok(status::Accepted(Some(format!("Result: {:?}", result)))),
        Err(_) => Err(rocket::http::Status::InternalServerError),
    }
}

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct SignIn {
    pub username: String,
    pub password: String,
}

impl SignIn {
    pub fn into_select_query(&self) -> String {
        format!(
            "SELECT * FROM profile WHERE username = '{}' AND password = '{}'",
            self.username, self.password
        )
    }
}

#[post("/sign_in", format = "json", data = "<sign_in>")]
pub async fn sign_in(
    db: &State<Database>,
    sign_in: Json<SignIn>,
) -> Result<status::Accepted<String>, rocket::http::Status> {
    let sign_in = sign_in.into_inner();
    match db.run(&sign_in.into_select_query()).await {
        Ok(result) => {
            if result.is_empty() {
                Err(rocket::http::Status::Unauthorized)
            } else {
                Ok(status::Accepted(Some(format!("Result: {:?}", result))))
            }
        }
        Err(_) => Err(rocket::http::Status::InternalServerError),
    }
}



#[launch]
fn rocket() -> _ {
    let db = Database::new();

    // let tls_config = TlsConfig::from_paths("cert.pem", "key.pem");

    let config = Config {
        address: "0.0.0.0".parse().unwrap(),
        port: 8000,
        ..Config::default()
    };
    rocket::custom(config)
    .mount("/", routes![
        sql,
        sql_test, 
        create_event_test,
        check_in,
        check_in_test,
        create_profile,
        create_profile_test,
        sign_in,
        sign_in_test,
    ])
    .manage(db)
}

#[post("/create_profile_test", format = "json", data = "<profile>")]
pub async fn create_profile_test(
    db: &State<Database>,
    profile: Json<Profile>,
    ) -> Result<status::Accepted<String>, rocket::http::Status> {
    let profile = profile.into_inner();
    println!("SQL query: {}", profile.into_insert_query());
    Ok(status::Accepted(Some(format!(
        "Printed SQL query: {}",
        profile.into_insert_query()
    ))))
}

#[post("/sign_in_test", format = "json", data = "<sign_in>")]
pub async fn sign_in_test(
    db: &State<Database>,
    sign_in: Json<SignIn>,
    ) -> Result<status::Accepted<String>, rocket::http::Status> {
    let sign_in = sign_in.into_inner();
    println!("SQL query: {}", sign_in.into_select_query());
    Ok(status::Accepted(Some(format!(
        "Printed SQL query: {}",
        sign_in.into_select_query()
    ))))
}
