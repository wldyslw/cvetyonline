ActiveAdmin.register Product do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  permit_params :name, :description, :category, :image, :in_stock, :featured, unit_products_attributes: [:id, :property, :price]
  #
  # or
  #
  # permit_params do
  #   permitted = [:permitted, :attributes]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  index do
    selectable_column
    id_column
    %i[name description category in_stock featured].each { |field| column field }
    column :unit_products do |product|
      ul do
        product.unit_products.each { |up| li link_to "#{up.property.empty? ? 'Default' : up.property}, #{up.price}", admin_unit_product_path(up) }
      end
    end
    column 'Image' do |product|
      image_tag product.image.url(:thumb)
    end
    actions
  end

  form do |f|
    f.semantic_errors
    f.inputs do
      %i[name description image in_stock featured].each { |field| f.input field }
      f.input :category, as: :select, collection: options_for_select({
        'Букеты': :bouquets,
        'Цветы поштучно': :flowers,
        'Цветы в горшках': :pots,
        'Наши работы': :handmade,
        'Букеты невесты': :wedding,
        'Подарки': :gifts,
      }, :bouquets)
    end
    f.inputs do
      f.has_many :unit_products, allow_destroy: true do |ff|
        %i[property price].each { |field| ff.input field }
      end
    end
    f.actions
  end
end
