package models

import "gorm.io/gorm"

type Shoe struct {
    gorm.Model
    Marque      string      `json:"marque"`
    Name        string      `json:"name"`
    Price       float64     `json:"price"`
    Description string      `json:"description"`
    Images      []ShoeImage `json:"images" gorm:"foreignKey:ShoeID"`
}

type ShoeImage struct {
    gorm.Model
    ShoeID uint   `json:"shoe_id"`
    URL    string `json:"url"`
}
