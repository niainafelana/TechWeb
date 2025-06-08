package main

import (
	"backend/internal/database"
	"backend/internal/routes"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()

	// Configure CORS middleware
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173", // Your frontend URL
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
		AllowHeaders:     "Origin,Content-Type,Accept,Authorization",
		AllowCredentials: true,
	}))

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