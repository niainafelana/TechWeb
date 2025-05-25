package routes

import (
	"backend/internal/handlers"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func Setup(app *fiber.App, db *gorm.DB) {
	api := app.Group("/api")

	// Routes des chaussures
	api.Get("/shoes", func(c *fiber.Ctx) error {
		return handlers.GetAllShoes(c, db)
	})
}
