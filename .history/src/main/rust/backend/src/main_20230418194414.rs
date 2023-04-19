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

#[post("/check_in", format = "application/json", data = "<check_in>", rank = 2)]
fn check_in(check_in: Json<CheckIn<'_>>) -> status::Accepted<String> {
    // Insert into database
    //DATABASE.insert(entry.into_inner());
    //print!(entry);
    status::Accepted(Some(format!("id: '{}'", check_in.uuid)))
}

#[post("/sql_req", format = "application/json", data = "<sql_object>", rank = 2)]
fn sql_req(sql_object: Json<SqlRequest<'_>>) -> status::Accepted<String> {
    let db = Database::new();
    let query = sql_object.;
    let result = db.run(query).await.unwrap();
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