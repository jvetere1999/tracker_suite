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