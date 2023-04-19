mod database_comms;

#[macro_use] extern crate rocket;

use rocket::serde::{Deserialize, json::Json};
use rocket::response::status;

#[derive(Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
struct SqlRequest {
    query: String
}


// #[derive(Deserialize)]
// #[serde(crate = "rocket::serde")]
// struct Login<'r> {
//     uuid: &'r str,
//     password: &'r str,
// }

#[get("/check")]
fn check() -> status::Accepted<String> { status::Accepted(Some("Here".parse().unwrap())) }

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Event {
    event_id: u32,
    event_name: String,
    event_date: String,
    event_start_time: String,
    event_end_time: String,
    event_location: Option<String>,
    event_repeat: Option<String>,
    event_description: Option<String>,
}

static EVENT_ID_COUNTER: AtomicU32 = AtomicU32::new(1);

// Create the check_in function
pub fn check_in(event: Event) -> Event {
    let unique_event_id = EVENT_ID_COUNTER.fetch_add(1, Ordering::SeqCst);
    Event {
        event_id: unique_event_id,
        ..event
    }
}

// Implement the Rocket route handler
#[post("/event", format = "json", data = "<event>")]
fn create_event(event: Json<Event>) -> Result<Json<Event>, Status> {
    let event = event.into_inner();
    let checked_in_event = check_in(event);
    Ok(Json(checked_in_event))
}

#[post("/sql_req", format = "application/json", data = "<sql_object>", rank = 2)]
fn sql_req(sql_object: Json<SqlObject<'_>>) -> status::Accepted<String> {
    // Insert into database
    //DATABASE.insert(entry.into_inner());
    //print!(entry);
    status::Accepted(Some(format!("SELECT {} FROM {}", sql_object.select, sql_object.from)))
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