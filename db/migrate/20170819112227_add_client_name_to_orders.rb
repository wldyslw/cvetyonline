class AddClientNameToOrders < ActiveRecord::Migration[5.1]
  def change
    add_column :orders, :client_name, :string, null: true
  end
end
