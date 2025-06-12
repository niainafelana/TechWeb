<<<<<<< HEAD
// models/shoe.go
package models

import ("gorm.io/gorm"
"time")

// gorm.Model definition for Swagger
// @name gorm.Model
type Model struct {
    ID        uint           `gorm:"primaryKey" json:"id"`
    CreatedAt time.Time      `json:"created_at"`
    UpdatedAt time.Time      `json:"updated_at"`
    DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`
}

// Shoe represents a shoe product
// @Description Shoe product information
type Shoe struct {
    Model // Embed our custom Model instead of gorm.Model
    
    // Marque of the shoe
    // @Example: Nike
    Marque      string      `json:"marque"`
    
    // Name of the shoe model
    // @Example: Air Max 90
    Name        string      `json:"name"`
    
    // Price of the shoe
    // @Example: 120.99
    Price       float64     `json:"price"`
    
    // Description of the shoe
    // @Example: Classic sneaker with air cushioning
    Description string      `json:"description"`
    
    // Images associated with the shoe
    Images      []ShoeImage `json:"images" gorm:"foreignKey:ShoeID"`
}

// ShoeImage represents an image of a shoe
// @Description Image associated with a shoe product
type ShoeImage struct {
    Model // Embed our custom Model
    
    // ID of the associated shoe
    // @Example: 1
    ShoeID uint   `json:"shoe_id"`
    
    // URL of the image
    // @Example: https://example.com/shoe.jpg
    URL    string `json:"url"`
}
