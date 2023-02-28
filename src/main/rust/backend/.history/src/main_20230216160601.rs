mod database_comms;

#[macro_use] extern crate rocket;

use rocket::serde::{Deserialize, json::Json};
use rocket::response::status;


#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct CheckIn<'r> {
    uuid: &'r str,
    complete: bool
}

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct SqlString<'r> {
    sql: &'r str
}
#[get("/check")]
fn check() -> status::Accepted<String> { status::Accepted(Some("Here".parse().unwrap())) }

#[post("/check_in", format = "application/json", data = "<check_in>", rank = 2)]
fn check_in(checkin: Json<CheckIn<'_>>) -> status::Accepted<String> {
    // Insert into database
    //DATABASE.insert(entry.into_inner());
    //print!(entry);
    status::Accepted(Some(format!("id: '{}'", checkin.uuid)))
}

#[post("/sql_req", format = "application/json", data = "<sql_string>", rank = 2)]
fn sql_req(sql_string: Json<SqlString<'_>>) -> status::Accepted<String> {
    // Insert into database
    //DATABASE.insert(entry.into_inner());
    //print!(entry);
    status::Accepted(Some(format!("id: '{}'", sql_string.sql)))
}


fn main() {
    rocket::ignite()
       .mount("/", routes![check, sql_req])
       .mount("/", rocket::routes![check_in])
       .mount("/", rocket::routes![sql_req])


#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", rocket::routes![check, check_in])

}