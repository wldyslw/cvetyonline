class AddImageToProducts < ActiveRecord::Migration[5.1]
  def change
    remove_column :products, :image_path, :string
    add_attachment :products, :image
  end
end
