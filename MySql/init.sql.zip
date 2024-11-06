CREATE DATABASE IF NOT EXISTS Arduino_eps32;
USE Arduino_eps32;

CREATE TABLE IF NOT EXISTS temperatura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    valor VARCHAR(255) NOT NULL,
    fecha DATE
);

CREATE TABLE IF NOT EXISTS humedad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    valor VARCHAR(255) NOT NULL,
    fecha DATE
);

CREATE TABLE IF NOT EXISTS viento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    valor VARCHAR(255) NOT NULL,
    fecha DATE
);

-- Insertar valores por defecto en la tabla 'temperatura'
INSERT INTO temperatura (valor, fecha) VALUES 
('25.5', '2023-07-01'),
('26.0', '2023-07-02'),
('27.3', '2023-07-03');

-- Insertar valores por defecto en la tabla 'humedad'
INSERT INTO humedad (valor, fecha) VALUES 
('60', '2023-07-01'),
('65', '2023-07-02'),
('63', '2023-07-03');

-- Insertar valores por defecto en la tabla 'viento'
INSERT INTO viento (valor, fecha) VALUES 
('5.4', '2023-07-01'),
('6.2', '2023-07-02'),
('5.8', '2023-07-03');