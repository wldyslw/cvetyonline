class CreateUnitProducts < ActiveRecord::Migration[5.1]
  def change
    remove_column :products, :price

    create_table :unit_products do |t|
      t.string :property, null: false, default: ''
      t.decimal :price, precision: 10, scale: 2, null: false
      t.references :product, foreign_key: true, null: false

      t.timestamps
    end

    remove_reference :unit_orders, :product
    add_reference :unit_orders, :unit_product, foreign_key: true
  end
end
