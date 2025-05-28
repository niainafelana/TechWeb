package handlers

import (
	"backend/internal/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func GetAllShoes(c *fiber.Ctx, db *gorm.DB) error {
	var shoes []models.Shoe
	if err := db.Preload("Images").Find(&shoes).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Impossible de récupérer les données",
		})
	}
	return c.JSON(shoes)
}

