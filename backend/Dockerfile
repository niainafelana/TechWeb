FROM golang:1.24-alpine AS builder
RUN apk add --no-cache git=2.42.0-r0
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o ./bin/backend ./cmd/main.go
FROM alpine:3.18
COPY --from=builder /app/bin/backend /usr/local/bin/backend
COPY .env /app/.env
WORKDIR /app
EXPOSE 8080
CMD ["backend"]
