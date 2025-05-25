package repository

import (
    "backend/internal/models"

    "gorm.io/gorm"
)

type ShoeRepository struct {
    DB *gorm.DB
}

func NewShoeRepository(db *gorm.DB) *ShoeRepository {
    return &ShoeRepository{DB: db}
}

func (r *ShoeRepository) GetShoeByID(id uint) (*models.Shoe, error) {
    var shoe models.Shoe
    err := r.DB.Preload("Images").First(&shoe, id).Error
    if err != nil {
        return nil, err
    }
    return &shoe, nil
}
