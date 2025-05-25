package database

import (
    "backend/config"
    "backend/internal/models"
    "fmt"
    "log"

    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() (*gorm.DB, error) {
    // Charger la configuration
    cfg, err := config.LoadConfig()
    if err != nil {
        return nil, err
    }

    // Construire dynamiquement le DSN
    dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
        cfg.DBUser,
        cfg.DBPassword,
        cfg.DBHost,
        cfg.DBPort,
        cfg.DBName,
    )

    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        return nil, err
    }

    DB = db

    // Auto migration
    err = DB.AutoMigrate(&models.Shoe{}, &models.ShoeImage{})
    if err != nil {
        log.Fatal("Migration échouée:", err)
    }

    return DB, nil
}

func CloseDB(db *gorm.DB) {
    sqlDB, err := db.DB()
    if err == nil {
        sqlDB.Close()
    }
}

