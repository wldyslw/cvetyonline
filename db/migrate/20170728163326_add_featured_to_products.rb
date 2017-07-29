class AddFeaturedToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :featured, :boolean, default: false
  end
end
