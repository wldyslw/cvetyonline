ActiveAdmin.register Product do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  permit_params :name, :description, :category, :price, :image, :in_stock, :featured
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
    %i[name description category price in_stock featured].each { |field| column field }
    column 'Image' do |product|
      image_tag product.image.url(:thumb)
    end
    actions
  end

  form do |f|
    f.semantic_errors
    f.inputs do
      %i[name description price image in_stock featured].each { |field| f.input field }
      f.input :category, as: :select, collection: options_for_select({
        'Букеты': :bouquets,
        'Цветы поштучно': :flowers,
        'Цветы в горшках': :pots,
        'Наши работы': :handmade,
        'Букеты невесты': :wedding,
        'Подарки': :gifts,
      }, :bouquets)
    end
    f.actions
  end
end
