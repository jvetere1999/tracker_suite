

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
