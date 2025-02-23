DROP TABLE IF EXISTS line_items CASCADE;
CREATE TABLE line_items (
    id SERIAL PRIMARY KEY,
    quantity INT NOT NULL,
    product_id INT NOT NULL,
    order_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);