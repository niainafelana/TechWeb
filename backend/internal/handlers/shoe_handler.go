package handlers

import (
	"backend/internal/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
	
)
// GetAllShoes godoc
// @Summary Récupère toutes les chaussures
// @Description Obtenir la liste complète des chaussures disponibles
// @Tags Shoes
// @Accept  json
// @Produce  json
// @Success 200 {array} models.Shoe "Liste des chaussures"
// @Failure 500 {object} object "Erreur serveur"
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

