package config

import (
    "fmt"
    "os"

    "github.com/joho/godotenv"
)

type Config struct {
    DBUser     string
    DBPassword string
    DBHost     string
    DBPort     string
    DBName     string
}

func LoadConfig() (*Config, error) {
    // Charger le fichier .env
    if err := godotenv.Load(); err != nil {
        return nil, fmt.Errorf("Erreur chargement .env: %v", err)
    }

    config := &Config{
        DBUser:     os.Getenv("DB_USER"),
        DBPassword: os.Getenv("DB_PASSWORD"),
        DBHost:     os.Getenv("DB_HOST"),
        DBPort:     os.Getenv("DB_PORT"),
        DBName:     os.Getenv("DB_NAME"),
    }

    return config, nil
}
