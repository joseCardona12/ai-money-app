USE ai_money_db;

SELECT  * FROM account_types;
SELECT * FROM accounts;
SELECT * FROM users;
SELECT * FROM providers;
SELECT * FROM roles;
SELECT * FROM transactions;	
SELECT * FROM transaction_types;
SELECT * FROM states;
SELECT * FROM currencies;
SELECT * FROM plans;
SELECT * FROM settings;
SELECT * FROM goal_types;
SELECT * FROM onboardings;
SELECT * FROM budget_preferences;
SELECT * FROM goals;	
SELECT * FROM analytics;
SELECT * FROM languages;
SELECT * FROM security_levels;
SELECT * FROM categories;
SELECT * FROM budgets;
SELECT * FROM roles;
DROP TABLE goals;

UPDATE users
SET role_id = 2
WHERE id = 11;


INSERT INTO transactions (
  description, amount, date, created_at,
  transaction_type_id, state_id, user_id, account_id, category_id
) VALUES
('Monthly Salary', 3500.00, '2025-10-01', CURRENT_DATE, 1, 1, 11, 8, 2),
('Dinner with friends', 45.90, '2025-10-10', CURRENT_DATE, 2, 1, 11, 9, 1),
('Transfer to Savings Account', 500.00, '2025-10-15', CURRENT_DATE, 2, 1, 11, 8, 3);

INSERT INTO users (fullName, email, password, phone_number, address, bio, profile_picture, join_date, role_id, provider_id, plan_id) VALUES
('Jose Cardona', 'jose.cardona@gmail.com', 'joseCardona12', '+57 301 456 9872', 'Bogotá, Colombia', 'Desarrollador backend con pasión por Node.js y bases de datos.', 'https://res.cloudinary.com/demo/image/upload/v1/carlos.jpg', '2025-10-25 10:32:14', 2, 3, 1);


INSERT INTO users (fullName, email, password, phone_number, address, bio, profile_picture, join_date, role_id, provider_id, plan_id) VALUES
('Carlos Pérez', 'carlos.perez@gmail.com', 'fjd73JdkW!92kLm', '+57 301 456 9872', 'Bogotá, Colombia', 'Desarrollador backend con pasión por Node.js y bases de datos.', 'https://res.cloudinary.com/demo/image/upload/v1/carlos.jpg', '2025-10-25 10:32:14', 1, 3, 1),
('Ana Rodríguez', 'ana.rodriguez@gmail.com', 'klm!38JshD@d91', '+57 315 788 2244', 'Medellín, Colombia', 'Diseñadora UX/UI enfocada en accesibilidad y usabilidad.', 'https://res.cloudinary.com/demo/image/upload/v1/ana.jpg', '2025-10-24 18:11:45', 1, 2, 2),
('Luis Martínez', 'luis.martinez@outlook.com', 'pwe83Kd#90LsnA', '+57 310 555 8899', 'Cali, Colombia', 'Administrador de sistemas con experiencia en AWS y Docker.', 'https://res.cloudinary.com/demo/image/upload/v1/luis.jpg', '2025-10-20 09:01:22', 2, 1, 3),
('María Gómez', 'maria.gomez@gmail.com', 'aLw90@pd93DkwM', '+57 302 667 4411', 'Cartagena, Colombia', 'Frontend developer con interés en React y diseño responsive.', 'https://res.cloudinary.com/demo/image/upload/v1/maria.jpg', '2025-09-30 20:15:55', 1, 2, 2),
('David Herrera', 'david.herrera@gmail.com', 'pwq91@Ked72LmP', '+57 300 889 0012', 'Barranquilla, Colombia', 'QA tester con experiencia en Cypress y Postman.', 'https://res.cloudinary.com/demo/image/upload/v1/david.jpg', '2025-09-15 14:42:38', 1, 1, 1),
('Lucía Ramírez', 'lucia.ramirez@yahoo.com', 'djh27!Pqs88KmL', '+57 320 442 7755', 'Pereira, Colombia', 'Project manager con enfoque en metodologías ágiles.', 'https://res.cloudinary.com/demo/image/upload/v1/lucia.jpg', '2025-08-10 08:27:19', 2, 3, 3),
('Andrés Torres', 'andres.torres@gmail.com', 'kd92@Dls92Lqp!', '+57 312 990 4455', 'Manizales, Colombia', 'Full Stack developer con experiencia en Next.js y Nest.js.', 'https://res.cloudinary.com/demo/image/upload/v1/andres.jpg', '2025-10-02 12:10:07', 1, 1, 2),
('Paula Díaz', 'paula.diaz@gmail.com', 'kdp91@Djd91Lm$', '+57 301 445 9922', 'Bucaramanga, Colombia', 'Especialista en marketing digital y branding.', 'https://res.cloudinary.com/demo/image/upload/v1/paula.jpg', '2025-07-21 11:58:49', 1, 2, 1),
('Ricardo Salazar', 'ricardo.salazar@empresa.com', 'pwLk21@Kd92Klm', '+57 315 887 6677', 'Medellín, Colombia', 'DevOps engineer con experiencia en CI/CD y Kubernetes.', 'https://res.cloudinary.com/demo/image/upload/v1/ricardo.jpg', '2025-10-10 19:25:17', 2, 1, 3),
('Valentina López', 'valentina.lopez@gmail.com', 'ald92#Pkd73Kdl', '+57 310 228 5533', 'Bogotá, Colombia', 'Diseñadora gráfica y fotógrafa freelance.', 'https://res.cloudinary.com/demo/image/upload/v1/valentina.jpg', '2025-09-11 17:14:59', 1, 3, 2);


INSERT INTO accounts (name, account_type_id, balance, created_at, currency_id, user_id) VALUES
('Main Checking', 9, 2500.00, CURRENT_DATE, 1, 11),
('Emergency Savings', 10, 5200.50, CURRENT_DATE, 1, 11),
('Crypto Investments', 11, 18000.75, CURRENT_DATE, 1, 11),
('Credit Card', 12, -1200.00, CURRENT_DATE, 1, 11),
('Car Loan', 13, -8000.00, CURRENT_DATE, 1, 11),
('Travel Savings', 10, 3000.00, CURRENT_DATE, 1, 11),
('Retirement Fund', 11, 25000.00, CURRENT_DATE, 1, 11);


INSERT INTO account_types (name) VALUES
('Checking Account'),
('Savings Account'),
('Investment Account'),
('Credit Account'),
('Loan Account');

INSERT INTO categories(name)
VALUES ('income'),('food & dining'),('transportation'),('entertaiment'),('health'),('bills & utilities'),('shopping');

DELETE FROM account_types WHERE id = 12;
INSERT INTO languages (name)
VALUES ('english'),('spanish');
DROP TABLE settings;
DROP TABLE transactions;
DROP TABLE accounts;
DROP TABLE goals;
DROP TABLE goal_types;
DROP TABLE currencies;
DROP TABLE users;
DROP TABLE accounts;
DROP TABLE onboardings;
DROP TABLE ai_assistants;
DROP TABLE budgets;
DROP TABLE reports;
DROP TABLE debts;
DROP TABLE analytics;
DROP TABLE goals;

INSERT INTO account_types (name)
VALUES ('income'),('expenses');

INSERT INTO currencies(name,symbol)
VALUES
('COP', 'C'),('USD', 'USD');

INSERT INTO budget_preferences (name,description) 
VALUES 
('detailed tracking', 'track every expense and categorize all transactions'),
('simple overview', 'focus on big picture with minimal tracking'),
('AI-Powered automation', 'let AI categorize and provide insights automatically');

INSERT INTO goal_types (name,description) 
VALUES 
('build savings', 'create an emergency found or save for the future'),
('pay off debt', 'reduce or eliminate credit card or loan debts'),
('start investing', 'grow wealth throught investments');

DROP TABLE settings;

INSERT INTO settings (
  id, region, timezone, notification_enabled, created_at, user_id, plan_id, security_level_id, currency_id, language_id
) VALUES
(1, 'south America', 'GMT-5', TRUE, NOW(), 1, 2, 3, 1, 2),
(2, 'south America', 'GMT-5', TRUE, NOW(), 2, 1, 2, 1, 2),
(3, 'europe', 'GMT+1', FALSE, NOW(), 13, 3, 3, 3, 1);

INSERT INTO security_levels (id, name) VALUES
(1, 'low'),
(2, 'medium'),
(3, 'high');

INSERT INTO plans (id, name) VALUES
(1, 'Free'),
(2, 'Premium'),
(3, 'Enterprise');

INSERT INTO languages (name) VALUES
('English'),
('Spanish'),
('French');

DROP TABLE accounts;

INSERT INTO accounts (name, account_type_id, balance, created_at, currency_id, user_id
) VALUES
('Main Savings Account', 3, 2500000.00, NOW(), 1, 1),
('Daily Checking Account', 4, 850000.00, NOW(), 1, 2),
('Credit Card Account', 5, -450000.00, NOW(), 1, 1);

INSERT INTO currencies (name)
VALUES ('COP'),('USD'), ('EURO');
INSERT INTO transaction_types (name) 
VALUES ('income'),('expense');

INSERT INTO states(name)
VALUES ('pending'), ('completed'),('cancelled');

INSERT INTO account_types (name)
VALUES ('savings'),('checking'),('credit'),('investment');


INSERT INTO users (fullName,email,password,phone_number,address, bio, profile_picture,join_date,role_id,provider_id)
VALUES ('jose cardona','josesimonbarreto.design@gmail.com','testCardona','+573006233410','cr241','Graphic designer', 'http://', '2', 1,1);
DELETE FROM users WHERE id =3;
DELETE FROM account_types WHERE id =1;

-- ============================================================================
-- Script para corregir amounts negativos en la tabla transactions
-- Ejecutar en MySQL Workbench
-- ============================================================================

-- 1. Ver los datos actuales antes de corregir
SELECT 
    id,
    description,
    amount,
    transaction_type_id,
    CASE 
        WHEN transaction_type_id = 1 THEN 'Income'
        WHEN transaction_type_id = 2 THEN 'Expense'
        ELSE 'Unknown'
    END as type,
    date
FROM transactions
WHERE amount < 0
ORDER BY date DESC;

-- 2. Corregir todos los amounts negativos (convertirlos a positivos)
UPDATE transactions 
SET amount = ABS(amount) 
WHERE amount < 0;

-- 3. Verificar que se corrigieron correctamente
SELECT 
    id,
    description,
    amount,
    transaction_type_id,
    CASE 
        WHEN transaction_type_id = 1 THEN 'Income'
        WHEN transaction_type_id = 2 THEN 'Expense'
        ELSE 'Unknown'
    END as type,
    date
FROM transactions
ORDER BY date DESC
LIMIT 20;

-- 4. Verificar que no queden amounts negativos
SELECT COUNT(*) as negative_amounts_count
FROM transactions
WHERE amount < 0;