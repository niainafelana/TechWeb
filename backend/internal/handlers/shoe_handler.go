package handlers

import (
	"backend/internal/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// @Summary Récupère toutes les chaussures
// @Description Obtenir la liste de toutes les chaussures
// @Tags shoes
// @Accept json
// @Produce json
// @Success 200 {array} models.Shoe
// @Failure 500 {object} map[string]string
// @Router /api/shoes [get]

func GetAllShoes(c *fiber.Ctx, db *gorm.DB) error {
	var shoes []models.Shoe
	if err := db.Preload("Images").Find(&shoes).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Impossible de récupérer les données",
		})
	}
	return c.JSON(shoes)
}

