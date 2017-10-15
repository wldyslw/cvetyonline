class Origin < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.string :client_name, null: false
      t.string :telephone, null: false
      t.boolean :pickup, null: false
      t.string :address, null: true
      t.text :comment, null: true

      t.timestamps
    end

    create_table :products do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.string :category, null: false
      t.boolean :in_stock, null: false
      t.boolean :featured, default: false, null: false

      t.timestamps
    end

    create_table :unit_orders do |t|
      t.integer :quantity, null: false
      t.references :product, foreign_key: true, null: false
      t.references :order, foreign_key: true, null: false
    end

    create_table :unit_products do |t|
      t.string :property, null: true
      t.decimal :price, precision: 10, scale: 2, null: false
      t.references :product, foreign_key: true, null: false

      t.timestamps
    end

    create_table :product_images do |t|
      t.attachment :image, null: false
      t.references :product, foreign_key: true, null: false
    end
  end
end
