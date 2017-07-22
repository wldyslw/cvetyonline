class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string :name
      t.text :description
      t.string :category
      t.string :image_path
      t.decimal :price, precision: 10, scale: 2
      t.boolean :in_stock

      t.timestamps
    end
  end
end
