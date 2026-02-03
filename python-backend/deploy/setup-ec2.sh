#!/bin/bash
# EC2 Setup Script for Guitar Scale App Backend
# Run this script on a fresh Amazon Linux 2023 instance

set -e

echo "=== Installing Docker ==="
sudo dnf update -y
sudo dnf install -y docker git
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER

echo "=== Installing Docker Compose ==="
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "=== Cloning Repository ==="
cd ~
git clone https://github.com/your-username/guitar-scale-app.git || true
cd guitar-scale-app/python-backend

echo "=== Creating uploads directory ==="
mkdir -p uploads

echo "=== Setup Complete ==="
echo "Please logout and login again to use docker without sudo"
echo "Then run: cd ~/guitar-scale-app/python-backend && docker-compose up -d --build"
