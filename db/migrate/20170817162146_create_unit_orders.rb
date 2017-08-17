class CreateUnitOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :unit_orders do |t|
      t.integer :quantity
      t.references :product, foreign_key: true
      t.references :order, foreign_key: true

      t.timestamps
    end
  end
end
