package main

import (
    "backend/internal/database"
    "backend/internal/routes"
    "log"

    "github.com/gofiber/fiber/v2"
)

func main() {
    app := fiber.New()

    // Serveur de fichiers statiques pour les images
    app.Static("/images", "./public/images")

    // Connexion à la base de données
    db, err := database.ConnectDB()
    if err != nil {
        log.Fatal(err)
    }
    defer database.CloseDB(db)

    // Setup des routes API
    routes.Setup(app, db)

    log.Fatal(app.Listen(":8080"))
}
