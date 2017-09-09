ActiveAdmin.register UnitProduct do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  permit_params :product_id, :property, :price
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
    %i[product property price].each { |field| column field }
    actions
  end

  form do |f|
    f.semantic_errors
    f.inputs do
      %i[product property price].each { |field| f.input field }
    end
    f.actions
  end
end
