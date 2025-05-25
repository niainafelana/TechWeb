
package main

import (
    "backend/internal/database"
    "backend/internal/routes"
    "log"

    "github.com/gofiber/fiber/v2"
)

func main() {
    app := fiber.New()

    // Connexion DB
    db, err := database.ConnectDB()
    if err != nil {
        log.Fatal(err)
    }
    defer database.CloseDB(db)

    // Setup routes
    routes.Setup(app, db)

    log.Fatal(app.Listen(":8080"))
}
