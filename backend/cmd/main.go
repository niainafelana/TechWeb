package main

import (
	"backend/internal/database"
	"backend/internal/routes"
	_ "backend/docs" // <-- IMPORT INDISPENSABLE POUR SWAGGER

	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/swagger"
)

// @title SUN CO. API
// @version 1.0
// @description API pour l'application SUN CO.
// @termsOfService http://swagger.io/terms/
// @contact.name API Support
// @contact.email noums@hacker.com
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @host localhost:8080
// @BasePath /api
// @schemes http
func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173",
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
		AllowHeaders:     "Origin,Content-Type,Accept,Authorization",
		AllowCredentials: true,
	}))

	// Swagger UI
	app.Get("/swagger/*", swagger.HandlerDefault)

	// Serve swagger.json
	app.Get("/swagger/doc.json", func(c *fiber.Ctx) error {
		return c.SendFile("./docs/swagger.json")
	})

	// Static images
	app.Static("/images", "./public/images")

	db, err := database.ConnectDB()
	if err != nil {
		log.Fatal(err)
	}
	defer database.CloseDB(db)

	routes.Setup(app, db)

	log.Fatal(app.Listen(":8080"))
}
