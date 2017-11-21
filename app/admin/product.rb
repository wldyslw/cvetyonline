ActiveAdmin.register Product do
  config.sort_order = 'position_asc'
  config.paginate = false

  permit_params :name, :description, :category, :in_stock, :featured, unit_products_attributes: [:id, :property, :price, :_destroy], product_images_attributes: [:id, :image, :_destroy]

  orderable

  index do
    a 'Reset the order', href: 'products'
    orderable_handle_column
    selectable_column
    id_column
    %i[name description category in_stock featured].each { |field| column field }
    column :unit_products do |product|
      ul do
        product.unit_products.each { |up| li link_to "#{up.property.empty? ? 'Default' : up.property}, #{up.price}", admin_unit_product_path(up) }
      end
    end
    column :product_images do |product|
      ul do
        product.product_images.each { |pi| li image_tag pi.image.url(:thumb) }
      end
    end
    actions
  end

  form do |f|
    f.semantic_errors
    f.inputs do
      %i[name description in_stock featured].each { |field| f.input field }
      f.input :category, as: :select, collection: options_for_select({
        'Букеты' => :bouquets,
        'Цветы поштучно' => :flowers,
        'Цветы в горшках' => :pots,
        'Наши работы' => :handmade,
        'Букеты невесты' => :wedding,
        'Подарки' => :gifts
      }, :bouquets)
    end
    f.inputs do
      f.has_many :unit_products, allow_destroy: true do |ff|
        %i[property price].each { |field| ff.input field }
      end
    end
    f.inputs do
      f.has_many :product_images, allow_destroy: true do |ff|
        ff.input :image
      end
    end
    f.actions
  end
end
