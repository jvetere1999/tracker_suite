mod database_comms;

use rocket::request::Form;
use rocket::routes;
use crate::database_comms::Database;

static DATABASE: Database = Database::new("");

fn main() {
    rocket::ignite()
        .mount("/", routes![uthere])
        .mount("/", routes![check_in])
        .launch();

}

#[get("/uthere")]
fn uthere() -> bool { true }

#[post("/checkIn")]
fn check_in(entry: Form<String>) -> String {
    // Insert into database
    //DATABASE.insert(entry.into_inner());
    print!(entry);
    return "Check in successful".to_string()
}