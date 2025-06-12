package models

import (
	"time"

	"gorm.io/gorm"
)

// BaseModel définit les champs communs (remplace gorm.Model)
// @name BaseModel
type BaseModel struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"created_at" example:"2023-06-01T15:04:05Z"`
	UpdatedAt time.Time      `json:"updated_at" example:"2023-06-01T15:04:05Z"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty" swaggerignore:"true"` // Swagger l'ignore
}

// Shoe représente un produit chaussure
// @name Shoe
// @description Shoe product information
type Shoe struct {
	BaseModel

	// Marque de la chaussure
	// Exemple: Nike
	Marque string `json:"marque" example:"Nike"`

	// Nom du modèle
	// Exemple: Air Max 90
	Name string `json:"name" example:"Air Max 90"`

	// Prix
	// Exemple: 120.99
	Price float64 `json:"price" example:"120.99"`

	// Description du produit
	// Exemple: Classic sneaker with air cushioning
	Description string `json:"description" example:"Classic sneaker with air cushioning"`

	// Images associées à la chaussure
	Images []ShoeImage `json:"images" gorm:"foreignKey:ShoeID"`
}

// ShoeImage représente une image de chaussure
// @name ShoeImage
// @description Image associée à un produit chaussure
type ShoeImage struct {
	BaseModel

	// ID de la chaussure associée
	ShoeID uint `json:"shoe_id" example:"1"`

	// URL de l'image
	URL string `json:"url" example:"https://example.com/shoe.jpg"`
}
