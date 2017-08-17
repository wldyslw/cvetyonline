class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.string :telephone
      t.boolean :pickup
      t.string :address, null: true
      t.text :comment, default: ''

      t.timestamps
    end
  end
end
